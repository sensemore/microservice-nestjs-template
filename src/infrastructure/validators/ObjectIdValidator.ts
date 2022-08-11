import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { isValidObjectId } from "mongoose";

@ValidatorConstraint({ name: "ObjectId", async: false })
export class ObjectIdValidator implements ValidatorConstraintInterface {
    validate(val: string, args: ValidationArguments) {
        return isValidObjectId(val); // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return "validation.InvalidObjectId";
    }
}