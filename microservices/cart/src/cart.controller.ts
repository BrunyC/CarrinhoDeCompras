import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CartPattern } from '@lib/enum/microservices.pattern.enum';
import { CartDto, CartItemDto, UpdateCartDto } from '@lib/dto/microservices/cart/index';

@Controller()
export class CartController {
	constructor(private cartService: CartService) {}

	@MessagePattern(CartPattern.GET_CART)
	async getCart(@Payload() user: any, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.getCart(user);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.POST_CART)
	async createCart(@Payload() data: { cart: CartDto; user: any }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.createdCart(data.cart, data.user);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.UPDATE_CART)
	async updateCart(@Payload() data: { id: number; putData: UpdateCartDto; user: any }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		try {
			const result = await this.cartService.updateCart(data.id, data.putData, data.user);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.POST_CART_ITEM)
	async addCartItem(@Payload() data: { cartItem: CartItemDto; user: any }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.addCartItem(data.cartItem, data.user);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.REMOVE_ITEM_FROM_CART)
	async deleteCartItem(@Payload() data: { id: number; user: any }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.deleteCartItem(data.id, data.user);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
