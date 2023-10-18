import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
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
import { CreateProductDto, UpdateProductDto } from '@lib/dto/microservices/product/index';

@ApiTags('Product')
@Controller('product')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Product found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getProduct(): Promise<any> {
		return this.productService.getProduct();
	}

	@Post()
	@ApiBody({
		type: [CreateProductDto],
		description: 'The body request is a json[].'
	})
	@UsePipes(new ParseArrayPipe({ items: CreateProductDto, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The product has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createProduct(@Body() data: CreateProductDto[]): Promise<ResponseTypeDto> {
		return this.productService.createProduct(data);
	}

	@Put('/:id')
	@ApiBody({
		type: UpdateProductDto,
		description: 'The body request is a json.'
	})
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The product has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto): Promise<any> {
		return this.productService.updateProduct(data, Number(id));
	}

	@Delete('/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The product has been successfully deleted.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteProduct(@Param('id') id: string): Promise<ResponseTypeDto> {
		return this.productService.deleteProduct(Number(id));
	}
}
