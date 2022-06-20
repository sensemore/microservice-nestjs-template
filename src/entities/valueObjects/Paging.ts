export class Paging {
  private constructor(public page: number, public pageSize: number) {}

  static build(page: number, pageSize: number): Paging {
    if (Paging.isValid(page, pageSize)) {
      return new Paging(page, pageSize);
    }
    throw new Error("Invalid Paging");
  }
  static isValid(page: number, pageSize: number): boolean {
    if (page < 0) {
      return false;
    }
    if (pageSize < 0) {
      return false;
    }
    return true;
  }
}
