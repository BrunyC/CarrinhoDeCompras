import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '@api/auth/auth.module';
import { ProductModule } from '@product/product.module';
import { ProductPriceModule } from '@product_price/product-price.module';
import { UserModule } from '@user/user.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, AuthModule, PrismaModule, ProductModule, ProductPriceModule, UserModule],
	controllers: [CartController],
	providers: [CartService],
	exports: [CartService]
})
export class CartModule {}
