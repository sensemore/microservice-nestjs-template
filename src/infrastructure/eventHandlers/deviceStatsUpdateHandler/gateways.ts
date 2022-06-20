import { Injectable, Module } from "@nestjs/common";
import { Device } from "entities/domainEntities/device";
import { MacAddress } from "entities/valueObjects/MacAddress";
import { DatabaseAccess } from "infrastructure/database/DatabaseAccess";
import { MongoDbModule } from "infrastructure/database/mongodb.module";
import {
  IGetDevice,
  IUpdateDevice,
} from "usecases/updateDeviceStats/entityGateways";

@Injectable()
export class UpdateDevice_gateway
  extends DatabaseAccess
  implements IUpdateDevice {
  execute(
    macAddress: MacAddress,
    version: string,
    stats: any
  ): Promise<Device> {

    return null;
  }
}

@Injectable()
export class GetDevice_gateway extends DatabaseAccess implements IGetDevice {
  execute(macAddress: MacAddress): Promise<Device> {
    return null;
  }
}

const prov_exports = [UpdateDevice_gateway, GetDevice_gateway];

@Module({
  imports: [MongoDbModule],
  providers: prov_exports,
  exports: prov_exports,
})
export class GatewayModule { }
