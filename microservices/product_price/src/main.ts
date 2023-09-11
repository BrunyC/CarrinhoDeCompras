import { NestFactory } from '@nestjs/core';
import { ProductPriceModule } from './product-price.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMQConfig } from '@config/index';
import { Microservice } from '@lib/enum/index';

const rabbitMqConfig = new RabbitMQConfig();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		ProductPriceModule,
		rabbitMqConfig.getOptions(Microservice.PRODUCT_PRICE)
	);

	await app.listen();
}

bootstrap();
