import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { isEmailConfigured, sendReply } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);

export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY to send replies." },
      { status: 503 },
    );
  }
  const body = (await req.json().catch(() => ({}))) as {
    to?: string;
    subject?: string;
    message?: string;
  };
  const to = String(body.to ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!isEmail(to) || !subject || !message) {
    return NextResponse.json({ error: "Recipient, subject and message are required." }, { status: 422 });
  }

  try {
    await sendReply(to, subject, message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/reply] send failed:", err);
    return NextResponse.json({ error: "Could not send the message." }, { status: 502 });
  }
}
