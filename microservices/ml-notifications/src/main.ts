import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationModule);

	await app.listen();
}

bootstrap();
