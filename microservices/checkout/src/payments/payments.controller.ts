import { Controller, UsePipes } from '@nestjs/common';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CheckoutPattern } from '@lib/enum/microservices.pattern.enum';
import { PaymentService } from './payments.service';
import { GetUserPipe } from '@lib/pipes/index';

@Controller()
export class PaymentController {
	constructor(private paymentService: PaymentService) {}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.GET_PAYMENTS)
	async getPayments(@Payload() { data: { userData } }: { data: { userData } }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.paymentService.getPayments(userData);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@UsePipes(GetUserPipe)
	@MessagePattern(CheckoutPattern.POST_PAYMENTS)
	async createdPayment(
		@Payload() { data: { userData, value } }: { data: { userData; value } },
		@Ctx() context: RmqContext
	): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.paymentService.createdPayment(userData, value.payment);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
