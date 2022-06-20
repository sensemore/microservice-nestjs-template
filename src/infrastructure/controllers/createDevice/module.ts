import { Module } from "@nestjs/common";
import { createDevice_Usecase } from "usecases/createDevice/usecase";
import { CreateDeviceController } from "./controller";
import {
  FindDevice_gateway,
  GatewayModule,
  GetDeviceType_gateway,
  SaveDevice_gateway,
  SaveGateway_gateway,
} from "./gateways";

//Unfortunatelly typescript loses the information about the interface at the runtime.
//thus nestjs cant resolve dependency for an interface
//so we need to use a factory to resolve dependencies of usecase
const usecase = {
  provide: "USECASE",
  useFactory: (
    findDevice: FindDevice_gateway,
    getDeviceType: GetDeviceType_gateway,
    saveDevice: SaveDevice_gateway,
    saveGateway: SaveGateway_gateway
  ) => {
    return new createDevice_Usecase(
      findDevice,
      getDeviceType,
      saveDevice,
      saveGateway
    );
  },
  inject: [
    FindDevice_gateway,
    GetDeviceType_gateway,
    SaveDevice_gateway,
    SaveDevice_gateway,
  ],
};

@Module({
  imports: [GatewayModule],
  providers: [usecase],
  controllers: [CreateDeviceController],
})
export class CreateDeviceModule {}
