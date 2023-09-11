import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { CreatePaymentDto, UpdatePaymentDto } from '@lib/dto/microservices/checkout/index';

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

	@Put('/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: UpdatePaymentDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The payment status has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updatePaymentStatus(@Param('id') id: any, @Body() data: UpdatePaymentDto, @Headers() headers): Promise<any> {
		return this.paymentsService.updatePayment(data, Number(id), headers);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The payment has been successfully deleted.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deletePayment(@Param('id') id: any, @Headers() headers): Promise<ResponseTypeDto> {
		return this.paymentsService.deletePayment(Number(id), headers);
	}
}
