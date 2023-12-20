-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
