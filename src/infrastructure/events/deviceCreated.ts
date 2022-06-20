import { Connection, Message } from "amqp-ts";
import { BaseEvent, Payload } from "infrastructure/common/baseEvent";

const EventName = "device.created";

export interface DeviceCreated extends Payload {
  macAddress: string;
  version: string;
}

const Example = {
  macAddress: "00:00:00:00:00:00",
  version: "1.0.0",
} as DeviceCreated;

export const DeviceCreatedEvent = new BaseEvent<DeviceCreated>(EventName);
