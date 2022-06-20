import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { DeviceClass } from "entities/enums/deviceClass";

@ValidatorConstraint({ name: "deviceTypeCode", async: false })
export class DeviceClassValidator implements ValidatorConstraintInterface {
  validate(val: string, args: ValidationArguments) {
    return DeviceClass.isValid(val); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "validation.InvalidDeviceTypeCode";
  }
}
