import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDto, ResponseNotificationDto } from '@lib/dto/microservices/notification/index';
import { MicroserviceProxy } from '@config/index';
import { NotificationController } from '@api/routes/notification/notification.controller';
import { NotificationService } from '@api/routes/notification/notification.service';

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
