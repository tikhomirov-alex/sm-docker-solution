import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status: number;
		let message: string;
		let errors: { [key: string]: string } = {};

		console.log('******************');
		console.log(exception);
		console.log(response);
		console.log(request);
		console.log('******************');

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			message = exception.message || 'Ошибка';

			if (exception instanceof BadRequestException) {
				const responseData = exception.getResponse();
				message = 'Ошибка при валидации данных';

				if (typeof responseData === 'object' && responseData !== null) {
					errors = Object.keys(responseData).reduce((acc, key) => {
						acc[key] = String(responseData[key]);
						return acc;
					}, {});
				}
			}
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			message = 'Произошла внутренняя ошибка сервера';
		}

		response.status(status).json({
			timestamp: new Date(),
			path: request.url,
			message,
			statusCode: status,
			error:
				exception instanceof HttpException
					? exception.name
					: 'Internal Server Error',
			errors,
		});
	}
}
