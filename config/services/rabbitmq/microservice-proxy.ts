import { Microservice } from '@lib/enum/index';
import { MicroserviceType, MicroservicePattern } from '@lib/type/index';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroserviceProxy {
	public static readonly MICROSERVICE_PROXY_SERVICE = 'MICROSERVICE_PROXY_SERVICE';

	constructor(
		@Inject(Microservice.ITEMS) private readonly microserviceItem: ClientProxy,
		@Inject(Microservice.ITEMS2) private readonly microserviceItem2: ClientProxy,
		@Inject(Microservice.LOG_SYNC) private readonly microserviceLogSync: ClientProxy,
		@Inject(Microservice.MESSAGES) private readonly microserviceMessage: ClientProxy,
		@Inject(Microservice.ORDERS_V2) private readonly microserviceOrderv2: ClientProxy,
		@Inject(Microservice.OTHERS) private readonly microserviceOther: ClientProxy,
		@Inject(Microservice.PAYMENTS) private readonly microservicePayment: ClientProxy,
		@Inject(Microservice.QUESTIONS) private readonly microserviceQuestion: ClientProxy,
		@Inject(Microservice.SHIPMENTS) private readonly microserviceShipment: ClientProxy,
		@Inject(Microservice.TEST) private readonly microserviceTest: ClientProxy
	) {}

	public async message(microserviceName: MicroserviceType, pattern: MicroservicePattern, message: any | any[]): Promise<any> {
		const microservice = this.getClientProxyByMicroservice(microserviceName);

		return lastValueFrom(microservice.send(pattern, message));
	}

	public async event(microserviceName: MicroserviceType, pattern: MicroservicePattern, message: any | any[]): Promise<any> {
		const microservice = this.getClientProxyByMicroservice(microserviceName);

		return lastValueFrom(microservice.emit(pattern, message));
	}

	public getClientProxyByMicroservice(name: MicroserviceType): ClientProxy {
		const microservice = {
			[Microservice.ITEMS]: () => this.microserviceItem,
			[Microservice.ITEMS2]: () => this.microserviceItem2,
			[Microservice.LOG_SYNC]: () => this.microserviceLogSync,
			[Microservice.MESSAGES]: () => this.microserviceMessage,
			[Microservice.ORDERS_V2]: () => this.microserviceOrderv2,
			[Microservice.OTHERS]: () => this.microserviceOther,
			[Microservice.PAYMENTS]: () => this.microservicePayment,
			[Microservice.QUESTIONS]: () => this.microserviceQuestion,
			[Microservice.SHIPMENTS]: () => this.microserviceShipment,
			[Microservice.TEST]: () => this.microserviceTest
		};

		return microservice[name]();
	}
}
