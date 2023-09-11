import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { ProductPriceController } from './product-price.controller';
import { ProductPriceService } from './product-price.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, PrismaModule],
	controllers: [ProductPriceController],
	providers: [ProductPriceService],
	exports: [ProductPriceService]
})
export class ProductPriceModule {}
