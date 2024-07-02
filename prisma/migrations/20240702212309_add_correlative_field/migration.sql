/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Deposit` ADD COLUMN `invoiceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Deposit_invoiceId_key` ON `Deposit`(`invoiceId`);
