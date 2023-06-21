import { Microservice } from '@lib/enum/index';
import { MicroserviceType } from '@lib/type/index';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export class RabbitMQConfig {
	private scheme = 'amqp';
	private url: string;
	private port: string;
	private host: string;
	private vhost: string;
	private username: string;
	private password: string;
	private transport: Transport.RMQ;
	private queue: string;
	private noAck: boolean;
	private persistent: boolean;
	private durable: boolean;

	private configService: ConfigService;

	constructor() {
		this.configService = new ConfigService();
		this.setVariables();
	}

	public setVariables(): void {
		this.transport = Transport.RMQ;
		this.noAck = this.configService.get('RMQ_QUEUE_ACK_CONFIG') === 'true' ? true : false;
		this.persistent = this.configService.get('RMQ_PERSISTENT_CONFIG') === 'true' ? true : false;
		this.durable = this.configService.get('RMQ_QUEUE_DURABLE_CONFIG') === 'true' ? true : false;

		this.host = this.configService.get('RMQ_HOST');
		this.vhost = this.configService.get('RMQ_VHOST');
		this.port = this.configService.get('RMQ_PORT');
		this.username = this.configService.get('RMQ_USERNAME');
		this.password = this.configService.get('RMQ_PASSWORD');
		this.url = `${this.scheme}://${this.username}:${this.password}@${this.host}:${this.port}${this.vhost}`;
	}

	public getOptions(microservice: MicroserviceType): any {
		const queueOptions = {
			[Microservice.NOTIFICATION]: () => {
				this.queue = Microservice.NOTIFICATION;
			},
			[Microservice.ITEMS]: () => {
				this.queue = Microservice.ITEMS;
			},
			[Microservice.ITEMS2]: () => {
				this.queue = Microservice.ITEMS2;
			},
			[Microservice.LOG_SYNC]: () => {
				this.queue = Microservice.LOG_SYNC;
			},
			[Microservice.MESSAGES]: () => {
				this.queue = Microservice.MESSAGES;
			},
			[Microservice.ORDERS_V2]: () => {
				this.queue = Microservice.ORDERS_V2;
			},
			[Microservice.OTHERS]: () => {
				this.queue = Microservice.OTHERS;
			},
			[Microservice.PAYMENTS]: () => {
				this.queue = Microservice.PAYMENTS;
			},
			[Microservice.QUESTIONS]: () => {
				this.queue = Microservice.QUESTIONS;
			},
			[Microservice.SHIPMENTS]: () => {
				this.queue = Microservice.SHIPMENTS;
			},
			[Microservice.TEST]: () => {
				this.queue = Microservice.TEST;
			}
		};

		queueOptions[microservice] && queueOptions[microservice]();

		return {
			transport: this.transport,
			options: {
				urls: [this.url],
				queue: this.queue,
				noAck: this.noAck,
				persistent: this.persistent,
				queueOptions: {
					durable: this.durable
				}
			}
		};
	}
}
