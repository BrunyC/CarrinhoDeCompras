import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [RabbitMQModule, ConfigModule.forRoot()],
	controllers: [],
	providers: [NotificationService],
	exports: [NotificationService]
})
export class NotificationModule {}
