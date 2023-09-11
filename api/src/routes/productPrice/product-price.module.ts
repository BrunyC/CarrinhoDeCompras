import { Module } from '@nestjs/common';
import { ProductPriceController } from './product-price.controller';
import { ProductPriceService } from './product-price.service';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [ProductPriceController],
	providers: [ProductPriceService]
})
export class ProductPriceModule {}
