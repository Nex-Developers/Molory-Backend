/*
  Warnings:

  - You are about to drop the column `remaningSeats` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "remaningSeats",
ADD COLUMN     "remainingSeats" INTEGER NOT NULL DEFAULT 4;
