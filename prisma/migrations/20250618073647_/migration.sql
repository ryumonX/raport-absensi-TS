/*
  Warnings:

  - A unique constraint covering the columns `[qrcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `qrcode` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `qrcode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_qrcode_key` ON `User`(`qrcode`);
