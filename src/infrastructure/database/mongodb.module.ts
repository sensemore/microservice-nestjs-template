import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { DeviceModel, DeviceSchema } from "./schemas/device.schema";
import { DeviceTypeModel, DeviceTypeSchema } from "./schemas/deviceType.schema";

//bubbles
//I am not sure if this is the best way

const importExports = [
  MongooseModule.forFeature([
    { name: DeviceModel.name, schema: DeviceSchema, collection: "devices" },
    { name: DeviceTypeModel.name, schema: DeviceTypeSchema, collection: "deviceTypes" },
  ]),
];
@Global()
@Module({
  imports: [
    ...importExports,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        let uri = config.get<string>("MONGODB_URI");
        // console.log(uri);
        return {
          uri: uri, // Loaded from .ENV
        };
    }
    }),
  ],
  exports: [...importExports],
})
export class MongoDbModule { }
