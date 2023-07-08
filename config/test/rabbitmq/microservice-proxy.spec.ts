import { MicroserviceProxy } from '@config/index';
import { NotificationPattern, Microservice } from '@lib/enum/index';
import { Logger } from '@nestjs/common';
import { of } from 'rxjs';

export const ClientProxyMock: any = {
	emit: jest.fn().mockReturnValue(undefined),
	send: jest.fn().mockReturnValue(undefined)
};

describe('Microservice Proxy', () => {
	let microserviceProxy: MicroserviceProxy;

	beforeEach(async () => {
		Logger.overrideLogger(true);

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
			ClientProxyMock,
			ClientProxyMock
		);
	});

	describe('message', () => {
		it('should successfully send message to queue', async () => {
			const microservice = Microservice.NOTIFICATION;
			const pattern = NotificationPattern.POST_NOTIFICATION;
			const message = { topic: 'test' };
			const observable = of(undefined);
			const notificationMicroservice: any = {
				send: jest.fn().mockReturnValue(observable)
			};

			jest.spyOn(microserviceProxy, 'getClientProxyByMicroservice').mockImplementation(() => notificationMicroservice);

			expect(await microserviceProxy.message(microservice, pattern, message)).toBeUndefined();
		});
	});

	describe('event', () => {
		it('should successfully emit event to queue', async () => {
			const microservice = Microservice.NOTIFICATION;
			const pattern = NotificationPattern.POST_NOTIFICATION;
			const message = { topic: 'test' };
			const observable = of(undefined);
			const notificationMicroservice: any = {
				emit: jest.fn().mockReturnValue(observable)
			};

			jest.spyOn(microserviceProxy, 'getClientProxyByMicroservice').mockImplementation(() => notificationMicroservice);

			expect(await microserviceProxy.event(microservice, pattern, message)).toBeUndefined();
		});
	});

	describe('getClientProxyByMicroservice', () => {
		it(`should successfully get reference to ${Microservice.NOTIFICATION} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.NOTIFICATION);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.ITEMS} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.ITEMS);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.ITEMS2} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.ITEMS2);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.LOG_SYNC} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.LOG_SYNC);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.MESSAGES} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.MESSAGES);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.NOTIFICATION} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.NOTIFICATION);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.ORDERS_V2} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.ORDERS_V2);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.OTHERS} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.OTHERS);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.PAYMENTS} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.PAYMENTS);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.QUESTIONS} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.QUESTIONS);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.SHIPMENTS} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.SHIPMENTS);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});

		it(`should successfully get reference to ${Microservice.TEST} microservice proxy`, () => {
			const clientProxy = microserviceProxy.getClientProxyByMicroservice(Microservice.TEST);

			expect(clientProxy).toHaveProperty('send');
			expect(clientProxy).toHaveProperty('emit');
		});
	});
});
