/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Travel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[travelId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `travelId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Travel" DROP CONSTRAINT "Travel_paymentId_fkey";

-- DropIndex
DROP INDEX "Travel_paymentId_key";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "travelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "paymentId";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_travelId_key" ON "Payment"("travelId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
