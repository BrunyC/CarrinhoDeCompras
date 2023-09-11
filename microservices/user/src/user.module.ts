import { RabbitMQModule } from '@config/index';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '@api/auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot(), RabbitMQModule, PrismaModule, AuthModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
