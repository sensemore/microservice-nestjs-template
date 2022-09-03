/* Generated id = 5397346d-cd5b-4c3a-b7b5-7fc5b1605a15, version:0.0.1 */
import { UseCase } from "util/usecase.base";
import { Device } from "entities/domainEntities/device";
import {
  IAsdf,
} from "./entityGateways";
import { errors } from "./errors";

export class asdf_Usecase extends UseCase {
  constructor(
    private readonly asdf:IAsdf
  ) {
    super("asdf");
  }

  async execute(): Promise<Device> {
    
    
    return null;
  }
}
