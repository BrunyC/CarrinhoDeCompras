import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceProxy } from '@config/index';
import { NotificationDto, ResponseNotificationDto } from '@lib/dto/microservices/notification/index';
import { Microservice, NotificationPattern } from '@lib/enum/index';
import { NotificationService } from '@api/routes/notification/notification.service';

describe('NotificationService', () => {
	let notificationService: NotificationService;
	let microserviceProxy: MicroserviceProxy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NotificationService,
				{
					provide: MicroserviceProxy.MICROSERVICE_PROXY_SERVICE,
					useValue: {
						event: jest.fn()
					}
				}
			]
		}).compile();

		notificationService = module.get<NotificationService>(NotificationService);
		microserviceProxy = module.get<MicroserviceProxy>(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE);
	});

	describe('notification', () => {
		it('should publish a notification event with the given data and return a response', async () => {
			const data: NotificationDto = {
				topic: 'test',
				resource: '/test/123',
				user_id: 1
			};

			const expectedResponse: ResponseNotificationDto = {
				body: 'ok'
			};

			const publishSpy = jest.spyOn(microserviceProxy, 'event');

			const result = await notificationService.notification(data);

			expect(publishSpy).toHaveBeenCalledWith(Microservice.NOTIFICATION, NotificationPattern.POST_NOTIFICATION, data);
			expect(result).toEqual(expectedResponse);
		});
	});
});
