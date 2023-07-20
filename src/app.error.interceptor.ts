import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

type TRes = {
  status: 'success' | 'fail';
  data: string;
};

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('🚀 ErrorInterceptor:', {
      time: new Date(),
      handler: context.getHandler().name,
      class: context.getClass().name,
    });

    return next.handle().pipe(
      map((data) => {
        const res: TRes = {
          status: 'success',
          data: data,
        };

        return res;
      }),
      catchError((error) => {
        const res: TRes = {
          status: 'fail',
          data: (error as Error).message,
        };

        return throwError(new InternalServerErrorException(res));
      }),
    );
  }
}
