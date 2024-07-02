/*
  Warnings:

  - You are about to drop the `Deposits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Deposits`;

-- CreateTable
CREATE TABLE `Deposit` (
    `id` VARCHAR(191) NOT NULL,
    `apiDepositId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `paid` BOOLEAN NOT NULL DEFAULT false,
    `paidAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Deposit_apiDepositId_key`(`apiDepositId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DepositRecepit` (
    `id` VARCHAR(191) NOT NULL,
    `checkoutUrl` VARCHAR(191) NOT NULL,
    `expiration_date` DATETIME(3) NOT NULL,
    `depositId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DepositRecepit_depositId_key`(`depositId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DepositRecepit` ADD CONSTRAINT `DepositRecepit_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
