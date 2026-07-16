import { NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/mongodb";
import { saveLead } from "@/lib/leads";
import { isEmailConfigured, sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
const str = (v: unknown) => String(v ?? "").trim();

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const service = str(body.service);
  const budget = str(body.budget);
  const message = str(body.message);

  if (!name || !email || !service) {
    return NextResponse.json({ error: "Name, email and service are required." }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const outcome = { stored: false, notified: false };

  if (isDbConfigured()) {
    try {
      await saveLead({
        name,
        email,
        phone,
        service,
        budget,
        message,
        source: "website-quote",
        userAgent: req.headers.get("user-agent") ?? undefined,
      });
      outcome.stored = true;
    } catch (err) {
      console.error("[quote] lead save failed:", err);
    }
  }

  if (isEmailConfigured()) {
    try {
      await sendLeadNotification({ name, email, phone, service, budget, message, kind: "quote" });
      outcome.notified = true;
    } catch (err) {
      console.error("[quote] email notification failed:", err);
    }
  }

  if (!outcome.stored && !outcome.notified) {
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, ...outcome });
}
