import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './shared/exceptions/global.exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
	});

	app.useGlobalFilters(new GlobalExceptionFilter());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			validateCustomDecorators: true,
			exceptionFactory: (errors: any) => {
				const errorMessages = errors.reduce((acc, error) => {
					const field = error.property;
					const constraint = Object.values(error.constraints)[0];
					acc[field] = constraint || 'Некорректное значение';
					return acc;
				}, {});
				return new BadRequestException(errorMessages);
			},
		}),
	);

	await app.listen(5000);
}
bootstrap();
