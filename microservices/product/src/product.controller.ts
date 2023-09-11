import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { ProductPattern } from '@lib/enum/microservices.pattern.enum';
import { CreateProductDto, UpdateProductDto } from '@lib/dto/microservices/product/index';

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@MessagePattern(ProductPattern.GET_PRODUCT)
	async getProduct(@Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.productService.getProduct();

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(ProductPattern.POST_PRODUCT)
	async createdProduct(@Payload() data: CreateProductDto, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.productService.createdProduct(data);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(ProductPattern.UPDATE_PRODUCT)
	async updateProduct(@Payload() data: { id: number; product: UpdateProductDto }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		try {
			const result = await this.productService.updateProduct(data.id, data.product);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(ProductPattern.REMOVE_PRODUCT)
	async deleteProduct(@Payload() id: number, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.productService.deleteProduct(id);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
