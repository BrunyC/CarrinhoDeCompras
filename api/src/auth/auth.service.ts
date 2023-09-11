import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserCredentialsDto } from '@lib/dto/api/user/user-credentials.dto';

@Injectable()
export class AuthService {
	constructor(protected configService: ConfigService, private jwtService: JwtService, private prisma: PrismaService) {}

	validateUser(name: string, email: string): Promise<any> {
		return this.prisma.user.findUnique({ where: { name, email } });
	}

	async getUserFromToken(token: string): Promise<any> {
		const payload = await this.jwtService.decode(token);
		return payload;
	}

	async getAccessToken(userCredentialsDto: UserCredentialsDto) {
		const name = await this.validateUser(userCredentialsDto.name, userCredentialsDto.email);

		if (!name) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const payload = { name };
		const accessToken = this.jwtService.sign({ payload });

		return {
			accessToken
		};
	}
}
