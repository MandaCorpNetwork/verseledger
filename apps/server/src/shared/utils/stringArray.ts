import { z, type ZodTypeAny } from "zod";

export const stringArray = <T extends ZodTypeAny>(type: T) => {
  return (
    z
      .string()
      .transform((v) => v.split(","))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .pipe(type.array() as any)
  );
};
