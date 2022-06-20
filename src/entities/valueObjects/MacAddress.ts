import { ValueObject } from "util/valueobject";

interface MacAddressProps {
  macAddress: string;
}
export class MacAddress extends ValueObject<MacAddressProps> {
  getMacAddress(): string {
    return this.props.macAddress;
  }

  private constructor(params: MacAddressProps) {
    super(params);
  }

  getDeviceTypeCode(): string {
    let [x, y, z] = this.props.macAddress.split(":");
    return `${x}:${y}:${z}`;
  }
  static isValidMacAddress(mac: string): boolean {
    if (mac.length != 17) {
      return false;
    }
    let regex = /^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$/i;
    return regex.test(mac);
  }

  static build(mac: string): MacAddress {
    if (MacAddress.isValidMacAddress(mac)) {
      return new MacAddress({ macAddress: mac });
    }
    throw new Error("Invalid Mac Address");
  }
}
