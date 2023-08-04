import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../../../prisma/prisma.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';

const configService = new ConfigService();

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: configService.get<string>('JWT_SECRET_PHRASE'),
			signOptions: {
				expiresIn: Number(configService.get('JWT_TOKEN_EXPIRATION_TIME'))
			}
		}),
		PrismaModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
