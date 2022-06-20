import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ValidationError } from "class-validator";
import { I18nService } from "nestjs-i18n";
import { BusinessError } from "util/business.error";
import { LoggerService } from "../../logger/logger.service";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor (
    private readonly logger: LoggerService,
    private readonly i18n: I18nService
  ) { }
  async catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let return_response = {};
    console.log(exception);
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (response instanceof BusinessError) {
        let localizedMessage = await this.i18n.translate(response.code);

        return_response = {
          statusCode: status,
          message: localizedMessage,
          usecase: response.usecase,
          code: response.code,
        };
      }
    }

    if (process.env.NODE_ENV === "local") {
      return_response["stack"] = exception.stack;
    }

    return response.status(status).json(return_response);
  }

  private logMessage(
    request: any,
    message: string,
    status: number,
    exception: any
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status}  message=${message}`,
        status >= 500 ? exception.stack : ""
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status}  message=${message}`
      );
    }
  }
}
