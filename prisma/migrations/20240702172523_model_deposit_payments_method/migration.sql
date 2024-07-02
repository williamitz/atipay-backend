-- CreateTable
CREATE TABLE `DepositPaymentsMethods` (
    `id` VARCHAR(191) NOT NULL,
    `paymentMethodType` VARCHAR(191) NOT NULL,
    `paymentMethodCode` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NULL,
    `beneficiaryName` VARCHAR(191) NULL,
    `agreement` VARCHAR(191) NULL,
    `paymentMethodName` VARCHAR(191) NULL,
    `payerName` VARCHAR(191) NULL,
    `subType` VARCHAR(191) NULL,
    `qrCode` VARCHAR(191) NULL,
    `redirectUrl` VARCHAR(191) NULL,
    `depositId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DepositPaymentsMethods` ADD CONSTRAINT `DepositPaymentsMethods_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
