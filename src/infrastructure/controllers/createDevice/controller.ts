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
import { CreateDeviceResponse } from "./response";
import { CreateDeviceRequest } from "./request";
import { I18nService } from "nestjs-i18n";
import { createDevice_Usecase } from "usecases/createDevice/usecase";
import { MacAddress } from "entities/valueObjects/MacAddress";
import { BusinessError } from "util/business.error";
import { errors } from "usecases/createDevice/errors";
import { BaseController } from "infrastructure/common/baseController";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import {
  DeviceCreated,
  DeviceCreatedEvent,
} from "infrastructure/events/deviceCreated";
import { ConfigService } from "@nestjs/config";

@Controller("device")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(CreateDeviceResponse)
export class CreateDeviceController extends BaseController {
  constructor(
    @Inject("USECASE") private readonly usecase: createDevice_Usecase,
    readonly loggerService: LoggerService,
    readonly i18nService: I18nService,
    private readonly amqpConnection: AmqpConnection,
    private configService: ConfigService
  ) {
    super(i18nService, loggerService);
    console.log(configService.get<String>("MONGODB_URI"));
  }

  @Post("")
  @ApiResponseType(CreateDeviceResponse, true)
  async addTodo(@Body() request: CreateDeviceRequest) {
    try {
      const device = await this.usecase.execute(
        MacAddress.build(request.macAddress)
      );

      let payload = {
        macAddress: device.macAddress.getMacAddress(),
        version: device.version,
      } as DeviceCreated;

      DeviceCreatedEvent.publish(this.amqpConnection, payload);

      return new CreateDeviceResponse(device);
    } catch (e) {
      if (e instanceof BusinessError) {
        if (e.code == errors.DeviceAlreadyExists) {
          throw new HttpException(e, HttpStatus.CONFLICT);
        }
        if (e.code == errors.DeviceTypeNotFound) {
          throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
      }
      throw e;
    }
  }
}
