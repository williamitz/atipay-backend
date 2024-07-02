/*
  Warnings:

  - You are about to drop the column `apiDepositId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to alter the column `invoiceId` on the `Deposit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `DepositPaymentsMethods` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `DepositPaymentsMethods` DROP FOREIGN KEY `DepositPaymentsMethods_depositId_fkey`;

-- DropIndex
DROP INDEX `Deposit_apiDepositId_key` ON `Deposit`;

-- AlterTable
ALTER TABLE `Deposit` DROP COLUMN `apiDepositId`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    MODIFY `invoiceId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `DepositPaymentsMethods`;

-- CreateIndex
CREATE UNIQUE INDEX `Deposit_code_key` ON `Deposit`(`code`);
