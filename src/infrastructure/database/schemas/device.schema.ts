import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
export type DeviceDocument = DeviceModel & Document;

@Schema()
export class DeviceModel {
  //If you have a better naming shoot it.

  @Prop()
  macAddress: string;
  @Prop()
  version: string;
  @Prop()
  deviceType: Types.ObjectId;
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;
  @Prop()
  broken: boolean;
  @Prop()
  isGateway: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceModel);
