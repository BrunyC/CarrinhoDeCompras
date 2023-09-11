import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './routes/cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './routes/checkout/order/order.module';
import { OrderItemsModule } from './routes/checkout/orderItems/order-items.module';
import { PaymentsModule } from './routes/checkout/payments/payments.module';
import { ProductModule } from './routes/product/product.module';
import { ProductPriceModule } from './routes/productPrice/product-price.module';
import { UserModule } from './routes/user/user.module';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({}),
		RabbitMQModule,
		ProductModule,
		ProductPriceModule,
		UserModule,
		CartModule,
		AuthModule,
		OrderModule,
		OrderItemsModule,
		PaymentsModule
	],
	exports: [RabbitMQModule, ConfigModule.forRoot()],
	providers: []
})
export class AppModule {}
