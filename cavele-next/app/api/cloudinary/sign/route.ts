import { NextResponse } from "next/server";
import { isCloudinaryConfigured, signUpload } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns a short-lived signature so the browser can upload directly to
 * Cloudinary without ever seeing the API secret. Intended for the future
 * Portfolio/Blog CMS. Guard this behind auth before shipping admin uploads.
 */
export async function POST(req: Request) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 501 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    // no body is fine — sign with defaults
  }

  const folder = typeof body.folder === "string" ? body.folder : "cavele";
  const signed = signUpload({ folder });

  return NextResponse.json(signed);
}
