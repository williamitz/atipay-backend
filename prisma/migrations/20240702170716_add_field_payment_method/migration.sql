/*
  Warnings:

  - Added the required column `payment_method` to the `DepositRecepit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DepositRecepit` ADD COLUMN `payment_method` VARCHAR(191) NOT NULL;
