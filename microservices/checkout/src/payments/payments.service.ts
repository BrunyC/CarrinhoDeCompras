import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreatePaymentDto } from '@lib/dto/microservices/checkout/index';
import { OrderService } from '@checkout/order/order.service';
import { OrderItemsService } from '@checkout/orderItems/order-items.service';
import { ConfigService } from '@nestjs/config';
import { HttpHelper } from '@lib/helper/index';

@Injectable()
export class PaymentService {
	constructor(
		private prisma: PrismaService,
		private orderService: OrderService,
		private orderItemService: OrderItemsService,
		private configService: ConfigService,
		private httpHelper: HttpHelper
	) {}

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
			.findMany({ where: { order_id: { in: orderIds } } })
			.then((result) => {
				return { data: { statusCode: HttpStatus.OK, result: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async createdPayment(user: any, payment: CreatePaymentDto): Promise<any> {
		const orderUser = await this.orderService.getOnlyOrder({ user_id: user.sub, id: payment.order_id });

		if (!orderUser) {
			throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, 'Nenhum pedido encontrado para esse usuário'));
		}

		const orderItems = await this.orderItemService.getOrderItems({ cart_id: orderUser.cart_id });

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

				// this.sendPaymentToMP(orderUser, orderItems);

				return { data: { statusCode: HttpStatus.CREATED, message: 'Pagamento criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	// async sendPaymentToMP(order, orderItems) {
	// 	const HOST = this.configService.get('MP_HOST');
	// 	const ENDPOINT = this.configService.get('MP_ENDPOINT');
	// 	const HEADER = {
	// 		'Authorization': `Bearer ${this.configService.get('MP_ACCESS_TOKEN')}`
	// 	};

	// 	const items = [];
	// 	const backUrls = {
	// 		success: this.configService.get('SUCCESS_BACK_URL'),
	// 		failure: this.configService.get('FAILURE_BACK_URL'),
	// 		pending: this.configService.get('PENDING_BACK_URL')
	// 	};

	// 	for (const orderItem of orderItems.data.result) {
	// 		items.push({
	// 			id: orderItem.product_id,
	// 			title: orderItem.product_data.title,
	// 			description: orderItem.product_data.description,
	// 			quantity: orderItem.product_data.qty,
	// 			currency_id: 'BRL',
	// 			unit_price: orderItem.product_price_data.price
	// 		});
	// 	}

	// 	await this.httpHelper.POST(HOST, ENDPOINT, HEADER, items, true);
	// }
}
