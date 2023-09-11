import { Controller, UsePipes } from '@nestjs/common';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CheckoutPattern } from '@lib/enum/microservices.pattern.enum';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto, UpdateOrderItemsDto } from '@lib/dto/microservices/checkout/index';
import { GetUserPipe } from '@lib/pipes/index';

@Controller()
export class OrderItemsController {
	constructor(private orderItemsService: OrderItemsService) {}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.GET_ORDER_ITEMS)
	async getOrderItems(@Payload() { data: { userData } }: { data: { userData } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.orderItemsService.getOrderItems(userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.CREATE_ORDER_ITEMS)
	async createdOrderItems(
		@Payload() { data: { userData, value } }: { data: { userData; value } },
		@Ctx() context: RmqContext
	): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.orderItemsService.createdOrderItems(value.order, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.UPDATE_ORDER_ITEMS)
	async updateOrderItems(
		@Payload() { data: { userData, value } }: { data: { userData; value } },
		@Ctx() context: RmqContext
	): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		try {
			const result = await this.orderItemsService.updateOrderItems(value.id, value.putData, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.REMOVE_ORDER_ITEMS)
	async deleteOrderItems(
		@Payload() { data: { userData, value } }: { data: { userData; value } },
		@Ctx() context: RmqContext
	): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.orderItemsService.deleteOrderItems(value.id, userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
