-- AlterTable
ALTER TABLE "User" ADD COLUMN     "driverLicenseNumber" TEXT,
ADD COLUMN     "driverLicenseUploadedAt" TIMESTAMP(3),
ADD COLUMN     "idCardNumber" TEXT,
ADD COLUMN     "idCardUploadedAt" TIMESTAMP(3);
