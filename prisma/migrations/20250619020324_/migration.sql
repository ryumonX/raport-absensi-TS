/*
  Warnings:

  - You are about to drop the `subtest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subtestscore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `score` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subtest` DROP FOREIGN KEY `Subtest_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `subtestscore` DROP FOREIGN KEY `SubtestScore_gradeId_fkey`;

-- DropForeignKey
ALTER TABLE `subtestscore` DROP FOREIGN KEY `SubtestScore_subtestId_fkey`;

-- AlterTable
ALTER TABLE `grade` ADD COLUMN `score` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `subtest`;

-- DropTable
DROP TABLE `subtestscore`;
