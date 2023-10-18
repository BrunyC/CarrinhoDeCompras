import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { ProductPriceService } from './product-price.service';
import { CreateProductPriceDto, UpdateProductPriceDto } from '@lib/dto/microservices/product_price/index';

@ApiTags('ProductPrice')
@Controller('product-price')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class ProductPriceController {
	constructor(private readonly productPriceService: ProductPriceService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Product price found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getProductPrice(): Promise<any> {
		return this.productPriceService.getProductPrice();
	}

	@Post()
	@ApiBody({
		type: [CreateProductPriceDto],
		description: 'The body request is a json.'
	})
	@UsePipes(new ParseArrayPipe({ items: CreateProductPriceDto, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The product price has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createProductPrice(@Body() data: CreateProductPriceDto[]): Promise<ResponseTypeDto> {
		return this.productPriceService.createProductPrice(data);
	}

	@Put('/:id')
	@ApiBody({
		type: UpdateProductPriceDto,
		description: 'The body request is a json.'
	})
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The product price has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateProductPrice(@Param('id') id: string, @Body() data: UpdateProductPriceDto): Promise<any> {
		return this.productPriceService.updateProductPrice(data, Number(id));
	}

	@Delete('/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The product has been successfully deleted.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteProductPrice(@Param('id') id: string): Promise<ResponseTypeDto> {
		return this.productPriceService.deleteProductPrice(Number(id));
	}
}
