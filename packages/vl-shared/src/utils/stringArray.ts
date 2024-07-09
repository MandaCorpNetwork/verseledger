import { z, ZodTypeAny } from "zod";

export const stringArray = <T extends ZodTypeAny>(type: T) => {
  return z
    .string()
    .transform((v) => v.split(","))
    .pipe(type.array());
};
