import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { version, description } from 'package.json';
import helmet from 'helmet';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.use(helmet());

	const swaggerApiOptions = new DocumentBuilder()
		.setTitle('MeliControl Microservices')
		.setDescription(description)
		.setVersion(version)
		.build();

	const swaggerApiDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerApiOptions);
	SwaggerModule.setup('api/docs', app, swaggerApiDocument);

	await app.listen(configService.get('PORT'));
}
bootstrap();
