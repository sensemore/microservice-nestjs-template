import { MacAddress } from "entities/valueObjects/MacAddress";
import { DeviceType } from "./deviceType";
import { Gateway } from "./gateway";

export class Device {
  constructor() {}

  id: string;
  macAddress: MacAddress;
  version: string;
  deviceType: DeviceType;
  createdDate: Date;
  updatedDate: Date;
  boken: boolean;
  gateway: Gateway;
}
