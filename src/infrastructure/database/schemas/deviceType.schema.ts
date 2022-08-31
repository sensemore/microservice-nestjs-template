import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DeviceTypeDocument = DeviceTypeModel & Document;

@Schema()
export class DeviceTypeModel {
    @Prop()
    sensors: string[];

    @Prop()
    vendor: string;

    @Prop()
    code: string;

    @Prop()
    class: string;

    @Prop()
    isGateway: boolean;
}

export const DeviceTypeSchema = SchemaFactory.createForClass(DeviceTypeModel);
