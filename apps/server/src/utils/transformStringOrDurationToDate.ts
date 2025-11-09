import { TransformFnParams } from "class-transformer";
import ms, { StringValue } from "ms";

export const transformStringOrDurattionToDate = (params: TransformFnParams) => {
  const existing = params.obj[params.key] as StringValue | Date;
  if (existing instanceof Date) return existing;
  if (typeof existing === "string") {
    const asDate = new Date(existing);
    if (!Number.isNaN(+asDate)) {
      return asDate;
    }
  }
  return new Date(Date.now() + ms(existing));
};
