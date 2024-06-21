import { z } from 'zod';

export const ZodToOpenapi = (schema: z.AnyZodObject) => {
  const shape = schema.shape as {
    [key: string]: {
      _type: string;
      isOptional(): boolean;
      description: string;
    };
  };
  const newObj: {
    [key: string]: { required: boolean; type: string; description: string };
  } = {};
  Object.keys(shape).forEach((k) => {
    const ob = shape[k];
    newObj[k] = {
      required: !ob.isOptional(),
      type: ob._type,
      description: ob.description,
    };
  });
  return newObj;
};
