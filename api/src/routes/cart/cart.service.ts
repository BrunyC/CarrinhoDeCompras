import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CartDto, CartItemDto } from '@lib/dto/microservices/cart/index';
import { CartPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getCart(user: any): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.GET_CART, user);

		if (data.result.length <= 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createCart(user, cart: CartDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART, { cart, user });

		return data;
	}

	async updateCart(putData: any, id: number): Promise<any> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.UPDATE_CART, {
			id,
			putData: putData.data,
			user: putData.user
		});

		return data;
	}

	async addCartItem(user: any, cartItem: CartItemDto): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.POST_CART_ITEM, { cartItem, user });

		return data;
	}

	async deleteCartItem(user: any, id: number): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.REMOVE_ITEM_FROM_CART, { id, user });

		return data;
	}
}
