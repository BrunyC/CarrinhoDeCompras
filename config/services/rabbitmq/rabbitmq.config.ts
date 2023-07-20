import { LogSyncQueueArgs, Microservice } from '@lib/enum/index';
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
		let formatData = false;
		let args = {};
		const queueOptions = {
			[Microservice.ITEMS]: () => {
				this.queue = Microservice.ITEMS;
				formatData = true;
			},
			[Microservice.ITEMS2]: () => {
				this.queue = Microservice.ITEMS2;
				formatData = true;
			},
			[Microservice.LOG_SYNC]: () => {
				this.queue = Microservice.LOG_SYNC;
				formatData = true;
				args = {
					'x-dead-letter-exchange': LogSyncQueueArgs.DEAD_LETTER,
					'x-dead-letter-routing-key': LogSyncQueueArgs.DEAD_LETTER_KEY
				};
			},
			[Microservice.MESSAGES]: () => {
				this.queue = Microservice.MESSAGES;
				formatData = true;
			},
			[Microservice.ORDERS_V2]: () => {
				this.queue = Microservice.ORDERS_V2;
				formatData = true;
			},
			[Microservice.OTHERS]: () => {
				this.queue = Microservice.OTHERS;
				formatData = true;
			},
			[Microservice.PAYMENTS]: () => {
				this.queue = Microservice.PAYMENTS;
				formatData = true;
			},
			[Microservice.QUESTIONS]: () => {
				this.queue = Microservice.QUESTIONS;
				formatData = true;
			},
			[Microservice.SHIPMENTS]: () => {
				this.queue = Microservice.SHIPMENTS;
				formatData = true;
			},
			[Microservice.TEST]: () => {
				this.queue = Microservice.TEST;
				formatData = true;
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
					durable: this.durable,
					arguments: args
				},
				serializer: {
					serialize(value) {
						return formatData ? value.data : value;
					}
				}
			}
		};
	}
}
