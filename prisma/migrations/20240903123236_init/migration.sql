-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" "MeasureType" NOT NULL DEFAULT 'WATER',
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "measure_value" TEXT NOT NULL,
    "monthYear" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_monthYear_key" ON "Measure"("monthYear");
