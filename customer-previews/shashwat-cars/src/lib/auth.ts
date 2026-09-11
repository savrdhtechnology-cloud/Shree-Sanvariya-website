import { createHmac, createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "shashwat_admin";

function secret() {
  const configured = process.env.SESSION_SECRET;
  if (configured) return configured;
  return process.env.NODE_ENV === "production" ? "" : "development-only-change-me";
}
function sign(value: string) {
  const s = secret();
  if (!s) return "";
  return createHmac("sha256", s).update(value).digest("hex");
}
function hashPassword(value: string) { return createHash("sha256").update(value).digest("hex"); }

export function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL || "";
  const expectedHash = process.env.ADMIN_PASSWORD_SHA256 || "";
  if (!expectedEmail || !expectedHash || email.toLowerCase() !== expectedEmail.toLowerCase()) return false;
  const actual = Buffer.from(hashPassword(password), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function createSession(email: string) {
  const issued = Date.now().toString();
  const payload = Buffer.from(`${email}|${issued}`).toString("base64url");
  const signature = sign(payload);
  if (!signature) throw new Error("SESSION_SECRET is not configured");
  const token = `${payload}.${signature}`;
  const jar = await cookies();
  jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 12, path: "/" });
}

export async function clearSession() { (await cookies()).delete(COOKIE); }

export async function isAdminSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (!expected) return false;
  const a = Buffer.from(signature); const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const decoded = Buffer.from(payload, "base64url").toString();
    const [email, issued] = decoded.split("|");
    const age = Date.now() - Number(issued);
    return email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase() && age >= 0 && age < 12 * 60 * 60 * 1000;
  } catch { return false; }
}
