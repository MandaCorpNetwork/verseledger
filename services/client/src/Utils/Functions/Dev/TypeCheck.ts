import { schemaMap } from '@Common/Definitions/Dev/SchemaMap';
import { Logger } from '@Utils/Logger';

type TypeName = keyof typeof schemaMap;

export function checkType<T>(typeName: TypeName, item: unknown): item is T {
  const schema = schemaMap[typeName];

  if (!schema) {
    Logger.error(`No schema found for type: ${typeName}`);
  }

  const result = schema.safeParse(item);

  return result.success;
}
