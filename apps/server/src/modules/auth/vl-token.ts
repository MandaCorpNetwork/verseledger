import { ApiPermission } from "#/shared/schemas/ApiPermission";

export type VLToken = {
  jti: string;
  id: string;
  exp: number;
  type: "api" | "access" | "refresh";
  roles: ApiPermission[];
};
