import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMQConfig } from '@config/index';
import { Microservice } from '@lib/enum/index';

const rabbitMqConfig = new RabbitMQConfig();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, rabbitMqConfig.getOptions(Microservice.USER));

	await app.listen();
}

bootstrap();
