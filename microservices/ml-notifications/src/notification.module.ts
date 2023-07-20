import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Module({
	imports: [RabbitMQModule, ConfigModule.forRoot()],
	controllers: [],
	providers: [NotificationService],
	exports: [NotificationService]
})
export class NotificationModule {}
