import { InjectModel } from "@nestjs/mongoose";
import { DeviceModel, DeviceDocument } from "infrastructure/database/schemas";
import { model, Model } from "mongoose";


//I'll inherit entitygateways that access todo model from this
export abstract class DatabaseAccess {
  constructor(
 
    @InjectModel(DeviceModel.name)
    protected deviceDatabaseModel: Model<DeviceDocument>,

  
  ) {}
}
