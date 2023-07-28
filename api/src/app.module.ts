import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './routes/ml-notification/notification.module';
import { HealthCheckModule } from './routes/healtCheck/healthCheck.module';
import { CartModule } from './routes/cart/cart.module';

@Global()
@Module({
	imports: [ConfigModule.forRoot({}), RabbitMQModule, NotificationModule, HealthCheckModule, CartModule],
	exports: [RabbitMQModule, ConfigModule.forRoot()],
	providers: []
})
export class AppModule {}
