import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreatePaymentDto } from '@lib/dto/microservices/checkout/index';
import { CheckoutPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getPayments(headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.GET_PAYMENTS, { headers: headers });

		if (data.result.length <= 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createPayment(payment: CreatePaymentDto, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.POST_PAYMENTS, { payment, headers });

		return data;
	}

	async updatePayment(putData: any, id: number, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.UPDATE_PAYMENTS, {
			id,
			putData,
			headers
		});

		return data;
	}

	async deletePayment(id: number, headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CHECKOUT, CheckoutPattern.REMOVE_PAYMENTS, { id, headers });

		return data;
	}
}
