import { MicroserviceProxy } from '@config/index';
import { CartDto, CartItemDto, DeleteCartItemDto } from '@lib/dto/microservices/cart/index';
import { CartPattern, Microservice } from '@lib/enum/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async createCart(cart: CartDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART, cart);

		return data;
	}

	async addCartItem(cartItem: CartItemDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART_ITEM, cartItem);

		return data;
	}

	async deleteCartItem(deleteItem: DeleteCartItemDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.REMOVE_ITEM_FROM_CART, deleteItem);

		return data;
	}
}
