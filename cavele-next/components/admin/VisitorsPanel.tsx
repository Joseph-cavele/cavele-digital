"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, Tablet, Globe, Users } from "lucide-react";

type Stats = {
  dbConfigured: boolean;
  total: number;
  unique: number;
  byCountry: { country: string; count: number }[];
  byDevice: { device: string; count: number }[];
  recent: { country: string; device: string; path: string; createdAt: string }[];
};

const COUNTRY_NAMES: Record<string, string> = {
  ZA: "South Africa", US: "United States", GB: "United Kingdom", NG: "Nigeria", KE: "Kenya",
  IN: "India", DE: "Germany", FR: "France", AU: "Australia", CA: "Canada", NL: "Netherlands",
  AE: "UAE", GH: "Ghana", ZW: "Zimbabwe", BW: "Botswana", NA: "Namibia", MZ: "Mozambique",
};

function flag(cc: string) {
  if (!cc || cc.length !== 2 || cc === "UN") return "🌐";
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}
const countryName = (cc: string) => COUNTRY_NAMES[cc] || (cc === "UNKNOWN" ? "Unknown" : cc);

function DeviceIcon({ device, size = 15 }: { device: string; size?: number }) {
  if (device === "mobile") return <Smartphone size={size} />;
  if (device === "tablet") return <Tablet size={size} />;
  if (device === "desktop") return <Monitor size={size} />;
  return <Globe size={size} />;
}

export function VisitorsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/visits", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 text-sm mb-8">Loading visitors…</p>;
  if (!stats) return null;

  const maxCountry = Math.max(1, ...stats.byCountry.map((c) => c.count));
  const mobileCount = stats.byDevice.find((d) => d.device === "mobile")?.count ?? 0;
  const mobilePct = stats.total ? Math.round((mobileCount / stats.total) * 100) : 0;
  const topCountry = stats.byCountry[0]?.country ?? "UNKNOWN";

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold font-poppins text-gray-900 mb-4 flex items-center gap-2">
        <Users size={18} className="text-blue-600" /> Website visitors
      </h2>

      {!stats.dbConfigured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm mb-4">
          Set <b>MONGODB_URI</b> to start recording visitors.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <Tile label="Total page views" value={stats.total} />
        <Tile label="Unique visitors" value={stats.unique} accent />
        <Tile label="Mobile" value={`${mobilePct}%`} />
        <Tile label="Top country" value={`${flag(topCountry)} ${topCountry === "UNKNOWN" ? "—" : topCountry}`} />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Countries */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Visitors by country</h3>
          {stats.byCountry.length === 0 ? (
            <p className="text-sm text-gray-400">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {stats.byCountry.map((c) => (
                <div key={c.country} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{flag(c.country)}</span>
                  <span className="text-sm text-gray-700 w-32 truncate">{countryName(c.country)}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(c.count / maxCountry) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-8 text-right tabular-nums">{c.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Devices + recent */}
        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Devices</h3>
            {stats.byDevice.length === 0 ? (
              <p className="text-sm text-gray-400">No data yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {stats.byDevice.map((d) => (
                  <div key={d.device} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><DeviceIcon device={d.device} /></span>
                    <span className="text-sm text-gray-700 capitalize flex-1">{d.device}</span>
                    <span className="text-sm font-semibold text-gray-800 tabular-nums">
                      {d.count}
                      <span className="text-gray-400 font-normal">
                        {" "}({stats.total ? Math.round((d.count / stats.total) * 100) : 0}%)
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent visits</h3>
            {stats.recent.length === 0 ? (
              <p className="text-sm text-gray-400">No visits recorded yet.</p>
            ) : (
              <div className="flex flex-col divide-y divide-gray-100">
                {stats.recent.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 text-sm">
                    <span title={countryName(r.country)}>{flag(r.country)}</span>
                    <span className="text-gray-400"><DeviceIcon device={r.device} size={14} /></span>
                    <span className="text-gray-700 flex-1 truncate">{r.path}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(r.createdAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className={`text-2xl font-extrabold font-poppins ${accent ? "text-blue-600" : "text-gray-900"}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
