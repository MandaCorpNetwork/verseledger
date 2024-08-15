import { IdPrefix, IdUtil } from '@/utils/IdUtil';
import { Identifier } from './Identifier';

export class UniqueEntityId extends Identifier {
  constructor(id?: IdPrefix | string) {
    super(
      id == null
        ? IdUtil.generateSystemID()
        : IdUtil.isValidId(id)
          ? id
          : IdUtil.generateId(id as IdPrefix),
    );
  }
}
