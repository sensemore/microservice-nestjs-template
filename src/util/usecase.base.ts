import { BusinessError } from "./business.error";

export class UseCase {
  constructor(private name: string) {}
  MakeError(code) {
    return new BusinessError(this.name, code, code);
  }
}
