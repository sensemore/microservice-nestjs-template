import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { MyConfigModule } from "infrastructure/common/config/module";
import { AllExceptionFilter } from "infrastructure/common/filter/exception.filter";
import { ValidationFilter } from "infrastructure/common/filter/validation.filter";
import { GlobalModules } from "infrastructure/global.modules";
import { CreateDeviceModule } from "infrastructure/controllers/createDevice/module";
import { MongoDbModule } from "infrastructure/database/mongodb.module";
import { RabbitConfigurationModule } from "infrastructure/rabbitmq/module";
import  * as controllers from "infrastructure/controllers";


@Module({
  imports: [
    GlobalModules,
    MongoDbModule,
    RabbitConfigurationModule,
    ...Object.values(controllers)
  ],
  providers: [AllExceptionFilter, ValidationFilter],
  exports: [],
})
export class RestModule { }
