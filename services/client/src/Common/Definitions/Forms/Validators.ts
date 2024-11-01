import { LocationSchema } from 'vl-shared/src/schemas/LocationSchema';
import { TaskSchema } from 'vl-shared/src/schemas/RoutesSchema';

export function locationValidation(value: unknown): boolean {
  const locationValidationResult = LocationSchema.safeParse(value);
  return locationValidationResult.success;
}

export function taskValidation(value: unknown): boolean {
  const taskValidationResult = TaskSchema.safeParse(value);
  return taskValidationResult.success;
}
