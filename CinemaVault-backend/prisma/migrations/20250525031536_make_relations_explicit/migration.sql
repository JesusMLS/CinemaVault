/*
  Warnings:

  - You are about to drop the `_MoviesByActor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoviesByDirector` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoviesCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MoviesByActor` DROP FOREIGN KEY `_MoviesByActor_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MoviesByActor` DROP FOREIGN KEY `_MoviesByActor_B_fkey`;

-- DropForeignKey
ALTER TABLE `_MoviesByDirector` DROP FOREIGN KEY `_MoviesByDirector_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MoviesByDirector` DROP FOREIGN KEY `_MoviesByDirector_B_fkey`;

-- DropForeignKey
ALTER TABLE `_MoviesCategories` DROP FOREIGN KEY `_MoviesCategories_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MoviesCategories` DROP FOREIGN KEY `_MoviesCategories_B_fkey`;

-- DropTable
DROP TABLE `_MoviesByActor`;

-- DropTable
DROP TABLE `_MoviesByDirector`;

-- DropTable
DROP TABLE `_MoviesCategories`;

-- CreateTable
CREATE TABLE `MovieDirector` (
    `directorId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`movieId`, `directorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieActor` (
    `actorId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`movieId`, `actorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieCategory` (
    `categoryId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`movieId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_directorId_fkey` FOREIGN KEY (`directorId`) REFERENCES `Director`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `Actor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCategory` ADD CONSTRAINT `MovieCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCategory` ADD CONSTRAINT `MovieCategory_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
