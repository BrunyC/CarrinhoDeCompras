import { Microservice } from '@lib/enum/index';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MicroserviceProxy } from './microservice-proxy';
import { RabbitMQConfig } from './rabbitmq.config';

@Module({
	imports: [],
	providers: [
		{
			provide: Microservice.ITEMS,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.ITEMS));
			}
		},
		{
			provide: Microservice.ITEMS2,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.ITEMS2));
			}
		},
		{
			provide: Microservice.LOG_SYNC,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.LOG_SYNC));
			}
		},
		{
			provide: Microservice.MESSAGES,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.MESSAGES));
			}
		},
		{
			provide: Microservice.ORDERS_V2,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.ORDERS_V2));
			}
		},
		{
			provide: Microservice.OTHERS,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.OTHERS));
			}
		},
		{
			provide: Microservice.PAYMENTS,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.PAYMENTS));
			}
		},
		{
			provide: Microservice.QUESTIONS,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.QUESTIONS));
			}
		},
		{
			provide: Microservice.SHIPMENTS,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.SHIPMENTS));
			}
		},
		{
			provide: Microservice.TEST,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.TEST));
			}
		},
		{
			provide: MicroserviceProxy.MICROSERVICE_PROXY_SERVICE,
			useClass: MicroserviceProxy
		}
	],
	exports: [
		{
			provide: MicroserviceProxy.MICROSERVICE_PROXY_SERVICE,
			useClass: MicroserviceProxy
		}
	]
})
export class RabbitMQModule {}
