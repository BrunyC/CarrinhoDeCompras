import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AuthModule } from '@api/auth/auth.module';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Module({
	imports: [AuthModule, PrismaModule],
	controllers: [CartController],
	providers: [CartService]
})
export class CartModule {}
