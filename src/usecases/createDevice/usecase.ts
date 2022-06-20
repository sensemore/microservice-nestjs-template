import { Device } from "entities/domainEntities/device";
import { MacAddress } from "entities/valueObjects/MacAddress";
import { UseCase } from "util/usecase.base";
import {
  IFindDevice,
  IGetDeviceType,
  ISaveDevice,
  ISaveGateway,
} from "./entityGateways";
import { errors } from "./errors";

export class createDevice_Usecase extends UseCase {
  constructor(
    private readonly findDevice: IFindDevice,
    private readonly getDeviceType: IGetDeviceType,
    private readonly saveDevice: ISaveDevice,
    private readonly saveGateway: ISaveGateway
  ) {
    super("createDevice");
  }

  async execute(macAddress: MacAddress): Promise<Device> {
    const deviceType = await this.getDeviceType.execute(
      macAddress.getDeviceTypeCode()
    );
    if (!deviceType) {
      throw this.MakeError(errors.DeviceTypeNotFound);
    }

    const existDevice = await this.findDevice.execute(macAddress);
    if (existDevice) {
      throw this.MakeError(errors.DeviceAlreadyExists);
    }

    let device = {
      macAddress: macAddress,
      deviceType: deviceType,
    } as Device;

    device = await this.saveDevice.execute(device);
    
    if (deviceType.isGateway) {
      let gw = await this.saveGateway.execute(device);
      
      device.gateway = gw;
    }
    
    return device;
  }
}
