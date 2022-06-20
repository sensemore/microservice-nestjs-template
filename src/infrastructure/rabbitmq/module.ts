import { RabbitMQConfig, RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Global, Module } from "@nestjs/common";
import { DeviceCreatedEvent } from "infrastructure/events/deviceCreated";
import { DeviceStatsUpdatedEvent } from "infrastructure/events/deviceStatsUpdated";
import { ConfigService } from "@nestjs/config";
@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>("RABBITMQ_URI"),
          enableControllerDiscovery: true,
          exchanges: [
            {
              name: DeviceStatsUpdatedEvent.getEventName(),
              type: "fanout",
            },
            {
              name: DeviceCreatedEvent.getEventName(),
              type: "fanout",
            },
          ],
          registerHandlers: true,
        } as RabbitMQConfig;
      },
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitConfigurationModule {}
