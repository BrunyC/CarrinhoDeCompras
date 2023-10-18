import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateOrderItemDto, UpdateOrderItemsDto } from '@lib/dto/microservices/checkout/index';
import { CartService } from '@cart/cart.service';
import { OrderService } from '@checkout/order/order.service';
import { ProductService } from '@product/product.service';
import { ProductPriceService } from '@product_price/product-price.service';

@Injectable()
export class OrderItemsService {
	constructor(
		private prisma: PrismaService,
		private cartService: CartService,
		private orderService: OrderService,
		private productService: ProductService,
		private productPriceService: ProductPriceService
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
		const bodyData = [];

		const cartItemsData = await this.cartService.getCartItems({ cart_id: order.cart_id });
		if (!cartItemsData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Itens do carrinho inválido!'));
		}

		const cartData = await this.cartService.getOnlyCart({ id: cartItemsData[0].cart_id });
		if (!cartData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Carrinho inválido!'));
		}

		if (cartData.user_id !== userData.sub) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para acessar os itens desse carrinho!')
			);
		}

		for (const cartItem of cartItemsData) {
			const productData = await this.productService.getOnlyProduct({ id: cartItem.product_id });
			const productPriceData = await this.productPriceService.getOnlyProductPrice({ id: cartItem.product_price_id });

			bodyData.push({
				cart_id: order.cart_id,
				cart_data: cartData,
				product_id: cartItem.product_id,
				product_data: productData,
				product_price_id: cartItem.product_price_id,
				product_price_data: productPriceData,
				cart_item_status: cartItem.status,
				cart_item_sub_total: cartItem.sub_total
			});
		}

		return this.prisma.orderItems
			.createMany({
				data: bodyData
			})
			.then((result) => {
				Logger.log('Order items successfully created', 'CreateOrderItems');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Itens de pedido criados com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updateOrderItems(id: number, updateData: UpdateOrderItemsDto, userData: any): Promise<any> {
		const orderItemData = await this.getOnlyOrderItems({ id: id });
		if (!orderItemData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'ID não existe!'));
		}

		const cartData = await this.cartService.getOnlyCart({ id: orderItemData.cart_id });

		if (cartData.user_id !== userData.id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para editar os itens desse pedido!')
			);
		}

		return this.prisma.orderItems
			.update({
				where: { id: id },
				data: updateData
			})
			.then((result) => {
				Logger.log('Order items successfully updated', 'UpdateOrderItems');

				return { data: { statusCode: HttpStatus.OK, message: 'Itens de pedido atualizado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async deleteOrderItems(id: number, userData: any): Promise<any> {
		const orderItemData = await this.getOnlyOrderItems({ id: id });
		if (!orderItemData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'ID não existe!'));
		}

		const cartData = await this.cartService.getOnlyCart({ id: orderItemData.cart_id });

		if (cartData.user_id !== userData.id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para excluir os itens desse pedido!')
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
