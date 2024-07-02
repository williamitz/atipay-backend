-- AlterTable
ALTER TABLE `DepositPaymentsMethods` MODIFY `qrCode` TEXT NULL,
    MODIFY `redirectUrl` TEXT NULL;

-- AlterTable
ALTER TABLE `DepositRecepit` MODIFY `checkoutUrl` TEXT NOT NULL;
