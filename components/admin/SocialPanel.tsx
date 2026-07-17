"use client";

import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Share2, Trash2, Plus, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";

type Platform = "facebook" | "instagram" | "tiktok" | "whatsapp";
type Post = { id: string; platform: Platform; url: string; note: string; createdAt: string };

const META: Record<Platform, { name: string; icon: React.ReactNode; color: string; profile: string }> = {
  facebook: { name: "Facebook", icon: <FaFacebook />, color: "#1877F2", profile: site.socials.facebook },
  instagram: { name: "Instagram", icon: <FaInstagram />, color: "#E1306C", profile: site.socials.instagram },
  tiktok: { name: "TikTok", icon: <FaTiktok />, color: "#010101", profile: site.socials.tiktok },
  whatsapp: { name: "WhatsApp", icon: <FaWhatsapp />, color: "#25D366", profile: site.socials.whatsapp },
};

/** Turn a public post URL into an embeddable iframe src (null = no embed). */
function embedSrc(platform: Platform, url: string): string | null {
  try {
    if (platform === "instagram") {
      const clean = url.split("?")[0].replace(/\/$/, "");
      return `${clean}/embed`;
    }
    if (platform === "tiktok") {
      const m = url.match(/video\/(\d+)/) || url.match(/\/(\d{6,})/);
      return m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null;
    }
    if (platform === "facebook") {
      return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=380`;
    }
    return null;
  } catch {
    return null;
  }
}

const EMBED_HEIGHT: Record<Platform, number> = { instagram: 560, tiktok: 740, facebook: 560, whatsapp: 0 };

export function SocialPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/social", { cache: "no-store" });
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, url, note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setUrl("");
      setNote("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setPosts((p) => p.filter((x) => x.id !== id));
    await fetch(`/api/admin/social?id=${id}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold font-poppins text-gray-900 mb-4 flex items-center gap-2">
        <Share2 size={18} className="text-blue-600" /> Social media
      </h2>

      {/* Profile shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(Object.keys(META) as Platform[]).map((p) => {
          const m = META[p];
          return (
            <a
              key={p}
              href={m.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{ background: m.color }}>
                {m.icon}
              </span>
              <span className="text-sm font-semibold text-gray-800">{m.name}</span>
              <ExternalLink size={14} className="text-gray-300 ml-auto" />
            </a>
          );
        })}
      </div>

      {/* Add post */}
      <form onSubmit={add} className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-600">Platform</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500">
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-gray-600">Post link</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.instagram.com/p/…" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-gray-600">Note (optional)</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Latest campaign" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60">
          <Plus size={16} /> {saving ? "Adding…" : "Add post"}
        </button>
      </form>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {/* Posts grid */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading posts…</p>
      ) : posts.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400 text-sm">
          No posts pinned yet. Paste a TikTok, Instagram, or Facebook post link above to feature it here.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => {
            const m = META[p.platform];
            const src = embedSrc(p.platform, p.url);
            return (
              <article key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: m.color }}>{m.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">{m.name}</span>
                  <button onClick={() => remove(p.id)} className="ml-auto text-gray-300 hover:text-red-500" title="Remove">
                    <Trash2 size={16} />
                  </button>
                </div>
                {src ? (
                  <iframe
                    src={src}
                    title={`${m.name} post`}
                    loading="lazy"
                    className="w-full bg-gray-50"
                    style={{ height: EMBED_HEIGHT[p.platform], border: 0 }}
                    allowFullScreen
                    scrolling="no"
                  />
                ) : (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-8 text-sm text-blue-600 hover:underline justify-center">
                    <ExternalLink size={15} /> Open {m.name} post
                  </a>
                )}
                {p.note && <p className="text-xs text-gray-500 px-4 py-3 border-t border-gray-100">{p.note}</p>}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
