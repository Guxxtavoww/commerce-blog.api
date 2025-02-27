import {
  Injectable,
  type ExecutionContext,
  type CallHandler,
  type NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ZodValidationException } from 'nestjs-zod';

interface SimplifiedError {
  field: string;
  message: string;
}

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ZodValidationException) {
          const zodError = error.getZodError();

          const simplifiedErrors: SimplifiedError[] = [];

          for (const err of zodError.errors) {
            simplifiedErrors.push({
              field: err.path.join('.'),
              message: err.message,
            });
          }

          return throwError(
            () =>
              new BadRequestException({
                message: 'Validation failed',
                errors: simplifiedErrors,
              }),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
