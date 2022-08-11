import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { DeviceTypeModel } from "./deviceType.schema";
export type DeviceDocument = DeviceModel & Document;

@Schema()
export class DeviceModel {
  //If you have a better naming shoot it.

  @Prop()
  macAddress: string;
  @Prop()
  version: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: "deviceTypes" })
  deviceType: DeviceTypeModel;
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
