import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, ListItem, Switch, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { updateUserSettingsFlag } from '@Redux/Slices/Auth/Actions/updateUserSettingsFlag.action';
import { selectCurrentUser, selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { inFlagPercent, selectFlagsArray } from '@Redux/Slices/Flags/flags.selectors';
import React from 'react';

export const BetaSettings: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const settings = useAppSelector(selectUserSettings);
  const featuresRaw = useAppSelector(selectFlagsArray);
  const featuresToggleable = React.useMemo(
    () =>
      (featuresRaw ?? []).filter((flag) => {
        if (flag.settingName == null) return false;
        if (flag.percentageOfUsers != null && flag.percentageOfUsers < 1) {
          return inFlagPercent(`${user?.id}-${flag.id}`, flag.percentageOfUsers);
        }
        return true;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [featuresRaw, user?.id, settings],
  );
  const featuresEnabled = React.useMemo(
    () =>
      (featuresRaw ?? []).filter((flag) => {
        if (flag.settingName) {
          const setting_name = flag.settingName;
          const setting_value = settings[setting_name as keyof typeof settings];
          const checked = setting_value == flag.settingValue;
          if (!checked) return false;
        }
        if (flag.percentageOfUsers != null && flag.percentageOfUsers < 1) {
          return inFlagPercent(`${user?.id}-${flag.id}`, flag.percentageOfUsers);
        }
        return true;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [featuresRaw, user?.id, settings],
  );
  const dispatch = useAppDispatch();
  return (
    <GlassBox sx={{ minHeight: '100%', minWidth: '100%' }}>
      <Box height="45%">
        <Typography variant="h4">Enabled Beta Features</Typography>
        {featuresEnabled.length === 0 ? (
          <Typography variant="error" pl="1em">
            You do not have any Betas enabled
          </Typography>
        ) : (
          featuresEnabled.map((flag) => {
            const setting_name = flag.settingName;
            const setting_value = settings[setting_name as keyof typeof settings];
            const checked = setting_value == flag.settingValue;
            return (
              <ListItem key={flag.id}>
                <DigiBox width={'100%'}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        color={checked ? 'lime' : undefined}
                      >
                        {flag.name}
                      </Typography>
                      <Typography variant="caption">{flag.description}</Typography>
                    </Box>
                  </Box>
                </DigiBox>
              </ListItem>
            );
          })
        )}
      </Box>
      <Typography variant="h4">Beta Features Opt-In</Typography>
      {featuresToggleable.length === 0 ? (
        <Typography variant="error" pl="1em">
          You do not have any Betas available
        </Typography>
      ) : (
        featuresToggleable.map((flag) => {
          const setting_name = flag.settingName;
          const setting_value = settings[setting_name as keyof typeof settings];
          const checked = setting_value == flag.settingValue;
          const toggleSetting = () => {
            const body = {
              [setting_name as string]: checked ? '0' : (flag.settingValue as string),
            };
            dispatch(updateUserSettingsFlag(body));
          };
          return (
            <ListItem key={flag.id}>
              <DigiBox width={'100%'}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" color={checked ? 'lime' : undefined}>
                      {flag.name}
                    </Typography>
                    <Typography variant="caption">{flag.description}</Typography>
                  </Box>
                  <Box>
                    <Switch checked={checked} onChange={toggleSetting} />
                  </Box>
                </Box>
              </DigiBox>
            </ListItem>
          );
        })
      )}
    </GlassBox>
  );
};
