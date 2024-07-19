/*
  Warnings:

  - Added the required column `goalDifference` to the `TeamStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TeamStats` ADD COLUMN `goalDifference` INTEGER NOT NULL;
