import { Mapper } from '@Infrastructure/Mapper';
import { FeatureFlagDTO } from './FeatureFlagDTO';
import { FeatureFlag } from '../feature_flag.model';
import { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

export class FeatureFlagArrayToFeatureFlagDTOArray extends Mapper<
  FeatureFlag,
  FeatureFlagDTO
> {
  public static override map(artifacts: FeatureFlag[]): FeatureFlagDTO[] {
    return artifacts.map((artifact) => {
      const flag: IFeatureFlag = artifact.get();
      return new FeatureFlagDTO(flag);
    });
  }
}
