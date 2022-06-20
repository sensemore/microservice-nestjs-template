import { Module } from "@nestjs/common";
import { GlobalModules } from "infrastructure/global.modules";
import { RabbitConfigurationModule } from "infrastructure/rabbitmq/module";
import { DeviceStatsUpdateHandlerModule } from "infrastructure/eventHandlers/deviceStatsUpdateHandler/module";

@Module({
  imports: [
    GlobalModules,
    RabbitConfigurationModule,
    DeviceStatsUpdateHandlerModule,
  ],
  providers: [],
  exports: [],
})
export class AMQPModule {}
