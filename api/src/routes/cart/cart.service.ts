import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CartDto, CartItemDto, DeleteCartItemDto } from '@lib/dto/microservices/cart/index';
import { CartPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getCart(userId: number): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.GET_CART, userId);

		if (data.result.length <= 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createCart(cart: CartDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART, cart);

		return data;
	}

	async addCartItem(cartItem: CartItemDto): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART_ITEM, cartItem);

		return data;
	}

	async deleteCartItem(deleteItem: DeleteCartItemDto): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.REMOVE_ITEM_FROM_CART, deleteItem);

		return data;
	}
}
