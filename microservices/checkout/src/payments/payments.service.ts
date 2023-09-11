import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from '@lib/dto/microservices/checkout/index';
import { OrderService } from '@checkout/order/order.service';

@Injectable()
export class PaymentService {
	constructor(private prisma: PrismaService, private orderService: OrderService) {}

	async getOnlyPayment(param) {
		return this.prisma.payments.findUnique({ where: param });
	}

	async getPayments(user) {
		const orderIds = [];
		const userOrder = await this.orderService.getAllOrders({ user_id: user.sub });

		userOrder.map((order) => {
			orderIds.push(order.id);
		});

		return this.prisma.payments
			.findMany({ where: { order_id: {in: orderIds} } })
			.then((result) => {
				return { data: { statusCode: HttpStatus.OK, result: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async createdPayment(user: any, payment: CreatePaymentDto): Promise<any> {
		const orderUser = await this.orderService.getOnlyOrder({ user_id: user.sub, id: payment.order_id  });
		
		if (!orderUser) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Nenhum pedido encontrado para esse usuário'));
		}

		return this.prisma.payments
			.create({
				data: {
					order_id: payment.order_id,
					value: payment.value,
					transaction_id: payment.transaction_id,
					status: payment.status
				}
			})
			.then((result) => {
				Logger.log('Payment successfully created', 'CreatePayment');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Pagamento criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updatePayment(id: number, updateData: UpdatePaymentDto, user: any): Promise<any> {

		const payment = await this.getOnlyPayment({ id: id });

		if (!payment)
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Pagamento não encontrado!'));

		const order = await this.orderService.getOnlyOrder({ id: payment.order_id });

		if (user.sub !== order.user_id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para editar esse pagamento!')
			);
		}

		return this.prisma.payments
			.update({
				where: { id: id },
				data: updateData
			})
			.then((result) => {
				Logger.log('Payment successfully updated', 'UpdatePayment');

				return { data: { statusCode: HttpStatus.OK, message: 'Pagamento atualizado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async deletePayment(id: number, user: any): Promise<any> {
		const payment = await this.getOnlyPayment({ id: id });

		if (!payment)
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Pagamento não encontrado!'));

		const order = await this.orderService.getOnlyOrder({ id: payment.order_id });

		if (user.sub !== order.user_id) {
			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Usuário não tem permissão para excluir esse pagamento!')
			);
		}

		return this.prisma.payments
			.delete({ where: { id: id } })
			.then(async () => {
				Logger.log('Payment successfully deleted', 'DeletePayment');

				return { data: { statusCode: HttpStatus.OK, message: 'Pagamento excluído com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}
}
