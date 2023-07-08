import { Microservice } from '@lib/enum/index';
import { Transport } from '@nestjs/microservices';
import { RabbitMQConfig } from '@config/index';
import { Logger } from '@nestjs/common';

describe('RabbitMQ Config', () => {
	let rabbitMqConfig: RabbitMQConfig;

	process.env = {
		RMQ_HOST: 'localhost',
		RMQ_VHOST: '',
		RMQ_PORT: '1111',
		RMQ_USERNAME: 'root',
		RMQ_PASSWORD: 'root',
		RMQ_QUEUE_ACK_CONFIG: 'false',
		RMQ_QUEUE_DURABLE_CONFIG: 'false',
		RMQ_PERSISTENT_CONFIG: 'true'
	};

	beforeEach(() => {
		Logger.overrideLogger(true);

		rabbitMqConfig = new RabbitMQConfig();
	});

	it(`should get rabbitmq conection options for ${Microservice.ITEMS} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.ITEMS,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.ITEMS)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.ITEMS2} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.ITEMS2,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.ITEMS2)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.LOG_SYNC} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.LOG_SYNC,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.LOG_SYNC)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.MESSAGES} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.MESSAGES,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.MESSAGES)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.NOTIFICATION} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.NOTIFICATION,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.NOTIFICATION)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.ORDERS_V2} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.ORDERS_V2,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.ORDERS_V2)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.OTHERS} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.OTHERS,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.OTHERS)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.PAYMENTS} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.PAYMENTS,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.PAYMENTS)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.QUESTIONS} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.QUESTIONS,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.QUESTIONS)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.SHIPMENTS} queue`, () => {
		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.SHIPMENTS,
				noAck: false,
				persistent: true,
				queueOptions: {
					durable: false
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.SHIPMENTS)).toEqual(options);
	});

	it(`should get rabbitmq conection options for ${Microservice.TEST} queue`, () => {
		process.env = {
			RMQ_HOST: 'localhost',
			RMQ_VHOST: '',
			RMQ_PORT: '1111',
			RMQ_USERNAME: 'root',
			RMQ_PASSWORD: 'root',
			RMQ_QUEUE_ACK_CONFIG: 'true',
			RMQ_QUEUE_DURABLE_CONFIG: 'true',
			RMQ_PERSISTENT_CONFIG: 'false'
		};

		expect(rabbitMqConfig.setVariables()).toBeUndefined();

		const options: any = {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://root:root@localhost:1111'],
				queue: Microservice.TEST,
				noAck: true,
				persistent: false,
				queueOptions: {
					durable: true
				}
			}
		};

		expect(rabbitMqConfig.getOptions(Microservice.TEST)).toEqual(options);
	});
});
