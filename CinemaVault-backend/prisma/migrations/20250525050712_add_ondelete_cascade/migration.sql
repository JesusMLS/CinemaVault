-- DropForeignKey
ALTER TABLE `MovieActor` DROP FOREIGN KEY `MovieActor_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieActor` DROP FOREIGN KEY `MovieActor_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieCategory` DROP FOREIGN KEY `MovieCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieCategory` DROP FOREIGN KEY `MovieCategory_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieDirector` DROP FOREIGN KEY `MovieDirector_directorId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieDirector` DROP FOREIGN KEY `MovieDirector_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `UserMovieViewed` DROP FOREIGN KEY `UserMovieViewed_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `UserMovieViewed` DROP FOREIGN KEY `UserMovieViewed_userId_fkey`;

-- DropIndex
DROP INDEX `MovieActor_actorId_fkey` ON `MovieActor`;

-- DropIndex
DROP INDEX `MovieCategory_categoryId_fkey` ON `MovieCategory`;

-- DropIndex
DROP INDEX `MovieDirector_directorId_fkey` ON `MovieDirector`;

-- DropIndex
DROP INDEX `UserMovieViewed_movieId_fkey` ON `UserMovieViewed`;

-- AddForeignKey
ALTER TABLE `UserMovieViewed` ADD CONSTRAINT `UserMovieViewed_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMovieViewed` ADD CONSTRAINT `UserMovieViewed_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_directorId_fkey` FOREIGN KEY (`directorId`) REFERENCES `Director`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieDirector` ADD CONSTRAINT `MovieDirector_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCategory` ADD CONSTRAINT `MovieCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCategory` ADD CONSTRAINT `MovieCategory_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
