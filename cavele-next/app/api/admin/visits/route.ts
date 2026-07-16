import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { isDbConfigured } from "@/lib/mongodb";
import { getVisitStats } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ dbConfigured: false, total: 0, unique: 0, byCountry: [], byDevice: [], recent: [] });
  }
  try {
    const stats = await getVisitStats();
    return NextResponse.json({ dbConfigured: true, ...stats });
  } catch (err) {
    console.error("[admin/visits] failed:", err);
    return NextResponse.json({ error: "Could not load visitor stats." }, { status: 500 });
  }
}
