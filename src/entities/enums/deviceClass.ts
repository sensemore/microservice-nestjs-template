export class DeviceClass {
  private constructor(private value: string) {}
  static A = new DeviceClass("A");
  static B = new DeviceClass("B");
  static C = new DeviceClass("C");

  getValue(): string {
    return this.value;
  }

  static isValid(code: string): boolean {
    if (code === DeviceClass.A.value) {
      return true;
    }
    if (code === DeviceClass.B.value) {
      return true;
    }
    if (code === DeviceClass.C.value) {
      return true;
    }
    return false;
  }

  static parseOrThrow(code: string): DeviceClass {
    if (DeviceClass.isValid(code)) {
      return new DeviceClass(code);
    }
    throw new Error("Invalid device class");
  }
}
