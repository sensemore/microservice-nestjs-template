import { ValueObject } from "util/valueobject";

interface DeviceTypeCodeProps {
  code: string;
}
export class DeviceTypeCode extends ValueObject<DeviceTypeCodeProps> {
  private constructor(props: DeviceTypeCodeProps) {
    super(props);
  }

  public getCode() {
    return this.props.code;
  }

  static build(code: string): DeviceTypeCode {
    if (DeviceTypeCode.isValid(code)) {
      return new DeviceTypeCode({ code: code });
    }
    throw new Error("Invalid Device Type Code");
  }
  static isValid(deviceTypeCode: string) {
    if (deviceTypeCode.length != 8) {
      return false;
    }
    let regex = /^([0-9A-F]{2}[:]){2}([0-9A-F]{2})$/i;
    return regex.test(deviceTypeCode);
  }
}
