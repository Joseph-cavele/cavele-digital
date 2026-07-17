import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { isDbConfigured } from "@/lib/mongodb";
import {
  SOCIAL_PLATFORMS,
  addSocialPost,
  deleteSocialPost,
  listSocialPosts,
  type SocialPlatform,
} from "@/lib/social";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ dbConfigured: false, posts: [] });
  try {
    const posts = await listSocialPosts();
    return NextResponse.json({
      dbConfigured: true,
      posts: posts.map((p) => ({
        id: p._id?.toString() ?? "",
        platform: p.platform,
        url: p.url,
        note: p.note ?? "",
        createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : String(p.createdAt),
      })),
    });
  } catch (err) {
    console.error("[admin/social] list failed:", err);
    return NextResponse.json({ error: "Could not load social posts." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { platform?: string; url?: string; note?: string };
  const platform = String(body.platform ?? "") as SocialPlatform;
  const url = String(body.url ?? "").trim();
  const note = String(body.note ?? "").trim();

  if (!SOCIAL_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "Choose a valid platform." }, { status: 422 });
  }
  if (!/^https?:\/\/.+/i.test(url)) {
    return NextResponse.json({ error: "Enter a valid post URL (starting with https://)." }, { status: 422 });
  }
  try {
    const id = await addSocialPost({ platform, url, note: note || undefined });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[admin/social] add failed:", err);
    return NextResponse.json({ error: "Could not save the post." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 422 });
  try {
    const ok = await deleteSocialPost(id);
    if (!ok) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/social] delete failed:", err);
    return NextResponse.json({ error: "Could not delete the post." }, { status: 500 });
  }
}
