import { Module, Global } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './orderItems/order-items.module';
import { RabbitMQModule } from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payments/payments.module';
import { HttpHelper } from '@lib/helper/index';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
	imports: [ConfigModule.forRoot(), HttpModule, RabbitMQModule, OrderModule, OrderItemsModule, PaymentModule],
	providers: [HttpHelper],
	exports: [HttpModule, RabbitMQModule, ConfigModule.forRoot(), HttpHelper]
})
export class AppModule {}
