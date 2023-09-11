import { Controller, Delete, Get, Param, Put, Post, UsePipes, ValidationPipe, Body, Headers } from '@nestjs/common';
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
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from '@lib/dto/microservices/checkout/index';

@ApiTags('Checkout/Order')
@Controller('order')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Order found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getOrder(@Headers() headers): Promise<any> {
		return this.orderService.getOrder(headers);
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: CreateOrderDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The item has been successfully created on cart.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addCartItem(@Body() data: CreateOrderDto, @Headers() headers): Promise<ResponseTypeDto> {
		return this.orderService.createOrder(data, headers);
	}

	@Put('/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: UpdateOrderDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The order has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateOrder(@Param('id') id: any, @Body() data: UpdateOrderDto, @Headers() headers): Promise<any> {
		return this.orderService.updateOrder(data, Number(id), headers);
	}

	@Delete('/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The item has been successfully deleted on order.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteOrder(@Param('id') id: any, @Headers() headers): Promise<ResponseTypeDto> {
		return this.orderService.deleteOrder(Number(id), headers);
	}
}
