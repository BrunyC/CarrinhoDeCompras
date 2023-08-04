import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(protected configService: ConfigService, private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>('JWT_SECRET_PHRASE')
		});
	}

	async validate(payload) {
		const { username, cpf } = payload.payload.username;
		const user = await this.authService.validateUser(username, cpf);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
