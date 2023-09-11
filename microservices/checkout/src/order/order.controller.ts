import { Controller, UsePipes } from '@nestjs/common';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CheckoutPattern } from '@lib/enum/microservices.pattern.enum';
import { OrderService } from './order.service';
import { GetUserPipe } from '@lib/pipes/index';

@Controller()
export class OrderController {
	constructor(private orderService: OrderService) {}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.GET_ORDER)
	async getOrder(@Payload() { data: { userData } }: { data: { userData } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.orderService.getOrder(userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.CREATE_ORDER)
	async createdOrder(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.orderService.createdOrder(userData, value.order);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.UPDATE_ORDER)
	async updateOrder(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		try {
			const result = await this.orderService.updateOrder(value.id, value.putData, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.REMOVE_ORDER)
	async deleteOrder(@Payload() { data: { userData, value } }: { data: { userData; value } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.orderService.deleteOrder(value.id, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
