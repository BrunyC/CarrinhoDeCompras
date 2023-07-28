import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CartPattern } from '@lib/enum/microservices.pattern.enum';
import { CartDto, CartItemDto, DeleteCartItemDto } from '@lib/dto/microservices/cart/index';

@Controller()
export class CartController {
	constructor(private cartService: CartService) {}

	@MessagePattern(CartPattern.POST_CART)
	async createCart(@Payload() cart: CartDto, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.createdCart(cart);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.POST_CART_ITEM)
	async addCartItem(@Payload() cartItem: CartItemDto, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.addCartItem(cartItem);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.REMOVE_ITEM_FROM_CART)
	async deleteCartItem(@Payload() deleteItem: DeleteCartItemDto, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.deleteCartItem(deleteItem);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
