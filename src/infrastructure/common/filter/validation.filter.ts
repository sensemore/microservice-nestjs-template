import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { LoggerService } from "infrastructure/logger/logger.service";
import { I18nService } from "nestjs-i18n";
import { ValidationException } from "../validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly i18n: I18nService
  ) {}

  async catch(exception: ValidationException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    console.log(exception.validationErrors);
    let mapped = [];
    for (let error of exception.validationErrors) {
      let mapped_error = {
        field: error.property,
        messages: [],
      };
      for (let key in error.constraints) {
        let localized = await this.i18n.translate(error.constraints[key]);
        console.log("localized", localized, " of", error.constraints[key]);
        mapped_error.messages.push({
          code: error.constraints[key],
          message: localized,
        });
      }
      mapped.push(mapped_error);
    }

    console.log(mapped);
    return response.status(400).json({
      statusCode: 400,
      errors: mapped,
    });
  }
}
