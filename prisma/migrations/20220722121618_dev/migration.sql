/*
  Warnings:

  - You are about to drop the column `reamingSeats` on the `Travel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "reamingSeats",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "remaningSeats" INTEGER NOT NULL DEFAULT 4;

-- AlterTable
ALTER TABLE "VehicleType" ADD COLUMN     "maxSeats" INTEGER NOT NULL DEFAULT 4;
