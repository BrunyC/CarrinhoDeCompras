import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMQConfig } from '@config/index';
import { Microservice } from '@lib/enum/index';

const rabbitMqConfig = new RabbitMQConfig();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, rabbitMqConfig.getOptions(Microservice.CHECKOUT));

	await app.listen();
}

bootstrap();
