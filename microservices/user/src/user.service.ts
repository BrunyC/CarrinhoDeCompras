import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '@lib/dto/general/index';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '@lib/dto/microservices/user/index';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getOnlyUser(param: any) {
		return this.prisma.user.findUnique({ where: param });
	}

	async getUser() {
		return this.prisma.user
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

	async createdUser(user: CreateUserDto): Promise<any> {
		return this.prisma.user
			.create({
				data: user
			})
			.then((result) => {
				Logger.log('User successfully created', 'CreateUser');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Usuário criado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async updateUser(id: number, updateData: UpdateUserDto): Promise<any> {
		return this.prisma.user
			.update({
				where: { id: id },
				data: updateData
			})
			.then((result) => {
				Logger.log('User successfully updated', 'UpdateUser');

				return { data: { statusCode: HttpStatus.OK, message: 'Usuário atualizado com sucesso!', data: result } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}

	async deleteUser(id: number): Promise<any> {
		return this.prisma.user
			.delete({ where: { id: id } })
			.then(async () => {
				Logger.log('User successfully deleted', 'DeleteUser');

				return { data: { statusCode: HttpStatus.OK, message: 'Usuário excluído com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.meta ? error.meta : error.message));
			});
	}
}
