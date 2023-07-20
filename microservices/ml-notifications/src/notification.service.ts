import { MicroserviceProxy } from '@config/index';
import { Microservice, NotificationPattern } from '@lib/enum/index';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationService {
	constructor(
		private configService: ConfigService,
		@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy
	) {}

	sendNotification(data) {
		data['uuid'] = uuidv4();

		switch (data.topic) {
			case 'orders_v2':
				this.publish.event(Microservice.ORDERS_V2, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'shipments':
				this.publish.event(Microservice.SHIPMENTS, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'payments':
				this.publish.event(Microservice.PAYMENTS, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'questions':
				this.publish.event(Microservice.QUESTIONS, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'messages':
				this.publish.event(Microservice.MESSAGES, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'items':
				this.publish.event(Microservice.ITEMS, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'items2':
				this.publish.event(Microservice.ITEMS2, NotificationPattern.POST_NOTIFICATION, data);
				break;
			case 'teste':
				this.publish.event(Microservice.TEST, NotificationPattern.POST_NOTIFICATION, data);
				break;
			default:
				this.publish.event(Microservice.OTHERS, NotificationPattern.POST_NOTIFICATION, data);
		}

		if (this.configService.get('LOG_SYNC') == 1) {
			const topic = data.topic ? data.topic : 'others';

			this.publish.event(Microservice.LOG_SYNC, NotificationPattern.POST_NOTIFICATION, {
				uuid: data.uuid,
				source: topic,
				meli_id: data.user_id,
				type: 'Insert',
				title: `Notificação Mercado Livre - ${topic}`,
				status: 'ok',
				data: data
			});
		}
	}
}
