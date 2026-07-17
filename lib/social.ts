import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type SocialPlatform = "facebook" | "instagram" | "tiktok" | "whatsapp";
export const SOCIAL_PLATFORMS: SocialPlatform[] = ["facebook", "instagram", "tiktok", "whatsapp"];

export type SocialPost = {
  _id?: ObjectId;
  platform: SocialPlatform;
  url: string;
  note?: string;
  createdAt: Date;
};

const COLLECTION = "social_posts";

export async function listSocialPosts(): Promise<SocialPost[]> {
  const db = await getDb();
  return db.collection<SocialPost>(COLLECTION).find({}, { sort: { createdAt: -1 }, limit: 60 }).toArray();
}

export async function addSocialPost(post: {
  platform: SocialPlatform;
  url: string;
  note?: string;
}): Promise<string> {
  const db = await getDb();
  const res = await db.collection<SocialPost>(COLLECTION).insertOne({ ...post, createdAt: new Date() });
  return res.insertedId.toString();
}

export async function deleteSocialPost(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const res = await db.collection<SocialPost>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}
