/*
  Warnings:

  - Added the required column `liveScoreURL` to the `TeamStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TeamStats` ADD COLUMN `liveScoreURL` VARCHAR(191) NOT NULL;
