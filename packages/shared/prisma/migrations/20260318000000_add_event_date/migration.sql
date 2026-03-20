-- AlterTable: add date column with default now() for new rows
ALTER TABLE "Event" ADD COLUMN "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill existing rows: use createdAt as the best approximation for date
UPDATE "Event" SET "date" = "createdAt";
