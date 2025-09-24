export type ShareLink = {
  id: string;
  createdAt: Date;
  userId: string;
  tokenHash: string;
  tokenHint?: string | null;
  startDate: Date;
  timeZone: string;
  expiresAt?: Date | null;
  revokedAt?: Date | null;
};
