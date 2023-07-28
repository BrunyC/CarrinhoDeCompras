import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@config/prisma/prisma.service';
import { CartDto, CartItemDto, DeleteCartItemDto } from '@lib/dto/microservices/cart/index';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';

@Injectable()
export class CartService {
	constructor(
        private prisma: PrismaService,
	) {}

	private getCartItems(param: {}) {
		return this.prisma.cartItems.findMany(
			{ 
				where: param
			}
		).then((result) => {
			return { data: { statusCode: HttpStatus.FOUND, result: result } };
		}).catch((error) => {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
		});
    }

	private createdCartItem(cartItemDto: CartItemDto, subTotalPrice) {
		return this.prisma.cartItems.create({ 
			data: {
				sub_total: subTotalPrice,
				total: subTotalPrice,
				months: cartItemDto.months,
				price: cartItemDto.price,
				status: cartItemDto.status,
				cart: {
					connect: {
						id: cartItemDto.cart_id
					}
				},
				product: {
					connect: {
						id: cartItemDto.product_id
					}
				},
				product_price: {
					connect: {
						id: cartItemDto.product_price_id
					}
				}
			}
		}).then(() => {
			Logger.log('CartItem successfully created', 'CreateCartItem');

			return { data: { statusCode: HttpStatus.CREATED, message: 'Item inserido com sucesso.' } };
		}).catch((error) => {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
		});
    }

	private updateCartItem(cartId, data) {
		return this.prisma.cartItems.updateMany({
			where: {
			  cart_id: cartId,
			},
			data: data
		}).then(() => {
			Logger.log('CartItem successfully updated', 'UpadateCartItem');

			return { data: { statusCode: HttpStatus.CREATED, message: 'Item inserido com sucesso.' } };
		}).catch((error) => {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
		});
	}

	private recalculateTotalPriceCart(values) {
		let result: Number = 0;
		for (let i = 0; i < values.length; i++ ){
			result += values[i];
		}
		return result;
	}

	createdCart(cart: CartDto) {
		return this.prisma.cart.create({ data: cart }).then(() => {
			Logger.log('Cart successfully created', 'CreateCart');
			return { data: { statusCode: HttpStatus.CREATED, message: 'Carrinho criado com sucesso.' } };
		}).catch((error) => {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
		});
    }

	async addCartItem(cartItemDto: CartItemDto): Promise<any> {
		const { cart_id } = cartItemDto;
		const subTotalPrice = Number(cartItemDto.months) * Number(cartItemDto.price);
		let result = {};

		const dataCartItems = await this.getCartItems({cart_id: cart_id});

		if (dataCartItems.data.result.length > 0) {
			result = await this.createdCartItem(cartItemDto, subTotalPrice);

			const subTotalValues = [subTotalPrice];
			dataCartItems.data.result.map((cart) => cart.cart_id == cart_id ? subTotalValues.push(cart.sub_total) : null);

			const recalculateResult = this.recalculateTotalPriceCart(subTotalValues);

			const dataToUpdate = {total: Number(recalculateResult)};

			await this.updateCartItem(cart_id, dataToUpdate);
		} else {
			result = await this.createdCartItem(cartItemDto, subTotalPrice);
		}

		return result;
	}

	deleteCartItem(deleteItem: DeleteCartItemDto) {
		return this.prisma.cartItems.deleteMany(
			{ 
				where: { 
					cart_id: Number(deleteItem.cart_id),
					product_id: Number(deleteItem.product_id)
				}
			}
		).then(async () => {
			Logger.log('Item successfully deleted', 'DeleteCartItem');

			const dataCartItems = await this.getCartItems({cart_id: deleteItem.cart_id});

			const totalValues = [];
			dataCartItems.data.result.map((cart) => cart.cart_id == deleteItem.cart_id ? totalValues.push(cart.sub_total) : null);

			const recalculateResult = this.recalculateTotalPriceCart(totalValues);

			const dataToUpdate = {total: Number(recalculateResult)};

			await this.updateCartItem(deleteItem.cart_id, dataToUpdate);

			return { data: { statusCode: HttpStatus.OK, message: 'Item excluído com sucesso.' } };
		}).catch((error) => {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
		});
    }

}
