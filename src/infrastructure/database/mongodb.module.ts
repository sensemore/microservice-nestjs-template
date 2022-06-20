import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { DeviceModel, DeviceSchema} from "./schemas/device.schema";

//bubbles
//I am not sure if this is the best way

const importExports = [
  MongooseModule.forFeature([
    { name: DeviceModel.name, schema: DeviceSchema, collection: "devices" },
  ]),
];
@Global()
@Module({
  imports: [
    ...importExports,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>("MONGODB_URI"), // Loaded from .ENV
      }),
    }),
  ],
  exports: [...importExports],
})
export class MongoDbModule {}
