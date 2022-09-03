/* Generated id = 5397346d-cd5b-4c3a-b7b5-7fc5b1605a15, version:0.0.1 */
import { Module } from "@nestjs/common";
import { asdf_Usecase } from "usecases/asdf/usecase";
import { AsdfController } from "./controller";
import {
  Asdf_gateway,
  GatewayModule,
} from "./gateways";

//Unfortunatelly typescript loses types of interfaces at the runtime.
//thus nestjs cant resolve dependency for an interface
//so we need to use a factory to resolve dependencies of usecase
const usecase = {
  provide: "USECASE",
  useFactory: (
    asdf: Asdf_gateway,
  ) => {
    return new asdf_Usecase(
      asdf
          );
  },
  inject: [
  Asdf_gateway,
  ],
};

@Module({
  imports: [GatewayModule],
  providers: [usecase],
  controllers: [AsdfController],
})
export class Asdf_Module {}
