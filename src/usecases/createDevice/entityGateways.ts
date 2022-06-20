import { Device } from "entities/domainEntities/device";
import { DeviceType } from "entities/domainEntities/deviceType";
import { Gateway } from "entities/domainEntities/gateway";
import { MacAddress } from "entities/valueObjects/MacAddress";

export interface IGetDeviceType {
  execute(deviceType: string): Promise<DeviceType>;
}

export interface IFindDevice {
  execute(macAddress: MacAddress): Promise<Device>;
}

export interface ISaveDevice {
  execute(device: Device): Promise<Device>;
}

export interface ISaveGateway {
  execute(device: Device): Promise<Gateway>;
}
