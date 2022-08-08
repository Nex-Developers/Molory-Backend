/*
  Warnings:

  - You are about to drop the column `driverLicense` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `idCard` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "receivedAmount" INTEGER,
ADD COLUMN     "reference" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "driverLicense",
DROP COLUMN "idCard",
ADD COLUMN     "driverLicenseBack" TEXT,
ADD COLUMN     "driverLicenseFront" TEXT,
ADD COLUMN     "driverLicenseRejectionMessage" TEXT,
ADD COLUMN     "idCardBack" TEXT,
ADD COLUMN     "idCardFront" TEXT,
ADD COLUMN     "idCardRejectionMessage" TEXT;
