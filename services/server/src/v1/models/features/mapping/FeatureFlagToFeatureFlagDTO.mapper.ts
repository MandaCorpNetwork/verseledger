import { Mapper } from '@Infrastructure/Mapper';
import { FeatureFlagDTO } from './FeatureFlagDTO';
import { FeatureFlag } from '../feature_flag.model';
import { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

export class FeatureFlagToFeatureFlagDTOMapper extends Mapper<
  FeatureFlag,
  FeatureFlagDTO
> {
  public static override map(artifact: FeatureFlag): FeatureFlagDTO {
    const flag: IFeatureFlag = artifact.get();
    return new FeatureFlagDTO(flag);
  }
}
