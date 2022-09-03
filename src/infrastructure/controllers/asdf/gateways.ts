/* Generated id = 5397346d-cd5b-4c3a-b7b5-7fc5b1605a15, version:0.0.1 */
import { Types } from "mongoose";
import { Injectable, Module } from "@nestjs/common";
import { Device } from "entities/domainEntities/device";
import { DatabaseAccess } from "infrastructure/database/DatabaseAccess";
import {
  IAsdf,
} from "usecases/asdf/entityGateways";
import { MongoDbModule } from "infrastructure/database/mongodb.module";


@Injectable()
export class Asdf_gateway extends DatabaseAccess implements IAsdf {
  async execute(): Promise<Device> {
    /* dbModel = new this.deviceDatabaseModel({
      macAddress: device.macAddress.getMacAddress(),
      deviceType: new Types.ObjectId(device.deviceType.id),
      createdAt: new Date(),
      broken: false,
    });
    let result = await dbModel.save();
    device.id = result._id.toString();
    
    return device;
    */
    return null
  }
}

const prov_exports = [
Asdf_gateway,
];
MongoDbModule;
@Module({
  imports: [],
  providers: prov_exports,
  exports: prov_exports,
})
export class GatewayModule {}
