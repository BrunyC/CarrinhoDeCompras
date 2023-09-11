/*
  Warnings:

  - A unique constraint covering the columns `[product_id,price]` on the table `ProductPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductPrice_product_id_price_key` ON `ProductPrice`(`product_id`, `price`);
