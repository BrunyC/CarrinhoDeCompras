import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@config/index';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [RabbitMQModule, ConfigModule.forRoot()],
	controllers: [NotificationController],
	providers: [NotificationService],
	exports: [NotificationService]
})
export class NotificationModule {}
