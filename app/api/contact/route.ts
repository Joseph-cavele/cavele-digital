import { NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/mongodb";
import { saveLead } from "@/lib/leads";
import { isEmailConfigured, sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = String(data?.name ?? "").trim();
  const email = String(data?.email ?? "").trim();
  const message = String(data?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 422 });
  }

  const outcome = { stored: false, notified: false };

  // 1) Persist the lead (skipped gracefully if no MONGODB_URI is configured).
  if (isDbConfigured()) {
    try {
      await saveLead({
        name,
        email,
        message,
        source: "website-contact",
        userAgent: req.headers.get("user-agent") ?? undefined,
      });
      outcome.stored = true;
    } catch (err) {
      console.error("[contact] lead save failed:", err);
    }
  }

  // 2) Email the studio via Resend (skipped gracefully if no RESEND_API_KEY).
  if (isEmailConfigured()) {
    try {
      await sendLeadNotification({ name, email, message });
      outcome.notified = true;
    } catch (err) {
      console.error("[contact] email notification failed:", err);
    }
  }

  // Fail if the message went nowhere — neither stored nor emailed.
  if (!outcome.stored && !outcome.notified) {
    return NextResponse.json(
      { error: "We couldn't submit your message. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, ...outcome });
}
