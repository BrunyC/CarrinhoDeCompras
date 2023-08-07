/*
  Warnings:

  - You are about to drop the column `months` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the column `months` on the `Product` table. All the data in the column will be lost.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CartItems` DROP COLUMN `months`,
    DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `months`,
    ADD COLUMN `qty` INTEGER NOT NULL;
