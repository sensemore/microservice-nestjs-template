import { Device } from "entities/domainEntities/device"
import { MacAddress } from "entities/valueObjects/MacAddress"
import { DeviceDocument, DeviceTypeDocument } from "../schemas"
import { deviceTypeMapper } from "./deviceType"

export const deviceMapper = (deviceDocument: DeviceDocument): Device => {
    const device = {
        id: deviceDocument._id.toString(),
        macAddress: MacAddress.build(deviceDocument.macAddress),
        version: deviceDocument.version,
        deviceType: deviceTypeMapper(deviceDocument.deviceType as DeviceTypeDocument),
        createdDate: deviceDocument.createdDate,
        updatedDate: deviceDocument.updatedDate,
        boken: deviceDocument.broken,
    } as Device

    return device
}
