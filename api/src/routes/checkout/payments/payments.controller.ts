import { Body, Controller, Get, Headers, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiHeader,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ResponseTypeDto } from '@lib/dto/general/index';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from '@lib/dto/microservices/checkout/index';

@ApiTags('Checkout')
@Controller('payments')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Payments found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getPayments(@Headers() headers): Promise<any> {
		return this.paymentsService.getPayments(headers);
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: CreatePaymentDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'Payment has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addPayment(@Body() data: CreatePaymentDto, @Headers() headers): Promise<ResponseTypeDto> {
		return this.paymentsService.createPayment(data, headers);
	}
}
