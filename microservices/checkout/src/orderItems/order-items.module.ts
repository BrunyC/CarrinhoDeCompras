import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '@api/auth/auth.module';
import { CartModule } from '@cart/cart.module';
import { ProductModule } from '@product/product.module';
import { ProductPriceModule } from '@product_price/product-price.module';
import { OrderModule } from '@checkout/order/order.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, PrismaModule, AuthModule, CartModule, ProductModule, ProductPriceModule, OrderModule],
	controllers: [OrderItemsController],
	providers: [OrderItemsService],
	exports: [OrderItemsService]
})
export class OrderItemsModule {}
