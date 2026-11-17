import crypto from "crypto";
import jwt from "jsonwebtoken";

/** Fields that must never leave the server (API responses, JWT payloads). */
const PRIVATE_USER_FIELDS = ["hashPassword", "code", "codeExpires"] as const;

/** Escapes user input before it is used inside a RegExp / $regex query. */
export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Case-insensitive exact match on an email address, safe against regex injection. */
export function emailQuery(email: unknown) {
  if (typeof email !== "string" || !email.trim()) return null;
  return { $regex: new RegExp(`^${escapeRegex(email.trim())}$`, "i") };
}

/** Returns a copy of a user document without secrets (password hash, reset code). */
export function toPublicUser<T extends Record<string, any>>(user: T | null | undefined): Partial<T> | null {
  if (!user) return null;
  const plain = typeof user.toObject === "function" ? user.toObject() : { ...user };
  for (const field of PRIVATE_USER_FIELDS) delete plain[field];
  return plain;
}

/** 6-digit verification code generated with a cryptographically secure RNG. */
export function generateVerificationCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export const VERIFICATION_CODE_TTL_MS = 15 * 60 * 1000;
const RESET_TOKEN_PURPOSE = "password-reset";

/** Short-lived token proving that the verification code was checked for this email. */
export function signResetToken(email: string): string | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return jwt.sign({ purpose: RESET_TOKEN_PURPOSE, email: email.toLowerCase() }, secret, { expiresIn: "15m" });
}

/** Returns the email bound to a valid reset token, or null. */
export function verifyResetToken(token: unknown): string | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || typeof token !== "string") return null;
  try {
    const payload = jwt.verify(token, secret);
    if (typeof payload === "object" && payload.purpose === RESET_TOKEN_PURPOSE && typeof payload.email === "string") {
      return payload.email;
    }
  } catch {
    /* expired or tampered token */
  }
  return null;
}

export const MIN_PASSWORD_LENGTH = 8;
