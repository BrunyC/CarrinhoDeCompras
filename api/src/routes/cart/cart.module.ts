import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AuthModule } from '@api/auth/auth.module';

@Module({
	imports: [AuthModule],
	controllers: [CartController],
	providers: [CartService]
})
export class CartModule {}
