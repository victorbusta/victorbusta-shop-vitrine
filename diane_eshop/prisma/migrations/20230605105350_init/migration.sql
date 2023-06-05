-- CreateTable
CREATE TABLE `Admin` (
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Print` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `added_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `documentUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Format` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `print_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customer_firstname` VARCHAR(191) NOT NULL,
    `customer_lastname` VARCHAR(191) NOT NULL,
    `customer_email` VARCHAR(191) NOT NULL,
    `shipping_adress` VARCHAR(191) NOT NULL,
    `shipping_postalcode` VARCHAR(191) NOT NULL,
    `shipping_city` VARCHAR(191) NOT NULL,
    `shipping` BOOLEAN NOT NULL,
    `shipped` BOOLEAN NOT NULL,
    `validation_token` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Format` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `format_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Format` ADD CONSTRAINT `Format_print_id_fkey` FOREIGN KEY (`print_id`) REFERENCES `Print`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Format` ADD CONSTRAINT `Order_Format_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Format` ADD CONSTRAINT `Order_Format_format_id_fkey` FOREIGN KEY (`format_id`) REFERENCES `Format`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
