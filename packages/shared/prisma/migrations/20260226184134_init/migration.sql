-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('APPLICATION', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTION', 'HIRED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "pipelineId" TEXT,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_pipelineId_createdAt_idx" ON "Event"("pipelineId", "createdAt");

-- CreateIndex
CREATE INDEX "Event_createdAt_idx" ON "Event"("createdAt");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");
