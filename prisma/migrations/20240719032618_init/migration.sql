/*
  Warnings:

  - Added the required column `position` to the `TeamStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TeamStats` ADD COLUMN `position` INTEGER NOT NULL;
