import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotificationDto, ResponseNotificationDto } from '@lib/dto/microservices/notification/index';
import { NotificationService } from '@notification/notification.service';

@ApiTags('Meli')
@Controller('Meli')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Post()
	@UsePipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidUnknownValues: true
		})
	)
	@ApiBody({
		type: NotificationDto,
		description: 'The body request is a json.'
	})
	@ApiOkResponse({ type: ResponseNotificationDto, description: 'ok' })
	async notification(@Body() data: NotificationDto): Promise<ResponseNotificationDto> {
		this.notificationService.sendNotification(data);

		return {
			body: 'ok'
		};
	}
}
