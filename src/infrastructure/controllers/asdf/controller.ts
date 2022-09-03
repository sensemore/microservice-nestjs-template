/* Generated id = 5397346d-cd5b-4c3a-b7b5-7fc5b1605a15, version:0.0.1 */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseType } from "../../common/swagger/response.decorator";
import { LoggerService } from "infrastructure/logger/logger.service";
import { AsdfResponse } from "./response";
import { AsdfRequest } from "./request";
import { I18nService } from "nestjs-i18n";
import { asdf_Usecase } from "usecasesasdf/usecase";
import { BusinessError } from "util/business.error";
import { errors } from "usecases/asdf/errors";
import { BaseController } from "infrastructure/common/baseController";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { ConfigService } from "@nestjs/config";

@Controller("asdf")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(AsdfResponse)
export class AsdfController extends BaseController {
  constructor(
    @Inject("USECASE") private readonly usecase: asdf_Usecase,
    readonly loggerService: LoggerService,
    readonly i18nService: I18nService,
    private readonly amqpConnection: AmqpConnection,
    private configService: ConfigService
  ) {
    super(i18nService, loggerService);
  }

  @Gadsg("")
  @ApiResponseType(AsdfResponse, true)
  async asdf(@Body() request: AsdfRequest) {
    try {
      const rp = await this.usecase.execute( );



      return new AsdfResponse(rp);
    } catch (e) {
      if (e instanceof BusinessError) {
        if (e.code == errors.SomeError) {
          throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
      }
      throw e;
    }
  }
}
