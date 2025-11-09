import { VLToken } from "#/modules/auth/vl-token";

declare global {
  declare namespace Express {
    interface Request {
      token?: VLToken;
    }
  }
}
