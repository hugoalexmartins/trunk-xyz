/*
  Warnings:

  - You are about to drop the column `isApproved` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'regular');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isApproved",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'regular';
