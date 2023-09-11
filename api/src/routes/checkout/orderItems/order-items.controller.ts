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
import { CreateOrderItemDto, UpdateOrderItemsDto } from '@lib/dto/microservices/checkout/index';
import { OrderItemsService } from './order-items.service';

@ApiTags('Checkout/Order Items')
@Controller('orderItems')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class OrderItemsController {
	constructor(private readonly orderItemsService: OrderItemsService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Order Items found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getOrderItems(@Headers() headers): Promise<any> {
		return this.orderItemsService.getOrderItems(headers);
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: CreateOrderItemDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The order item has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createOrderItem(@Body() data: CreateOrderItemDto, @Headers() headers): Promise<ResponseTypeDto> {
		return this.orderItemsService.createOrderItem(data, headers);
	}

	@Put('/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: UpdateOrderItemsDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The order item has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateOrderItems(@Param('id') id: any, @Body() data: UpdateOrderItemsDto, @Headers() headers): Promise<any> {
		return this.orderItemsService.updateOrderItems(data, Number(id), headers);
	}

	@Delete('/:id')
	@UsePipes()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The order item has been successfully deleted on order items.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteOrderItems(@Param('id') id: any, @Headers() headers): Promise<ResponseTypeDto> {
		return this.orderItemsService.deleteOrderItems(Number(id), headers);
	}
}
