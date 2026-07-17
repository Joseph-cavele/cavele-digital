import { getDb } from "./mongodb";

export type Device = "mobile" | "tablet" | "desktop";

export type Visit = {
  visitorId: string;
  country: string; // ISO code (e.g. "ZA") or "Unknown"
  device: Device;
  path: string;
  referrer?: string;
  createdAt: Date;
};

const COLLECTION = "visits";

export function detectDevice(ua: string): Device {
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return "tablet";
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|Opera Mini/i.test(ua)) return "mobile";
  return "desktop";
}

export async function saveVisit(visit: Visit): Promise<void> {
  const db = await getDb();
  await db.collection<Visit>(COLLECTION).insertOne(visit);
}

export type VisitStats = {
  total: number;
  unique: number;
  byCountry: { country: string; count: number }[];
  byDevice: { device: string; count: number }[];
  recent: { country: string; device: string; path: string; createdAt: string }[];
};

export async function getVisitStats(): Promise<VisitStats> {
  const db = await getDb();
  const col = db.collection<Visit>(COLLECTION);

  const [total, uniqueIds, byCountry, byDevice, recent] = await Promise.all([
    col.countDocuments({}),
    col.distinct("visitorId"),
    col
      .aggregate([{ $group: { _id: "$country", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 12 }])
      .toArray(),
    col.aggregate([{ $group: { _id: "$device", count: { $sum: 1 } } }, { $sort: { count: -1 } }]).toArray(),
    col.find({}, { sort: { createdAt: -1 }, limit: 15 }).toArray(),
  ]);

  return {
    total,
    unique: uniqueIds.length,
    byCountry: byCountry.map((c) => ({ country: (c._id as string) || "Unknown", count: c.count as number })),
    byDevice: byDevice.map((d) => ({ device: (d._id as string) || "unknown", count: d.count as number })),
    recent: recent.map((r) => ({
      country: r.country || "Unknown",
      device: r.device || "unknown",
      path: r.path,
      createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
    })),
  };
}
