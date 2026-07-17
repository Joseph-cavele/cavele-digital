import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Lightweight admin auth. A single ADMIN_PASSWORD guards the dashboard.
 * On login we set an httpOnly cookie whose value is an HMAC keyed by the
 * password — so it can't be forged without knowing the password, and we never
 * store the password itself in the cookie.
 */

const password = process.env.ADMIN_PASSWORD;
export const ADMIN_COOKIE = "cavele_admin";

export function isAdminConfigured(): boolean {
  return Boolean(password && password.length >= 6);
}

export function makeToken(): string {
  return crypto
    .createHmac("sha256", password as string)
    .update("cavele-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

export function checkPassword(input: string): boolean {
  if (!isAdminConfigured()) return false;
  return safeEqual(input, password as string);
}

export function verifyToken(token?: string): boolean {
  if (!isAdminConfigured() || !token) return false;
  return safeEqual(token, makeToken());
}

/** True when the current request carries a valid admin session cookie. */
export function isAuthed(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyToken(token);
}
