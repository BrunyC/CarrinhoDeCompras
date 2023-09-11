import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '@api/auth/auth.module';
import { CartModule } from '@cart/cart.module';
import { UserModule } from '@user/user.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, PrismaModule, AuthModule, CartModule, UserModule],
	controllers: [OrderController],
	providers: [OrderService],
	exports: [OrderService]
})
export class OrderModule {}
