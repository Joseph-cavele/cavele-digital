import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type LeadStatus = "new" | "contacted" | "won" | "lost";
export const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "won", "lost"];

export type Lead = {
  _id?: ObjectId;
  name: string;
  email: string;
  message: string;
  source: string;
  phone?: string;
  service?: string;
  budget?: string;
  status?: LeadStatus;
  userAgent?: string;
  createdAt: Date;
};

export type NewLead = Omit<Lead, "_id" | "createdAt" | "status">;

const COLLECTION = "leads";

/** Persist a contact/quote lead. Returns the inserted id as a string. */
export async function saveLead(lead: NewLead): Promise<string> {
  const db = await getDb();
  const result = await db
    .collection<Lead>(COLLECTION)
    .insertOne({ ...lead, status: "new", createdAt: new Date() });
  return result.insertedId.toString();
}

/** Most recent leads first — for the admin dashboard. */
export async function listLeads(limit = 50): Promise<Lead[]> {
  const db = await getDb();
  return db
    .collection<Lead>(COLLECTION)
    .find({}, { sort: { createdAt: -1 }, limit })
    .toArray();
}

/** Update a lead's pipeline status. Returns true if a document was updated. */
export async function updateLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const res = await db
    .collection<Lead>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return res.matchedCount > 0;
}
