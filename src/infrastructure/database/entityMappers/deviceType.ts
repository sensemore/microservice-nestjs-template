import { DeviceType } from "entities/domainEntities/deviceType";
import { DeviceClass } from "entities/enums/deviceClass";
import { DeviceTypeCode } from "entities/valueObjects/DeviceTypeCode";
import { DeviceTypeDocument } from "../schemas/deviceType.schema";

export const deviceTypeMapper = (deviceTypeDocument: DeviceTypeDocument): DeviceType => {
    const deviceType = {
        id: deviceTypeDocument._id.toString(),
        code: DeviceTypeCode.build(deviceTypeDocument.code),
        sensors: deviceTypeDocument.sensors,
        vendor: deviceTypeDocument.vendor,
        class: DeviceClass.parseOrThrow(deviceTypeDocument.class),
        isGateway: deviceTypeDocument.isGateway
    } as DeviceType

    return deviceType
}
