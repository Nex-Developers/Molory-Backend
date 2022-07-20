/*
  Warnings:

  - Added the required column `departureTime` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "departureTime" TEXT NOT NULL,
ALTER COLUMN "departureDate" SET DATA TYPE TEXT;
