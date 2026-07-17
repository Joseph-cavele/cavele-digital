import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { LEAD_STATUSES, updateLeadStatus, type LeadStatus } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { id?: string; status?: string };
  const id = String(body.id ?? "");
  const status = String(body.status ?? "") as LeadStatus;

  if (!id || !LEAD_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Valid id and status are required." }, { status: 422 });
  }

  try {
    const ok = await updateLeadStatus(id, status);
    if (!ok) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/status] update failed:", err);
    return NextResponse.json({ error: "Could not update status." }, { status: 500 });
  }
}
