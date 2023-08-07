import { Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
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
import { CartDto, CartItemDto, UpdateCartDto } from '@lib/dto/microservices/cart/index';
import { ResponseTypeDto } from '@lib/dto/general/index';
import { AuthGuard } from '@nestjs/passport';
import { GetUserPipe } from '@lib/pipes/index';
import { Payload } from '@nestjs/microservices';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(AuthGuard())
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	@UsePipes(GetUserPipe)
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Cart found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getCart(@Payload() data: { user }): Promise<any> {
		return this.cartService.getCart(data.user);
	}

	@Post()
	@UsePipes(GetUserPipe)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: CartDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createCart(@Payload() data: { user; data: CartDto }): Promise<ResponseTypeDto> {
		return this.cartService.createCart(data.user, data.data);
	}

	@Put('/:id')
	@UsePipes(GetUserPipe)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: UpdateCartDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateCart(@Param('id') id: any, @Payload() data: { user; data: UpdateCartDto }): Promise<any> {
		return this.cartService.updateCart(data, Number(id.data));
	}

	@Post('/addItem')
	@UsePipes(GetUserPipe)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: CartItemDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The item has been successfully created on cart.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addCartItem(@Payload() data: { user; data: CartItemDto }): Promise<ResponseTypeDto> {
		return this.cartService.addCartItem(data.user, data.data);
	}

	@Delete('/deleteItem/:id')
	@UsePipes(GetUserPipe)
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The item has been successfully deleted on cart.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteCartItem(@Param('id') id: any, @Payload() data: { user }): Promise<ResponseTypeDto> {
		return this.cartService.deleteCartItem(data.user, Number(id.data));
	}
}
