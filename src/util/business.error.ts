export class BusinessError extends Error {
  constructor(public usecase, public code: string, message: string) {
    super(message);
  }
}
