/*
  Warnings:

  - You are about to drop the column `total` on the `CartItems` table. All the data in the column will be lost.
  - Added the required column `total` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `total` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CartItems` DROP COLUMN `total`;
