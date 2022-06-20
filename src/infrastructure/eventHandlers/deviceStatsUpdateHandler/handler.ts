import {
  RabbitSubscribe,
  Nack,
  AmqpConnection,
} from "@golevelup/nestjs-rabbitmq";
import { Inject, Injectable } from "@nestjs/common";
import { MacAddress } from "entities/valueObjects/MacAddress";
import { DeviceStatsUpdatedEvent } from "infrastructure/events/deviceStatsUpdated";
import { updateDeviceStats_usecase } from "usecases/updateDeviceStats/usecase";
import { ConsumeMessage } from "amqplib";
import { BusinessError } from "util/business.error";
import { errors } from "usecases/updateDeviceStats/errors";
@Injectable()
export class DeviceStatsUpdatedEventHandler {
  /**
   *
   */
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject("USECASE") private usecase: updateDeviceStats_usecase
  ) {}
  @RabbitSubscribe({
    exchange: DeviceStatsUpdatedEvent.getEventName(),
    routingKey: "",
    queue: "DeviceStatsUpdatedEventHandler",
    allowNonJsonMessages: false,
    queueOptions: {
      durable: true,
    },
    errorHandler: (channel, msg, err) => {
      console.log(err);
      // channel.nack(msg,true,false);
    },
  })
  public async competingPubSubHandler(msg: {}, amqpMsg: ConsumeMessage) {
    let payload = DeviceStatsUpdatedEvent.parseMessage(
      amqpMsg.content.toString()
    );
    let macAddress = MacAddress.build(payload.macAddress);
    try {
      await this.usecase.execute(macAddress, payload.version, payload.stats);
    } catch (e) {
      if (e instanceof BusinessError) {
        if (e.code == errors.DeviceNotFound) {
          //what to do ??
          console.log("todo handle rabbit event error");
        }
      }
      //throw e;
    }
    console.log(" [x] Event  Handled consumer:DeviceStatsUpdatedEventHandler");
    return;
  }
}

// @RabbitSubscribe({
//     exchange: 'exchange1',
//     routingKey: 'subscribe-route2',
// })
// public async messagePerInstanceHandler(msg: {}) {
//     console.log(`Received message: ${JSON.stringify(msg)}`);
// }
