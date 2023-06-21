import { MicroserviceProxy } from '@config/index';
import { NotificationDto, ResponseNotificationDto } from '@lib/dto/microservices/notification/index';
import { Microservice, NotificationPattern } from '@lib/enum/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async notification(data: NotificationDto): Promise<ResponseNotificationDto> {
		this.publish.event(Microservice.NOTIFICATION, NotificationPattern.POST_NOTIFICATION, data);

		return {
			body: 'ok'
		};
	}
}
