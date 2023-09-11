import { Controller } from '@nestjs/common';
import { ProductPriceService } from './product-price.service';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { ProductPricePattern } from '@lib/enum/microservices.pattern.enum';
import { CreateProductPriceDto, UpdateProductPriceDto } from '@lib/dto/microservices/product_price/index';

@Controller()
export class ProductPriceController {
	constructor(private productPriceService: ProductPriceService) {}

	@MessagePattern(ProductPricePattern.GET_PRODUCT_PRICE)
	async getProductPrice(@Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.productPriceService.getProductPrice();

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(ProductPricePattern.POST_PRODUCT_PRICE)
	async createdProductPrice(@Payload() data: CreateProductPriceDto, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.productPriceService.createdProductPrice(data);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(ProductPricePattern.UPDATE_PRODUCT_PRICE)
	async updateProductPrice(@Payload() data: { id: number; product: UpdateProductPriceDto }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		try {
			const result = await this.productPriceService.updateProductPrice(data.id, data.product);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(ProductPricePattern.REMOVE_PRODUCT_PRICE)
	async deleteProductPrice(@Payload() id: number, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.productPriceService.deleteProductPrice(id);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
