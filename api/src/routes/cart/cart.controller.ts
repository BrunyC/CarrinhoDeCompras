import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { CartDto, CartItemDto, DeleteCartItemDto } from '@lib/dto/microservices/cart/index';
import { ResponseTypeDto } from '@lib/dto/general/index';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get('/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Cart found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getCart(@Param('id') userId: string): Promise<ResponseTypeDto> {
		return this.cartService.getCart(Number(userId));
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: CartDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createCart(@Body() cart: CartDto): Promise<ResponseTypeDto> {
		return this.cartService.createCart(cart);
	}

	@Post('/addItem')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: CartItemDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The item has been successfully created on cart.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addCartItem(@Body() cartItem: CartItemDto): Promise<ResponseTypeDto> {
		return this.cartService.addCartItem(cartItem);
	}

	@Delete('/deleteItem')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		description: 'The body request is a json.'
	})
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The item has been successfully deleted on cart.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteCartItem(@Body() deleteItem: DeleteCartItemDto): Promise<ResponseTypeDto> {
		return this.cartService.deleteCartItem(deleteItem);
	}
}
