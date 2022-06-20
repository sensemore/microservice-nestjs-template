import { Device } from "entities/domainEntities/device";
import { DeviceType } from "entities/domainEntities/deviceType";
import { Gateway } from "entities/domainEntities/gateway";
import { MacAddress } from "entities/valueObjects/MacAddress";
import {
  IFindDevice,
  IGetDeviceType,
  ISaveDevice,
  ISaveGateway,
} from "./entityGateways";
import { errors } from "./errors";
import { createDevice_Usecase } from "./usecase";

describe("createDevice_Usecase", () => {
  let usecase: createDevice_Usecase;

  beforeEach(async () => {});

  it("OK", async () => {
    //fakes
    let findDevice = new (class implements IFindDevice {
      async execute(macAddress: MacAddress): Promise<Device> {
        return null;
      }
    })();
    let getDeviceType = new (class implements IGetDeviceType {
      async execute(deviceTypeCode: string): Promise<DeviceType> {
        return new DeviceType();
      }
    })();
    let saveDevice = new (class implements ISaveDevice {
      async execute(device: Device): Promise<Device> {
        device.id = "1";
        return device;
      }
    })();
    //arrange
    let insertedDeviceId = "1";
    let macAddress = MacAddress.build("12:12:12:12:12:12");

    //act
    usecase = new createDevice_Usecase(
      findDevice,
      getDeviceType,
      saveDevice,
      null
    );
    let insertedDevice: Device = await usecase.execute(macAddress);

    //assert
    expect(insertedDevice.id).toBe(insertedDeviceId);
  });

  it("DeviceTypeNotFound", async () => {
    //arrange
    let macAddress = MacAddress.build("12:12:12:12:12:12");

    let findDevice = new (class implements IFindDevice {
      async execute(macAddress: MacAddress): Promise<Device> {
        return null;
      }
    })();
    let getDeviceType = new (class implements IGetDeviceType {
      async execute(deviceTypeCode: string): Promise<DeviceType> {
        return null;
      }
    })();
    let saveDevice = new (class implements ISaveDevice {
      async execute(device: Device): Promise<Device> {
        device.id = "1";
        return device;
      }
    })();

    //act
    try {
      usecase = new createDevice_Usecase(
        findDevice,
        getDeviceType,
        saveDevice,
        null
      );
      let insertedDevice: Device = await usecase.execute(macAddress);
    } catch (e) {
      //assert
      expect(e.code).toBe(errors.DeviceTypeNotFound);
    }
  });

  it("OK- gateway", async () => {
    //arrange

    let insertedDeviceId = "1";
    let insertedGWId = "2";
    let macAddress = MacAddress.build("12:12:12:12:12:12");

    let findDevice = new (class implements IFindDevice {
      async execute(macAddress: MacAddress): Promise<Device> {
        return null;
      }
    })();
    let getDeviceType = new (class implements IGetDeviceType {
      async execute(deviceTypeCode: string): Promise<DeviceType> {
        let dt = new DeviceType();
        dt.isGateway = true;
        return dt;
      }
    })();
    let saveDevice = new (class implements ISaveDevice {
      async execute(device: Device): Promise<Device> {
        device.id = insertedDeviceId;
        return device;
      }
    })();
    let saveGateway = new (class implements ISaveGateway {
      async execute(device: Device): Promise<Gateway> {
        let gw = new Gateway();
        gw.id = insertedGWId;
        gw.device = device;
        return gw;
      }
    })();

    //act
    usecase = new createDevice_Usecase(
      findDevice,
      getDeviceType,
      saveDevice,
      saveGateway
    );
    let insertedDevice: Device = await usecase.execute(macAddress);

    //assert
    expect(insertedDevice.id).toBe(insertedDeviceId);
    expect(insertedDevice.gateway.id).toBe(insertedGWId);
  });
  it("DeviceAlreadyExists", async () => {
    //arrange
    let macAddress = MacAddress.build("12:12:12:12:12:12");
    let findDevice = new (class implements IFindDevice {
      async execute(macAddress: MacAddress): Promise<Device> {
        return new Device();
      }
    })();
    let getDeviceType = new (class implements IGetDeviceType {
      async execute(deviceTypeCode: string): Promise<DeviceType> {
        return new DeviceType();
      }
    })();
    let saveDevice = new (class implements ISaveDevice {
      async execute(device: Device): Promise<Device> {
        device.id = "1";
        return device;
      }
    })();

    //act
    try {
      usecase = new createDevice_Usecase(
        findDevice,
        getDeviceType,
        saveDevice,
        null
      );
      let insertedDevice: Device = await usecase.execute(macAddress);
    } catch (e) {
      //assert
      expect(e.code).toBe(errors.DeviceAlreadyExists);
    }
  });
});
