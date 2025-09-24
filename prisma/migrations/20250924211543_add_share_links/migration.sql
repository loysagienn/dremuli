-- CreateTable
CREATE TABLE "public"."share_links" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "token_hint" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "time_zone" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "share_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "share_links_token_hash_key" ON "public"."share_links"("token_hash");

-- CreateIndex
CREATE INDEX "share_links_user_id_idx" ON "public"."share_links"("user_id");

-- CreateIndex
CREATE INDEX "share_links_start_date_idx" ON "public"."share_links"("start_date");

-- AddForeignKey
ALTER TABLE "public"."share_links" ADD CONSTRAINT "share_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
