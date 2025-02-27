import {
  Injectable,
  BadRequestException,
  type ExecutionContext,
  type CallHandler,
  type NestInterceptor,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ZodError) {
          const simplifiedErrors = error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          }));

          return throwError(
            () =>
              new BadRequestException({
                statusCode: 400,
                message: 'Validation failed',
                errors: simplifiedErrors,
              }),
          );
        }
        // Pass through other errors unchanged
        return throwError(() => error);
      }),
    );
  }
}
