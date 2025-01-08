import { TYPES } from '@Constant/types';
import {
  BaseHttpController,
  controller,
  httpGet,
} from 'inversify-express-utils';
import { FeatureFlag } from './feature_flag.model';
import { FeatureFlagArrayToFeatureFlagDTOArray } from './mapping/FeatureFlagArrayToFeatureFlagDTOArray.mapper';

@controller('/v1/features')
export class FeatureFlagsController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet('/flags', TYPES.AuthMiddleware)
  private async getUserFlags() {
    const flags = FeatureFlag.findAll({ where: { enabled: true } });
    return FeatureFlagArrayToFeatureFlagDTOArray.map(await flags);
  }
}
