/* Generated id = 5397346d-cd5b-4c3a-b7b5-7fc5b1605a15, version:0.0.1 */
import { ApiProperty } from "@nestjs/swagger";
import { Device } from "entities/domainEntities/device";

export class AsdfResponse {
  @ApiProperty()
  id: string;

  constructor(d: Device) {
    this.id = d.id;
  }
}
