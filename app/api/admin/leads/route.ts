import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { isDbConfigured } from "@/lib/mongodb";
import { listLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ leads: [], dbConfigured: false });
  }
  try {
    const leads = await listLeads(200);
    return NextResponse.json({
      dbConfigured: true,
      leads: leads.map((l) => ({
        id: l._id?.toString() ?? "",
        name: l.name,
        email: l.email,
        phone: l.phone ?? "",
        service: l.service ?? "",
        budget: l.budget ?? "",
        message: l.message,
        source: l.source,
        status: l.status ?? "new",
        createdAt: l.createdAt instanceof Date ? l.createdAt.toISOString() : String(l.createdAt),
      })),
    });
  } catch (err) {
    console.error("[admin/leads] fetch failed:", err);
    return NextResponse.json({ error: "Could not load leads." }, { status: 500 });
  }
}
