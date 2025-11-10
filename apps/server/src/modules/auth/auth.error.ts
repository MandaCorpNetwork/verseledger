import { BaseError } from "#/utils/base.error";

export class MissingLoginMethodError extends BaseError {
  constructor(method: string) {
    super("LOGIN_METHOD_MISSING", method);
  }
}

export class InvaliTokenPropsError extends BaseError {
  constructor() {
    super("INVALID_TOKEN_PROPS");
  }
}
