/*
  Warnings:

  - Added the required column `months` to the `CartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CartItems` ADD COLUMN `months` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
