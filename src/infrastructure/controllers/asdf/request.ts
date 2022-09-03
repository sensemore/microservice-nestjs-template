/* Generated id = 5397346d-cd5b-4c3a-b7b5-7fc5b1605a15, version:0.0.1 */
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";



export class AsdfRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "validation.shouldnotbeempty" })
  readonly value: string;
}
