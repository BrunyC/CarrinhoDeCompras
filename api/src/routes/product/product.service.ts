import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreateProductDto, UpdateProductDto } from '@lib/dto/microservices/product/index';
import { Microservice, ProductPattern } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getProduct(): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.PRODUCT, ProductPattern.GET_PRODUCT, {});

		if (data.result.length === 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createProduct(body: CreateProductDto[]): Promise<any> {
		const { data } = await this.publish.message(Microservice.PRODUCT, ProductPattern.POST_PRODUCT, body);

		return data;
	}

	async updateProduct(body: UpdateProductDto, id: number): Promise<any> {
		const { data } = await this.publish.message(Microservice.PRODUCT, ProductPattern.UPDATE_PRODUCT, {
			id,
			body
		});

		return data;
	}

	async deleteProduct(id: number): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.PRODUCT, ProductPattern.REMOVE_PRODUCT, id);

		return data;
	}
}
