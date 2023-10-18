import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { PaymentController } from './payments.controller';
import { PaymentService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '@api/auth/auth.module';
import { OrderModule } from '@checkout/order/order.module';
import { OrderItemsModule } from '@checkout/orderItems/order-items.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, PrismaModule, AuthModule, OrderModule, OrderItemsModule],
	controllers: [PaymentController],
	providers: [PaymentService],
	exports: [PaymentService]
})
export class PaymentModule {}
