import { AuthService } from '@api/auth/auth.service';
import { ArgumentMetadata, HttpStatus, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { ExceptionObjectDto } from '../dto/general';

@Injectable()
export class GetUserPipe implements PipeTransform {
	constructor(protected readonly authService: AuthService, protected readonly prisma: PrismaService) {}
	async transform(value: any | any[], { type }: ArgumentMetadata) {
		if (type !== 'body') return value;

		try {
			const authToken = value.headers.authorization.replace('Bearer ', '');

			const userData = await this.authService.getUserFromToken(authToken);

			if (!userData.sub)
				throw 'Erro ao obter o id do usuário.';

			return { data: { userData, value } };
		} catch (error) {
			Logger.log(`An error occurred to get user id: ${JSON.stringify(error)}`, 'GetUserPipe');

			throw new RpcException(
				ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error)
			);
		}
	}
}
