import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from 'microservices/ml-notifications/src/notification.service';

@Module({
	imports: [],
	controllers: [NotificationController],
	providers: [NotificationService]
})
export class NotificationModule {}
