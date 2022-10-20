/*
  Warnings:

  - You are about to drop the column `operationId` on the `Travel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Travel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Travel" DROP CONSTRAINT "Travel_operationId_fkey";

-- DropIndex
DROP INDEX "Travel_operationId_key";

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "operationId",
ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Travel_paymentId_key" ON "Travel"("paymentId");

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
