import { NotificationDto } from '@lib/dto/microservices/notification/index';
import { NotificationPattern } from '@lib/enum/index';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
	constructor(private notificationService: NotificationService) {}

	@MessagePattern(NotificationPattern.POST_NOTIFICATION)
	async notification(@Payload() data: NotificationDto, @Ctx() context: RmqContext): Promise<any> {
		try {
			await this.notificationService.sendNotification(data);
			const channel = context.getChannelRef();
			const message = context.getMessage();

			channel.ack(message);
		} catch (error) {
			throw error;
		}
	}
}
