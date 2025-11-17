import { ApiToken } from "../entities/api_token.entity";

declare global {
  declare namespace Express {
    interface Request {
      token?: ApiToken;
    }
  }
}
