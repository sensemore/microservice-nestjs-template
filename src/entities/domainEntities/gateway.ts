import { MacAddress } from "entities/valueObjects/MacAddress";
import { Device } from "./device";

export class Gateway {
  id: string;
  macAddress: MacAddress;
  device: Device;
  connectionStatus: string;
  connectionStatusUpdatedAt: Date;
  info: Object;
  infoUpdatedAt: Date;
  certificateId: string;
}
