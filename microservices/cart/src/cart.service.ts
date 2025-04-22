import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCartDto, CartItemDto } from '@lib/dto/microservices/cart/index';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProductService } from '@product/product.service';
import { ProductPriceService } from '@product_price/product-price.service';
import { UserService } from '@user/user.service';

@Injectable()
export class CartService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService,
		private productPriceService: ProductPriceService,
		private userService: UserService
	) {}

	getOnlyCart(param: any): Promise<any> {
		return this.prisma.cart.findUnique({ where: param });
	}

	getOnlyCartItem(param: any): Promise<any> {
		return this.prisma.cartItems.findUnique({ where: param });
	}

	getCartItems(param: {}) {
		return this.prisma.cartItems
			.findMany({
				where: param
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	private createdCartItem(cartItemDto: CartItemDto, subTotalPrice) {
		return this.prisma.cartItems
			.create({
				data: {
					sub_total: subTotalPrice,
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
			})
			.then((result) => {
				Logger.log('CartItem successfully created', 'CreateCartItem');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Item inserido com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	private async recalculateTotalPriceCart(cartId, values, user) {
		try {
			let result: Number = 0;
			for (let i = 0; i < values.length; i++) {
				result += values[i];
			}

			const dataToUpdate = { total: Number(result) };

			await this.updateCart(cartId, dataToUpdate, user);
		} catch (error) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
		}
	}

	async getCart(user: any): Promise<any> {
		return this.prisma.cart
			.findMany({ where: { user_id: user.sub }, include: { cart_items: { include: { product: true, product_price: true } } } })
			.then((result) => {
				return { data: { statusCode: HttpStatus.OK, data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async checkUserToCreateCart(cart: CreateCartDto, user: any) {
		const resultUser = await this.userService.getOnlyUser({ user_id: user.sub });

		if (!resultUser) {
			return this.userService
				.createdUser({ name: user.name, email: user.email, user_id: user.sub, status: true })
				.then(() => {
					return this.createdCart(cart, user);
				})
				.catch((error) => {
					throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
				});
		}

		return this.createdCart(cart, user);
	}

	async createdCart(cart: CreateCartDto, user: any): Promise<any> {
		return this.prisma.cart
			.create({
				data: {
					user_id: user.sub,
					title: cart.title,
					total: 0
				}
			})
			.then((result) => {
				Logger.log('Cart successfully created', 'CreateCart');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Carrinho criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updateCart(id: number, updateData, user: any): Promise<any> {
		const userCart = await this.getOnlyCart({ id: id, user_id: user.sub });

		if (!userCart) {
			Logger.log('Cart not updated. User has not permission to update this cart', 'UpdateCart');

			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Você não tem permissão para alterar este carrinho.')
			);
		} else {
			return this.prisma.cart
				.update({
					where: { id: id },
					data: updateData
				})
				.then((result) => {
					Logger.log('Cart successfully updated', 'UpdateCart');

					return { data: { statusCode: HttpStatus.OK, message: 'Carrinho atualizado com sucesso!', data: result } };
				})
				.catch((error) => {
					throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
				});
		}
	}

	async setDefault(id: number, user: any): Promise<any> {
		const userCart = await this.getOnlyCart({ id: id, user_id: user.sub });

		if (!userCart) {
			Logger.log('Cart not updated. User has not permission to update this cart', 'UpdateCart');

			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para alterar este carrinho.')
			);
		} else {
			return this.prisma.cart
				.update({
					where: { id: id },
					data: { default: true, status: false }
				})
				.then((result) => {
					Logger.log('Cart deafult successfully updated', 'UpdateDefaultCart');

					return { data: { statusCode: HttpStatus.OK, message: 'Carrinho atualizado com sucesso!', data: result } };
				})
				.catch((error) => {
					throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
				});
		}
	}

	async addCartItem(cartItemDto: CartItemDto, user: any): Promise<any> {
		const { cart_id, product_id, product_price_id } = cartItemDto;

		const product = await this.productService.getOnlyProduct({ id: product_id });

		if (!product) throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Produto não encontrado.'));

		const price = await this.productPriceService.getOnlyProductPrice({ id: product_price_id });
		if (!price) throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Preço do produto não encontrado.'));

		const subTotalPrice = Number(product.qty) * Number(price.price);
		let result: any;

		const userCart = await this.getOnlyCart({ id: cart_id, user_id: user.sub, default: false });

		if (!userCart) {
			Logger.log('User has not permission to insert item in this cart', 'AddCartItem');

			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Você não tem permissão para adicionar item nesse carrinho.')
			);
		} else {
			const dataCartItems = await this.getCartItems({ cart_id: cart_id });

			if (dataCartItems.length > 0) {
				result = await this.createdCartItem(cartItemDto, subTotalPrice);

				const subTotalValues = [subTotalPrice];
				dataCartItems.map((cart) => (cart.cart_id == cart_id ? subTotalValues.push(cart.sub_total) : null));

				this.recalculateTotalPriceCart(cart_id, subTotalValues, user);
			} else {
				result = await this.createdCartItem(cartItemDto, subTotalPrice);
				this.recalculateTotalPriceCart(cart_id, [subTotalPrice], user);
			}
		}
		return result;
	}

	async deleteCartItem(id: number, user: any): Promise<any> {
		const dataCartItem = await this.getCartItems({ id: id });

		if (dataCartItem.length > 0) {
			const userCart = await this.getOnlyCart({ id: dataCartItem[0].cart_id, user_id: user.sub, default: false, status: true });

			if (!userCart) {
				Logger.log('This item cannot be excluded', 'DeleteCartItem');

				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Item não pode ser excluído.'));
			} else {
				return this.prisma.cartItems
					.delete({ where: { id: id } })
					.then(async () => {
						Logger.log('Item successfully deleted', 'DeleteCartItem');

						const dataCartItems = await this.getCartItems({ cart_id: dataCartItem[0].cart_id });

						const subTotalValues = [];

						dataCartItems.map((cart) => subTotalValues.push(cart.sub_total));

						this.recalculateTotalPriceCart(dataCartItem[0].cart_id, subTotalValues, user);

						return { data: { statusCode: HttpStatus.OK, message: 'Item excluído com sucesso.' } };
					})
					.catch((error) => {
						throw new RpcException(
							ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message)
						);
					});
			}
		} else {
			return { data: { statusCode: HttpStatus.NOT_FOUND, message: 'Nenhum item encontrado com esse ID.' } };
		}
	}
}
