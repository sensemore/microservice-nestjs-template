import { Device } from "entities/domainEntities/device";
import { DeviceType } from "entities/domainEntities/deviceType";
import { Gateway } from "entities/domainEntities/gateway";
import { MacAddress } from "entities/valueObjects/MacAddress";

export interface IGetDevice {
  execute(macAddress: MacAddress): Promise<Device>;
}

export interface IUpdateDevice {
  execute(macAddress: MacAddress, version: string, stats: any): Promise<Device>;
}
