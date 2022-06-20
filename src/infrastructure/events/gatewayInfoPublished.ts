import { Connection, Message } from "amqp-ts";
import { BaseEvent, Payload } from "infrastructure/common/baseEvent";

const EventName = "gateway.infoPublished";

export interface GatewayInfoPublished extends Payload {
  macAddress: string;
  info: object;
}

const Example = {
  macAddress: "00:00:00:00:00:00",
  info: {
    version: "1.0.0",
    stats: {
      cpu: {
        usage: {
          user: 0,
          system: 0,
          idle: 0,
          nice: 0,
        },
      },
    }
  }
} as GatewayInfoPublished;

export const GatewayInfoPublishedEvent = new BaseEvent<GatewayInfoPublished>(
  EventName
);
