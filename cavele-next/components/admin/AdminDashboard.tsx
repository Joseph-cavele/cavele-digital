"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Mail, Phone, RefreshCw, Send, X, Inbox } from "lucide-react";
import { VisitorsPanel } from "@/components/admin/VisitorsPanel";
import { SocialPanel } from "@/components/admin/SocialPanel";

type Status = "new" | "contacted" | "won" | "lost";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  source: string;
  status: Status;
  createdAt: string;
};

const STATUSES: Status[] = ["new", "contacted", "won", "lost"];

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  won: "bg-green-50 text-green-700 border-green-200",
  lost: "bg-gray-100 text-gray-500 border-gray-200",
};

const label = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dbConfigured, setDbConfigured] = useState(true);
  const [reply, setReply] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<"all" | Status>("all");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setLeads(data.leads || []);
      setDbConfigured(data.dbConfigured !== false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const updateStatus = async (id: string, status: Status) => {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      const res = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setLeads(prev); // revert on failure
      setError("Could not update status.");
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length, new: 0, contacted: 0, won: 0, lost: 0 };
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const quotes = useMemo(() => leads.filter((l) => l.source === "website-quote").length, [leads]);

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-poppins font-extrabold text-gray-900">
            Cavele<span className="text-blue-600">.</span>Admin
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <VisitorsPanel />

        <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-6">Leads &amp; Quotes</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Stat label="Total leads" value={counts.all} />
          <Stat label="Quote requests" value={quotes} accent />
          <Stat label="Won" value={counts.won} />
          <Stat label="New" value={counts.new} />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", ...STATUSES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {f === "all" ? "All" : label(f)}{" "}
              <span className={filter === f ? "text-blue-100" : "text-gray-400"}>{counts[f] ?? 0}</span>
            </button>
          ))}
        </div>

        {!dbConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm mb-6">
            MongoDB isn&apos;t configured, so no leads are stored yet. Set <b>MONGODB_URI</b> in <b>.env.local</b>.
          </div>
        )}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">{error}</div>}

        {loading ? (
          <p className="text-gray-400 text-sm">Loading…</p>
        ) : visible.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-50" />
            {leads.length === 0 ? "No leads yet. New submissions will appear here." : "No leads in this view."}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((l) => (
              <article key={l.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{l.name}</h3>
                      <span className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 ${l.source === "website-quote" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                        {l.source === "website-quote" ? "Quote" : "Enquiry"}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 border ${STATUS_STYLE[l.status]}`}>
                        {label(l.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                      <a href={`mailto:${l.email}`} className="flex items-center gap-1 hover:text-blue-600"><Mail size={14} /> {l.email}</a>
                      {l.phone && <a href={`tel:${l.phone}`} className="flex items-center gap-1 hover:text-blue-600"><Phone size={14} /> {l.phone}</a>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(l.createdAt).toLocaleString()}</span>
                </div>

                {(l.service || l.budget) && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {l.service && <span className="text-xs bg-gray-100 text-gray-600 rounded-md px-2.5 py-1">{l.service}</span>}
                    {l.budget && <span className="text-xs bg-gray-100 text-gray-600 rounded-md px-2.5 py-1">{l.budget}</span>}
                  </div>
                )}

                {l.message && <p className="text-sm text-gray-600 mt-3 whitespace-pre-wrap leading-relaxed">{l.message}</p>}

                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  <button onClick={() => setReply(l)} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    <Send size={14} /> Send message
                  </button>
                  <label className="flex items-center gap-2 text-sm text-gray-500">
                    Status:
                    <select
                      value={l.status}
                      onChange={(e) => updateStatus(l.id, e.target.value as Status)}
                      className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{label(s)}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            ))}
          </div>
        )}

        <SocialPanel />
      </main>

      {reply && (
        <ReplyModal
          lead={reply}
          onClose={() => setReply(null)}
          onSent={() => {
            if (reply.status === "new") updateStatus(reply.id, "contacted");
          }}
        />
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className={`text-3xl font-extrabold font-poppins ${accent ? "text-blue-600" : "text-gray-900"}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function ReplyModal({ lead, onClose, onSent }: { lead: Lead; onClose: () => void; onSent: () => void }) {
  const [subject, setSubject] = useState(
    lead.source === "website-quote" ? "Your quote from Cavele Digital" : "Re: your enquiry — Cavele Digital",
  );
  const [message, setMessage] = useState(`Hi ${lead.name.split(" ")[0]},\n\nThanks for reaching out to Cavele Digital.\n\n`);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const send = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: lead.email, subject, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("ok");
      onSent();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Failed to send.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold font-poppins text-gray-900">Message to {lead.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
        </div>
        {status === "ok" ? (
          <div className="p-8 text-center">
            <p className="text-green-600 font-semibold mb-2">Message sent ✓</p>
            <p className="text-sm text-gray-500">Your reply was emailed to {lead.email}.</p>
            <button onClick={onClose} className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700">Close</button>
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-4">
            <div className="text-sm text-gray-500">To: <span className="text-gray-800 font-medium">{lead.email}</span></div>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={7} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button onClick={send} disabled={sending} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors disabled:opacity-60">
              {sending ? "Sending…" : (<><Send size={15} /> Send email</>)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
