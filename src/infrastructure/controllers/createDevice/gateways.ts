import { Types } from "mongoose";
import { Injectable, Module } from "@nestjs/common";
import { Device } from "entities/domainEntities/device";
import { DeviceType } from "entities/domainEntities/deviceType";
import { Gateway } from "entities/domainEntities/gateway";
import { DeviceClass } from "entities/enums/deviceClass";
import { DeviceTypeCode } from "entities/valueObjects/DeviceTypeCode";
import { MacAddress } from "entities/valueObjects/MacAddress";
import { DatabaseAccess } from "infrastructure/database/DatabaseAccess";
import {
  ISaveDevice,
  IFindDevice,
  IGetDeviceType,
  ISaveGateway,
} from "usecases/createDevice/entityGateways";
import { MongoDbModule } from "infrastructure/database/mongodb.module";

@Injectable()
export class SaveDevice_gateway extends DatabaseAccess implements ISaveDevice {
  async execute(device: Device): Promise<Device> {
    let dbModel = new this.deviceDatabaseModel({
      macAddress: device.macAddress.getMacAddress(),
      deviceType: new Types.ObjectId(device.deviceType.id),
      createdAt: new Date(),
      broken: false,
    });
    let result = await dbModel.save();
    device.id = result._id.toString();
    return device;
  }
}
@Injectable()
export class SaveGateway_gateway
  extends DatabaseAccess
  implements ISaveGateway
{
  async execute(device: Device): Promise<Gateway> {
    // let model = new this.gatewayDatabaseModel({
    //   device: new Types.ObjectId(device.id),
    //   macAddress: device.macAddress.getMacAddress(),
    // });

    // let result = await model.save();
    
    // let gw = new Gateway();
    // gw.device = device;
    // gw.id = result._id.toString();
    return null;
  }
}

@Injectable()
export class GetDeviceType_gateway
  extends DatabaseAccess
  implements IGetDeviceType
{
  async execute(deviceType: string): Promise<DeviceType> {
    // let result = await this.deviceTypeDatabaseModel.findOne({
    //   code: deviceType,
    // });
    // if (!result) {
    //   return null;
    // }
    // let dt = new DeviceType();
    // dt.code = DeviceTypeCode.build(result.code);
    // dt.isGateway = result.isGateway;
    // dt.class = DeviceClass.parseOrThrow(result.class);
    // dt.id = result._id.toString();

    return null;
  }
}

@Injectable()
export class FindDevice_gateway extends DatabaseAccess implements IFindDevice {
  async execute(d: MacAddress): Promise<Device> {
    let result = await this.deviceDatabaseModel.findOne({macAddress: d.getMacAddress()});

    if (!result) {
      return null;
    }

    let device = new Device();
    device.id = result._id.toString();
    return device;
  }
}

const prov_exports = [
  SaveDevice_gateway,
  SaveGateway_gateway,
  FindDevice_gateway,
  GetDeviceType_gateway,
];
MongoDbModule;
@Module({
  imports: [],
  providers: prov_exports,
  exports: prov_exports,
})
export class GatewayModule {}
