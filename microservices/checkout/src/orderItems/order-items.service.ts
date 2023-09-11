import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateOrderItemDto, UpdateOrderItemsDto } from '@lib/dto/microservices/checkout/index';
import { ProductService } from '@product/product.service';
import { ProductPriceService } from '@product_price/product-price.service';
import { CartService } from '@cart/cart.service';
import { OrderService } from '@checkout/order/order.service';

@Injectable()
export class OrderItemsService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService,
		private productPriceService: ProductPriceService,
		private cartService: CartService,
		private orderService: OrderService
	) {}

	getOnlyOrderItems(param: any) {
		return this.prisma.orderItems.findUnique({ where: param });
	}

	async getOrderItems(user) {
		const cartIds = [];

		const userOrder = await this.orderService.getAllOrders({ user_id: user.id });

		if (!userOrder) {
			return { data: { statusCode: HttpStatus.OK, result: [], message: 'Nenhum pedido encontrado para esse usuário' } };
		}

		userOrder.map((order) => {
			cartIds.push(order.cart_id);
		});

		return this.prisma.orderItems
			.findMany({ where: { cart_id: { in: cartIds } } })
			.then((result) => {
				return { data: { statusCode: HttpStatus.OK, result: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async createdOrderItems(order: CreateOrderItemDto, userData: any): Promise<any> {
		const cartData = await this.cartService.getOnlyCart({ id: order.cart_id });
		if (!cartData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Carrinho inválido!'));
		}

		if (cartData.user_id !== userData.id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para acessar esse carrinho!')
			);
		}

		const productData = await this.productService.getOnlyProduct({ id: order.product_id });
		if (!productData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Produto inválido!'));
		}

		const priceData = await this.productPriceService.getOnlyProductPrice({ id: order.product_price_id });
		if (!priceData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Preço inválido!'));
		}

		return this.prisma.orderItems
			.create({
				data: {
					cart_id: order.cart_id,
					cart_data: cartData,
					product_id: order.product_id,
					product_data: productData,
					product_price_id: order.product_price_id,
					product_price_data: priceData,
					cart_item_status: order.cart_item_status,
					cart_item_sub_total: order.cart_item_sub_total
				}
			})
			.then((result) => {
				Logger.log('Order successfully created', 'CreateOrder');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Pedido criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updateOrderItems(id: number, updateData: UpdateOrderItemsDto, userData: any): Promise<any> {
		const orderItem = await this.getOnlyOrderItems({ id: id });
		const cartData = await this.cartService.getOnlyCart({ id: orderItem.cart_id });

		if (cartData.user_id !== userData.id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para editar esse pedido!')
			);
		}

		return this.prisma.orderItems
			.update({
				where: { id: id },
				data: updateData
			})
			.then((result) => {
				Logger.log('Order successfully updated', 'UpdateOrder');

				return { data: { statusCode: HttpStatus.OK, message: 'Pedido atualizado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async deleteOrderItems(id: number, userData: any): Promise<any> {
		const orderItem = await this.getOnlyOrderItems({ id: id });
		const cartData = await this.cartService.getOnlyCart({ id: orderItem.cart_id });

		if (cartData.user_id !== userData.id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para excluir esse pedido!')
			);
		}

		return this.prisma.orderItems
			.delete({ where: { id: id } })
			.then(async () => {
				Logger.log('Order successfully deleted', 'DeleteOrder');

				return { data: { statusCode: HttpStatus.OK, message: 'Pedido excluído com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}
}
