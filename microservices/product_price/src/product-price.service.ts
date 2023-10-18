import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProductPriceDto, UpdateProductPriceDto } from '@lib/dto/microservices/product_price/index';

@Injectable()
export class ProductPriceService {
	constructor(private prisma: PrismaService) {}

	getOnlyProductPrice(param: any): Promise<any> {
		return this.prisma.productPrice.findUnique({ where: param });
	}

	async getProductPrice() {
		return this.prisma.productPrice
			.findMany({
				where: {}
			})
			.then((result) => {
				return { data: { statusCode: HttpStatus.OK, result: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async createdProductPrice(data: CreateProductPriceDto[]): Promise<any> {
		return this.prisma.productPrice
			.createMany({
				data: data
			})
			.then((result) => {
				Logger.log('Product prices successfully created', 'CreateProductPrice');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Preço dos produtos criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updateProductPrice(id: number, updateData: UpdateProductPriceDto): Promise<any> {
		return this.prisma.productPrice
			.update({
				where: { id: id },
				data: updateData
			})
			.then((result) => {
				Logger.log('Product price successfully updated', 'UpdateProductPrice');

				return { data: { statusCode: HttpStatus.OK, message: 'Preço do produto atualizado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async deleteProductPrice(id: number): Promise<any> {
		return this.prisma.productPrice
			.delete({ where: { id: id } })
			.then(async () => {
				Logger.log('Product price successfully deleted', 'DeleteProductPrice');

				return { data: { statusCode: HttpStatus.OK, message: 'Preço do produto excluído com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}
}
