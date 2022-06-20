import { DeviceClass } from "entities/enums/deviceClass";
import { DeviceTypeCode } from "entities/valueObjects/DeviceTypeCode";

export class DeviceType {
  id: string;
  code: DeviceTypeCode;
  sensors: Object[];
  vendor: string;
  class: DeviceClass;
  isGateway: boolean;
}
