import { ErrorTypes } from "./errors";

export class ErrorHandler extends Error {
  public readonly type;
  constructor(message: string, type: ErrorTypes) {
    super(message);
    this.type = type;
  }
}
