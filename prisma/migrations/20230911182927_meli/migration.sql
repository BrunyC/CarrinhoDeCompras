/*
  Warnings:

  - You are about to drop the column `valor` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `value` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payments` DROP COLUMN `valor`,
    ADD COLUMN `value` INTEGER NOT NULL;
