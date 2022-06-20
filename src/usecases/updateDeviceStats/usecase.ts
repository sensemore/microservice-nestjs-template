import { Device } from "entities/domainEntities/device";
import { MacAddress } from "entities/valueObjects/MacAddress";
import { UseCase } from "util/usecase.base";
import { IGetDevice, IUpdateDevice } from "./entityGateways";
import { errors } from "./errors";

export class updateDeviceStats_usecase extends UseCase {
  constructor(
    private readonly getDevice: IGetDevice,
    private readonly updateDevice: IUpdateDevice
  ) {
    super("createDevice");
  }

  async execute(macAddress: MacAddress, version: string, stats: any) {
    const existDevice = await this.getDevice.execute(macAddress);
    if (!existDevice) {
      throw this.MakeError(errors.DeviceNotFound);
    }

    await this.updateDevice.execute(macAddress, version, stats);

    return;
  }
}
