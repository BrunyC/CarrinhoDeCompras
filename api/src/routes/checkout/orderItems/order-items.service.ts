import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreateOrderItemDto } from '@lib/dto/microservices/checkout/index';
import { CheckoutPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemsService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getOrderItems(headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.GET_ORDER_ITEMS, { headers: headers });

		if (data.result.length === 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createOrderItem(orderItem: CreateOrderItemDto, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.CREATE_ORDER_ITEMS, { orderItem, headers });

		return data;
	}

	async updateOrderItems(putData: any, id: number, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.UPDATE_ORDER_ITEMS, {
			id,
			putData,
			headers
		});

		return data;
	}

	async deleteOrderItems(id: number, headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.REMOVE_ORDER_ITEMS, { id, headers });

		return data;
	}
}
