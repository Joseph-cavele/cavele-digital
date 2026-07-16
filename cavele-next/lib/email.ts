import { Resend } from "resend";
import { site } from "./site";

/**
 * Transactional email via Resend. Everything degrades gracefully: if
 * RESEND_API_KEY is not set, `isEmailConfigured()` is false and callers skip
 * sending instead of throwing.
 */

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM || "Cavele Digital <onboarding@resend.dev>";
const notifyTo = process.env.LEAD_NOTIFY_EMAIL || site.email;

let resend: Resend | undefined;

export function isEmailConfigured(): boolean {
  return Boolean(apiKey);
}

function client(): Resend {
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export type LeadEmail = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  service?: string;
  budget?: string;
  kind?: "enquiry" | "quote";
};

/** Notify the studio that a new lead / quote request came in. */
export async function sendLeadNotification(lead: LeadEmail): Promise<void> {
  if (!isEmailConfigured()) return;
  const isQuote = lead.kind === "quote";
  const row = (label: string, value?: string) =>
    value ? `<p style="font-family:sans-serif;margin:0 0 6px"><strong>${label}:</strong> ${esc(value)}</p>` : "";
  await client().emails.send({
    from,
    to: notifyTo,
    replyTo: lead.email,
    subject: `${isQuote ? "New quote request" : "New enquiry"} from ${lead.name}`,
    html: `
      <h2 style="font-family:sans-serif;margin:0 0 12px">${isQuote ? "New quote request" : "New website enquiry"}</h2>
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Service", lead.service)}
      ${row("Budget", lead.budget)}
      <p style="font-family:sans-serif;margin:12px 0 4px"><strong>Message:</strong></p>
      <p style="font-family:sans-serif;white-space:pre-wrap;margin:0">${esc(lead.message)}</p>
    `,
  });
}

/** Send a reply / message to a lead from the admin dashboard. */
export async function sendReply(to: string, subject: string, message: string): Promise<void> {
  if (!isEmailConfigured()) throw new Error("Email is not configured.");
  await client().emails.send({
    from,
    to,
    replyTo: notifyTo,
    subject,
    html: `<div style="font-family:sans-serif;white-space:pre-wrap;font-size:15px;line-height:1.6">${esc(message)}</div>`,
  });
}
