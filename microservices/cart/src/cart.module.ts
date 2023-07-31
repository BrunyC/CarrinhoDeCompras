import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@config/prisma/prisma.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, PrismaModule],
	controllers: [CartController],
	providers: [CartService],
	exports: [CartService]
})
export class CartModule {}
