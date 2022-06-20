import { forwardRef, Module } from "@nestjs/common";
import { updateDeviceStats_usecase } from "usecases/updateDeviceStats/usecase";
import {
  GatewayModule,
  GetDevice_gateway,
  UpdateDevice_gateway,
} from "./gateways";
import { DeviceStatsUpdatedEventHandler } from "./handler";

//Unfortunatelly typescrpt lose the information about interface at the runtime.
//thus nestjs cant resolve dependency for an interface
//so we need to use a factory to resolve dependencies of usecase, 
const usecase = {
  provide: "USECASE",
  useFactory: (
    getDevice: GetDevice_gateway,
    updateDevice: UpdateDevice_gateway
  ) => {
    return new updateDeviceStats_usecase(getDevice, updateDevice);
  },
  inject: [GetDevice_gateway, UpdateDevice_gateway],
};

@Module({
  imports: [GatewayModule],
  providers: [DeviceStatsUpdatedEventHandler, usecase],
  controllers: [],
})
export class DeviceStatsUpdateHandlerModule {}
