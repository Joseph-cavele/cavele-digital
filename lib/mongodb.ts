import { MongoClient, type Db } from "mongodb";

/**
 * MongoDB Atlas connection helper.
 *
 * The client is created lazily and cached. In development the promise is stored
 * on `globalThis` so Next.js hot-reloads reuse a single connection instead of
 * opening a new one on every change. Nothing connects at build time — `getDb()`
 * only runs when a request actually needs the database.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "cavele";

// eslint-disable-next-line no-var
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

/** True when a connection string is configured. Use to degrade gracefully. */
export function isDbConfigured(): boolean {
  return Boolean(uri);
}

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set — cannot connect to MongoDB.");
  }

  if (!clientPromise) {
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = new MongoClient(uri).connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      clientPromise = new MongoClient(uri).connect();
    }
  }

  const client = await clientPromise;
  return client.db(dbName);
}
