import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProductDto } from '@lib/dto/microservices/product/create-product.dto';
import { UpdateProductDto } from '@lib/dto/microservices/product/update-product.dto';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	getOnlyProduct(param: any): Promise<any> {
		return this.prisma.product.findUnique({ where: param });
	}
	async getProduct() {
		return this.prisma.product
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

	async createdProduct(product: CreateProductDto): Promise<any> {
		return this.prisma.product
			.create({
				data: product
			})
			.then((result) => {
				Logger.log('Product successfully created', 'CreateProduct');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Produto criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updateProduct(id: number, updateData: UpdateProductDto): Promise<any> {
		return this.prisma.product
			.update({
				where: { id: id },
				data: updateData
			})
			.then((result) => {
				Logger.log('Product successfully updated', 'UpdateProduct');

				return { data: { statusCode: HttpStatus.OK, message: 'Produto atualizado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async deleteProduct(id: number): Promise<any> {
		return this.prisma.product
			.delete({ where: { id: id } })
			.then(async () => {
				Logger.log('Product successfully deleted', 'DeleteProduct');

				return { data: { statusCode: HttpStatus.OK, message: 'Produto excluído com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}
}
