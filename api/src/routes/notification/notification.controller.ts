import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotificationDto, ResponseNotificationDto } from '@lib/dto/microservices/notification/index';

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
		return this.notificationService.notification(data);
	}
}
