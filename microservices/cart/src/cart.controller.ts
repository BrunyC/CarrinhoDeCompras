import { Controller, UsePipes } from '@nestjs/common';
import { CartService } from './cart.service';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CartPattern } from '@lib/enum/microservices.pattern.enum';
import { GetUserPipe } from '@lib/pipes/get-user-data.pipe';

@Controller()
export class CartController {
	constructor(private cartService: CartService) {}

	@UsePipes(GetUserPipe)
	@MessagePattern(CartPattern.GET_CART)
	async getCart(@Payload() { data: { userData } }: { data: { userData } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.getCart(userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CartPattern.POST_CART)
	async createCart(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.checkUserToCreateCart(value.cart, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CartPattern.UPDATE_CART)
	async updateCart(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.updateCart(value.id, value.putData, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CartPattern.SET_CART_DEFAULT)
	async setCartDefault(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.setDefault(value.id, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CartPattern.POST_CART_ITEM)
	async addCartItem(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.addCartItem(value.cartItem, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CartPattern.REMOVE_ITEM_FROM_CART)
	async deleteCartItem(
		@Payload() { data: { userData, value } }: { data: { userData; value } },
		@Ctx() context: RmqContext
	): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.deleteCartItem(value.id, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
