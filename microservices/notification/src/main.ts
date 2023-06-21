import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMQConfig } from '@config/index';
import { Microservice } from '@lib/enum/index';
import { NotificationModule } from './notification.module';

const rabbitMqConfig = new RabbitMQConfig();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		NotificationModule,
		rabbitMqConfig.getOptions(Microservice.NOTIFICATION)
	);

	await app.listen();
}

bootstrap();
