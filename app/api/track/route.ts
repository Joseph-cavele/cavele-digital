import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";
import { isDbConfigured } from "@/lib/mongodb";
import { saveVisit, detectDevice } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VID_COOKIE = "cavele_vid";

export async function POST(req: Request) {
  // Fail silently — tracking must never break the visitor's experience.
  if (!isDbConfigured()) return new NextResponse(null, { status: 204 });

  const body = (await req.json().catch(() => ({}))) as { path?: string; referrer?: string };
  const h = headers();
  const ua = h.get("user-agent") ?? "";

  // Country comes from the edge/CDN (works automatically on Vercel & Cloudflare).
  const country =
    h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || h.get("x-country") || "Unknown";

  // Stable, anonymous visitor id (no IP stored).
  const store = cookies();
  let vid = store.get(VID_COOKIE)?.value;
  if (!vid) {
    vid = randomUUID();
    store.set(VID_COOKIE, vid, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  try {
    await saveVisit({
      visitorId: vid,
      country: country.toUpperCase(),
      device: detectDevice(ua),
      path: String(body.path ?? "/").slice(0, 200),
      referrer: (body.referrer ? String(body.referrer) : "").slice(0, 300) || undefined,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("[track] save failed:", err);
  }

  return new NextResponse(null, { status: 204 });
}
