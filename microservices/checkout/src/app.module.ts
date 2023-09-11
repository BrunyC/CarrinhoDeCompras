import { Module, Global } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './orderItems/order-items.module';
import { RabbitMQModule } from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payments/payments.module';

@Global()
@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, OrderModule, OrderItemsModule, PaymentModule],
	exports: [RabbitMQModule, ConfigModule.forRoot()]
})
export class AppModule {}
