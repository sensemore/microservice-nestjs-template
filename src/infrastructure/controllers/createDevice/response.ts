import { ApiProperty } from "@nestjs/swagger";
import { Device } from "entities/domainEntities/device";

export class CreateDeviceResponse {
  @ApiProperty()
  id: string;

  constructor(d: Device) {
    this.id = d.id;
  }
}
