import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from '@lib/dto/microservices/checkout/index';
import { CartService } from '@cart/cart.service';
import { UserService } from '@user/user.service';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService, private cartService: CartService, private userService: UserService) {}

	getOnlyOrder(param: any) {
		return this.prisma.order.findUnique({ where: param });
	}

	getAllOrders(param: any) {
		return this.prisma.order.findMany({ where: param });
	}

	async getOrder(user) {
		return this.prisma.order
			.findMany({ where: { user_id: user.sub } })
			.then((result) => {
				return { data: { statusCode: HttpStatus.OK, result: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async createdOrder(user: any, order: CreateOrderDto): Promise<any> {
		const cartData = await this.cartService.getOnlyCart({ id: order.cart_id });

		if (!cartData) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Carrinho não encontrado!'));
		}

		if (user.sub !== cartData.user_id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para criar um pedido desse carrinho!')
			);
		}

		const userData = await this.userService.getOnlyUser({ user_id: user.sub });

		return this.prisma.order
			.create({
				data: {
					cart_id: order.cart_id,
					cart_data: cartData,
					user_id: user.sub,
					user_data: userData,
					status: order.status
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

	async updateOrder(id: number, updateData: UpdateOrderDto, user: any): Promise<any> {
		const order = await this.getOnlyOrder({ id: id });
		if (!order) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Pedido não encontrado!'));
		}

		if (user.sub !== order.user_id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para editar esse pedido!')
			);
		}

		return this.prisma.order
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

	async deleteOrder(id: number, user: any): Promise<any> {
		const order = await this.getOnlyOrder({ id: id, payment_status: false });

		if (!order) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Pedido não encontrado ou não pode ser excluído!'));
		}

		if (user.sub !== order.user_id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para excluir esse pedido!')
			);
		}

		return this.prisma.order
			.delete({ where: { id: id, payment_status: false } })
			.then(async () => {
				Logger.log('Order successfully deleted', 'DeleteOrder');

				return { data: { statusCode: HttpStatus.OK, message: 'Pedido excluído com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}
}
