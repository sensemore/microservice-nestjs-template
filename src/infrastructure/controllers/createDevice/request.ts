import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsMACAddress,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class UpdateTodoDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isDone: boolean;
}

export class CreateDeviceRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "validation.shouldnotbeempty" })
  @IsMACAddress({ message: "validation.invalidMacAddress" })
  @IsString({ message: "validation.shouldbestring" })
  readonly macAddress: string;
}
