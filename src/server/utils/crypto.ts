import { hash, compare } from "bcrypt";
import { createHash, randomBytes } from "crypto";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  const passwordHash = await hash(password, SALT_ROUNDS);

  return passwordHash;
}

export async function comparePassword(password: string, passwordHash: string) {
  return await compare(password, passwordHash);
}

export function getToken() {
  return randomBytes(32).toString("hex");
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
