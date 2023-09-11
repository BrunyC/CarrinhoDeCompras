import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { CreateCartDto, CartItemDto, UpdateCreateCartDto } from '@lib/dto/microservices/cart/index';
import { ResponseTypeDto } from '@lib/dto/general/index';

@ApiTags('Cart')
@Controller('cart')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Cart found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getCart(@Headers() headers: any): Promise<any> {
		return this.cartService.getCart(headers);
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true }))
	@ApiBody({
		type: CreateCartDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createCart(@Body() data: CreateCartDto, @Headers() headers: any): Promise<ResponseTypeDto> {
		return this.cartService.createCart(data, headers);
	}

	@Put('/setDefault/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart deafult has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async setCartDefault(@Param('id') id: any, @Headers() headers: any): Promise<any> {
		return this.cartService.setCartDefault(Number(id), headers);
	}

	@Put('/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: UpdateCreateCartDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateCart(@Param('id') id: any, @Body() data: UpdateCreateCartDto, @Headers() headers: any): Promise<any> {
		return this.cartService.updateCart(data, Number(id), headers);
	}

	@Post('/addItem')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: CartItemDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The item has been successfully created on cart.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addCartItem(@Body() data: CartItemDto, @Headers() headers: any): Promise<ResponseTypeDto> {
		return this.cartService.addCartItem(data, headers);
	}

	@Delete('/deleteItem/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The item has been successfully deleted on cart items.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteCartItem(@Param('id') id: any, @Headers() headers: any): Promise<ResponseTypeDto> {
		return this.cartService.deleteCartItem(Number(id), headers);
	}
}
