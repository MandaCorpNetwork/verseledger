import { BaseError } from "#/utils/base.error";

export class MissingLoginMethod extends BaseError {
  constructor(method: string) {
    super("LOGIN_METHOD_MISSING", method);
  }
}
