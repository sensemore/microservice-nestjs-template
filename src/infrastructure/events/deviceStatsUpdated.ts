import { Connection, Message } from "amqp-ts";
import { BaseEvent, Payload } from "infrastructure/common/baseEvent";

const EventName = "device.statsUpdated";

export interface DeviceStatsUpdated extends Payload {
  macAddress: string;
  version: string;
  stats: any;
}

const Example = {
  macAddress: "00:00:00:00:00:00",
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
  },
} as DeviceStatsUpdated;

export const DeviceStatsUpdatedEvent = new BaseEvent<DeviceStatsUpdated>(
  EventName
);
