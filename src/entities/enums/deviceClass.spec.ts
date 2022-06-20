import { DeviceClass } from "./deviceClass";

describe("macAddress_valueobject", () => {
  beforeEach(async () => {});

  it("throw if invalid", async () => {
    //arrange
    let deviceClassCode = "invalid value";
    //act
    try {
      DeviceClass.parseOrThrow(deviceClassCode);
    } catch (error) {
      expect(error.message).toBe("Invalid device class");
    }
  });

  it("Success", async () => {
    //arrange
    let deviceClassCode = "A";
    //act
    let deviceClass_vo = DeviceClass.parseOrThrow(deviceClassCode);
    //assert
    expect(deviceClass_vo.getValue()).toBe(deviceClassCode);
  });
});
