import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreateProductPriceDto, UpdateProductPriceDto } from '@lib/dto/microservices/product_price/index';
import { Microservice, ProductPricePattern } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductPriceService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getProductPrice(): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.PRODUCT_PRICE, ProductPricePattern.GET_PRODUCT_PRICE, {});

		if (data.result.length === 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createProductPrice(product: CreateProductPriceDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.PRODUCT_PRICE, ProductPricePattern.POST_PRODUCT_PRICE, product);

		return data;
	}

	async updateProductPrice(product: UpdateProductPriceDto, id: number): Promise<any> {
		const { data } = await this.publish.message(Microservice.PRODUCT_PRICE, ProductPricePattern.UPDATE_PRODUCT_PRICE, {
			id,
			product
		});

		return data;
	}

	async deleteProductPrice(id: number): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.PRODUCT_PRICE, ProductPricePattern.REMOVE_PRODUCT_PRICE, id);

		return data;
	}
}
