import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDto, ResponseNotificationDto } from 'lib/src/dto/microservices/ml-notifications/index';
import { MicroserviceProxy } from '@config/index';
import { NotificationController } from '@api/routes/ml-notification/notification.controller';
import { NotificationService } from 'microservices/ml-notifications/src/notification.service';

export const RabbitMQServiceMock = jest.fn(() => ({
	event: () => jest.fn().mockResolvedValue(undefined),
	message: () => jest.fn().mockResolvedValue(undefined)
}));

describe('NotificationController', () => {
	let notificationController: NotificationController;
	let notificationService: NotificationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [NotificationController],
			providers: [
				{
					provide: MicroserviceProxy.MICROSERVICE_PROXY_SERVICE,
					useClass: RabbitMQServiceMock
				},
				NotificationService
			]
		}).compile();

		notificationController = module.get<NotificationController>(NotificationController);
		notificationService = module.get<NotificationService>(NotificationService);
	});

	describe('notification', () => {
		it('should return a ResponseNotificationDto', async () => {
			const data: NotificationDto = {
				topic: 'test',
				resource: '/test/123',
				user_id: 1
			};

			const response: ResponseNotificationDto = {
				body: 'ok'
			};

			jest.spyOn(notificationService, 'notification').mockResolvedValue(response);

			expect(await notificationController.notification(data)).toEqual(response);
		});
	});
});
