import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreateCartDto, CartItemDto } from '@lib/dto/microservices/cart/index';
import { CartPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getCart(headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.GET_CART, { headers: headers });

		if (data.data.length === 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createCart(cart: CreateCartDto, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART, { cart, headers });

		return data;
	}

	async updateCart(putData: any, id: number, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.UPDATE_CART, { id, putData, headers });

		return data;
	}

	async setCartDefault(id: number, headers): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.SET_CART_DEFAULT, { id, headers });

		return data;
	}

	async addCartItem(cartItem: CartItemDto, headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART_ITEM, { cartItem, headers });

		return data;
	}

	async deleteCartItem(id: number, headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.REMOVE_ITEM_FROM_CART, { id, headers });

		return data;
	}
}
