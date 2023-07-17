import { MicroserviceProxy } from '@config/index';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '@notifications/notification.service';

export const ClientProxyMock: any = jest.fn(() => ({
	emit: jest.fn().mockReturnValue(undefined),
	send: jest.fn().mockReturnValue(undefined)
}));

describe('NotificationService', () => {
	let notificationService: NotificationService;
	let configService: ConfigService;
	let microserviceProxy: MicroserviceProxy;

	beforeEach(async () => {
		microserviceProxy = new MicroserviceProxy(
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock,
			ClientProxyMock
		);

		configService = new ConfigService();
		notificationService = new NotificationService(configService, microserviceProxy);
	});

	describe('sendNotification', () => {
		it('should publish event with correct payload for orders_v2', async () => {
			const data = { topic: 'orders_v2', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for shipments', async () => {
			const data = { topic: 'shipments', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for payments', async () => {
			const data = { topic: 'payments', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for questions', async () => {
			const data = { topic: 'questions', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for messages', async () => {
			const data = { topic: 'messages', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for items', async () => {
			const data = { topic: 'items', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for items2', async () => {
			const data = { topic: 'items2', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for teste', async () => {
			const data = { topic: 'teste', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for when not receive topic', async () => {
			const data = { topic: '', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish event with correct payload for when receive any another topic', async () => {
			const data = { topic: 'other', message: 'test' };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should publish log sync event if LOG_SYNC config is set to 1', async () => {
			const data = { topic: 'test', message: 'test', user_id: 123 };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);
			jest.spyOn(configService, 'get').mockImplementation((name) => {
				if (name === 'LOG_SYNC') return 1;
			});

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});

		it('should not publish log sync event if LOG_SYNC config is not set', async () => {
			const data = { topic: 'test', message: 'test', user_id: 123 };

			jest.spyOn(microserviceProxy, 'event').mockResolvedValue(undefined);
			jest.spyOn(configService, 'get').mockImplementation((name) => {
				if (name === 'LOG_SYNC') return 0;
			});

			expect(await notificationService.sendNotification(data)).toBeUndefined();
		});
	});
});
