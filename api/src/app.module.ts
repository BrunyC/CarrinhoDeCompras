import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { NotificationModule } from './routes/notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './routes/cart/cart.module';

@Global()
@Module({
	imports: [ConfigModule.forRoot({}), RabbitMQModule, NotificationModule, CartModule],
	exports: [RabbitMQModule, ConfigModule.forRoot()],
	providers: []
})
export class AppModule {}
