import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreateOrderDto } from '@lib/dto/microservices/checkout/index';
import { CheckoutPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getOrder(headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.GET_ORDER, { headers: headers });

		if (data.result.length === 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createOrder(order: CreateOrderDto, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.CREATE_ORDER, { order, headers });

		return data;
	}

	async updateOrder(putData: any, id: number, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.UPDATE_ORDER, {
			id,
			putData,
			headers
		});

		return data;
	}

	async deleteOrder(id: number, headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.REMOVE_ORDER, { id, headers });

		return data;
	}
}
