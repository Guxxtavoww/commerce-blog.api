import {
  Logger,
  Injectable,
  type ExecutionContext,
  type CallHandler,
  type NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import type { Response, Request } from 'express';

import { IS_DEV_ENV } from 'src/config/env.config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  private calculateExecutionTime(time: number): number {
    return Date.now() - time;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    this.logger.log(`Incoming Request - Method: ${method} | URL: ${url}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const executionTime = this.calculateExecutionTime(now);
          const statusCode = response.statusCode.toString();

          this.logger.log(
            `Request Completed - Method: ${method} | URL: ${url} | Status: ${statusCode} | Time: ${executionTime}ms`,
          );
        },
        error: (error) => {
          const executionTime = this.calculateExecutionTime(now);
          const statusCode = error.status || 500;

          this.logger.error(
            `Request Failed - Method: ${method} | URL: ${url} | Status: ${statusCode} | Time: ${executionTime}ms | Error: ${error.message}`,
            IS_DEV_ENV ? error.stack : undefined,
          );
        },
      }),
    );
  }
}
