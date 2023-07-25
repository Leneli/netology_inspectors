import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status || 500,
      status: 'fail',
      timestamp: new Date().toISOString(),
      data: {
        method: request.method,
        path: request.url,
        httpVersion: request.httpVersion,
        rawHeaders: request.rawHeaders,
        params: request.params,
        body: request.body,
        query: request.query,
      },
    });
  }
}
