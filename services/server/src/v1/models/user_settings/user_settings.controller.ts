import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { UserSettingsService } from './user_settings.service';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { UserSettingsArrayToUserSettingsDTOMapper } from './mapping/UserSettingsArrayToUserSettingsDTO.mapper';
import {
  IUpdateUserSettingsCMD,
  UpdateUserSettingsCMD,
} from 'vl-shared/src/schemas/UserSettings';

@controller('/v1/settings')
export class UserSettingsController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserSettingsService)
    private userSettingsService: UserSettingsService,
  ) {
    super();
  }

  @httpGet(`/@me`, TYPES.AuthMiddleware)
  public async getSettings() {
    const principal = this.httpContext.user as VLAuthPrincipal;
    const userId = principal.id;
    const settingsArtifacts =
      await this.userSettingsService.getUserSettings(userId);
    return UserSettingsArrayToUserSettingsDTOMapper.map(settingsArtifacts);
  }

  @httpPatch(`/@me`, TYPES.AuthMiddleware)
  public async updateSettings(@requestBody() cmd: IUpdateUserSettingsCMD) {
    const settingsCMD = UpdateUserSettingsCMD.strict().parse(cmd);

    const principal = this.httpContext.user as VLAuthPrincipal;
    const userId = principal.id;
    const response = await this.userSettingsService.updateUserSettings(
      userId,
      settingsCMD,
    );
    return UserSettingsArrayToUserSettingsDTOMapper.map(response);
  }

  @httpGet(`/:userId/pageImage`)
  public async getUserPageImage(@requestParam('userId') userId: string) {
    const userPageImage = await this.userSettingsService.getUserPageImage(
      userId,
    );
    return this.ok(userPageImage);
  }
}
