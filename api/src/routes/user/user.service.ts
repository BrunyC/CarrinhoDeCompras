import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CreateUserDto, UpdateUserDto } from '@lib/dto/microservices/user/index';
import { Microservice, UserPattern } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getUser(headers): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.USER, UserPattern.GET_USER, { headers: headers });

		if (data.result.length === 0)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async createUser(user: CreateUserDto): Promise<any> {
		const { data } = await this.publish.message(Microservice.USER, UserPattern.POST_USER, user);

		return data;
	}

	async updateUser(user: UpdateUserDto, id: number): Promise<any> {
		const { data } = await this.publish.message(Microservice.USER, UserPattern.UPDATE_USER, {
			id,
			user
		});

		return data;
	}

	async deleteUser(id: number): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.USER, UserPattern.REMOVE_USER, id);

		return data;
	}
}
