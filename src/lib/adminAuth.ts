import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "lyceum_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;
const REMEMBERED_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function safeEqual(value: string, expected: string) {
  const valueHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(expected).digest();

  return timingSafeEqual(valueHash, expectedHash);
}

function sign(expiresAt: string) {
  return createHmac("sha256", requiredEnv("ADMIN_SESSION_SECRET"))
    .update(expiresAt)
    .digest("base64url");
}

function verifyToken(token?: string) {
  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) {
    return false;
  }

  return safeEqual(signature, sign(expiresAt));
}

export function verifyAdminCredentials(username: string, password: string) {
  return (
    safeEqual(username, requiredEnv("ADMIN_USERNAME")) &&
    safeEqual(password, requiredEnv("ADMIN_PASSWORD"))
  );
}

export async function createAdminSession(rememberMe = false) {
  const duration = rememberMe
    ? REMEMBERED_SESSION_DURATION_SECONDS
    : SESSION_DURATION_SECONDS;
  const expiresAt = Date.now() + duration * 1000;
  const token = `${expiresAt}.${sign(String(expiresAt))}`;

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    priority: "high",
    ...(rememberMe ? { maxAge: duration } : {}),
  });
}

export async function deleteAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Для цієї дії потрібна авторизація адміністратора");
  }
}
