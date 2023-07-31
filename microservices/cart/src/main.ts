import { NestFactory } from '@nestjs/core';
import { CartModule } from './cart.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMQConfig } from '@config/index';
import { Microservice } from '@lib/enum/index';

const rabbitMqConfig = new RabbitMQConfig();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(CartModule, rabbitMqConfig.getOptions(Microservice.CART));

	await app.listen();
}

bootstrap();
