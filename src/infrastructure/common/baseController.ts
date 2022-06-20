import { HttpException, HttpStatus } from "@nestjs/common";
import { LoggerService } from "infrastructure/logger/logger.service";
import { I18nService } from "nestjs-i18n";
import { BusinessError } from "util/business.error";

export class BaseController {
  constructor(
    protected readonly i18nService: I18nService,
    protected readonly loggerService: LoggerService
  ) {}

  protected throwBusinessError(status: HttpStatus, error: BusinessError): any {
    throw new HttpException(error, status);
  }
}
