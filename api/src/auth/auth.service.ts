import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtPayload } from './jwt/jwt.payload';
import { UserCredentialsDto } from '@lib/dto/api/user/user-credentials.dto';

@Injectable()
export class AuthService {
	constructor(protected configService: ConfigService, private jwtService: JwtService, private prisma: PrismaService) {}

	validateUser(username: string, cpf: string): Promise<any> {
		return this.prisma.user.findUnique({ where: { username, cpf } });
	}

	getUserFromToken(token: string): Promise<any> {
		const id = this.jwtService.decode(token)['userId'];
		return this.prisma.user.findUnique({ where: { id } });
	}

	async getAccessToken(userCredentialsDto: UserCredentialsDto) {
		const username = await this.validateUser(userCredentialsDto.username, userCredentialsDto.cpf);

		if (!username) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const payload = { username };
		const accessToken = this.jwtService.sign({ payload });

		return {
			accessToken
		};
	}
}
