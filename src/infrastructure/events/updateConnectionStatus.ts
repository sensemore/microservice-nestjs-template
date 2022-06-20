import { BaseEvent, Payload } from "infrastructure/common/baseEvent";

const EventName = "device.connectionStatusUpdated";

export interface ConnectionStatusUpdated extends Payload {
    macAddress: string;
    connectionStatus: string;
    connectionStatusDate: Date;
}

const Example = {
    macAddress: "12:12:12:12:12:12",
    connectionStatus: "connected",
    connectionStatusDate: new Date()
} as ConnectionStatusUpdated;

export const ConnectionStatusUpdatedEvent = new BaseEvent<ConnectionStatusUpdated>(
    EventName
);
