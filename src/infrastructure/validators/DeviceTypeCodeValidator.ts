import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { DeviceTypeCode } from "entities/valueObjects/DeviceTypeCode";

@ValidatorConstraint({ name: "deviceTypeCode", async: false })
export class DeviceTypeCodeValidator implements ValidatorConstraintInterface {
  validate(val: string, args: ValidationArguments) {
    return DeviceTypeCode.isValid(val); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "validation.invalidaDeviceTypeCode";
  }
}
