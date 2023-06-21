import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { NotificationModule } from './routes/notification/notification.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
	imports: [ConfigModule.forRoot({}), RabbitMQModule, NotificationModule],
	exports: [RabbitMQModule, ConfigModule.forRoot()],
	providers: []
})
export class AppModule {}
