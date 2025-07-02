export const HTTP_PORT = process.env.HTTP_PORT
  ? Number(process.env.HTTP_PORT)
  : 3030;

export const SESSION_ID_COOKIE_NAME = "session_id";
export const DOMAIN = process.env.DOMAIN || "localhost";
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || null;
export const SUPPORT_EMAIL_PASSWORD =
  process.env.SUPPORT_EMAIL_PASSWORD || null;
