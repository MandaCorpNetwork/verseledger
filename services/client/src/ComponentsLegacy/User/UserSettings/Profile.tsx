/* eslint-disable react/no-children-prop */
import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { MaskedVideo } from '@Common/Components/Functional/Applcation/MaskedVideo';
import { themeInfoMap } from '@Common/Definitions/Themes/themeMaps';
import { profileBackgroundMap } from '@Common/Definitions/Themes/UserBackgroundMap';
import {
  ExpandIconButton,
  ProfileBackgroundDisplay,
} from '@CommonLegacy/Components/Boxes/ProfileBackgroundDisplay';
import { WarningTwoTone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { updateUserSettings } from '@Redux/Slices/Auth/Actions/updateUserSettings.action';
import { selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { useForm } from '@tanstack/react-form';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IUpdateUserSettingsCMD } from 'vl-shared/src/schemas/UserSettings';

/**
 * ### Profile Settings
 * @description
 * This is the component displayed when Profile is selected in the UserSettings.
 * Allows users to change displayable content on their User Page and User Card
 * #### Function Components
 * #### Styled Components
 */
export const ProfileSettings: React.FC = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const theme = useTheme();
  /// LOGIC
  const userSettings = useAppSelector(selectUserSettings);

  const userBackground = userSettings?.userPageImage ?? '';

  const currentBackground =
    profileBackgroundMap[userBackground] ?? profileBackgroundMap['pioneer1'];

  const form = useForm({
    defaultValues: {
      profileBackground: currentBackground.value,
      theme: userSettings.theme ?? 'verseOS',
    },
    onSubmit: ({ value }) => {
      const updatePayload: IUpdateUserSettingsCMD = {
        userPageImage: value.profileBackground,
        theme: value.theme,
      };
      sound.playSound('loading');

      dispatch(updateUserSettings(updatePayload))
        .then(() => {
          enqueueSnackbar('Profile Settings updated Successfully', {
            variant: 'success',
          });
          sound.playSound('success');
        })
        .catch((error) => {
          enqueueSnackbar('Failed to update Profile Settings', { variant: 'error' });
          sound.playSound('error');
          Logger.error('Failed to update Profile Settings', error);
        });
    },
  });

  const handleExpandImage = React.useCallback(
    (url: string) => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      sound.playSound('open');
    },
    [sound],
  );

  return (
    <FeatureContainer data-testid="UserSettings-Settings-ProfileSettings__Container">
      <Typography
        data-testid="ProfileSettings__Title"
        variant="h5"
        sx={{ fontWeight: 'bold', textShadow: '0 0 7px rgba(24,252,252,.8)' }}
      >
        Profile Settings
      </Typography>
      <form
        data-testid="ProfileSettings__Form_Wrapper"
        style={{ display: 'flex', margin: '5%' }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FeatureDisplay
          data-testid="ProfileSettings-Form__Aesthetics_Container"
          sx={{ width: '100%' }}
        >
          <Typography data-testid="ProfileSettings-Form__Aesthetics_Title" variant="h6">
            Aesthetics
          </Typography>
          <div
            data-testid="ProfileSettings-Form-Aesthetics__Field_Wrapper"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              padding: '1em',
            }}
          >
            <ComponentContainer
              data-testid="ProfileSettingsForm-Aesthetics__ProfileBackground_Container"
              sx={{ p: '.5em' }}
            >
              <Typography
                data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground__Field_Title"
                variant="subtitle1"
              >
                Profile Background
              </Typography>
              <Divider />
              <form.Field
                name="profileBackground"
                data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground__Field"
                children={(field) => (
                  <div
                    data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__Input_Wrapper"
                    style={{
                      padding: '0.5em',
                      marginTop: '0.5em',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <FormControl>
                      <InputLabel
                        data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__Input_Label"
                        color="secondary"
                      >
                        Select Background
                      </InputLabel>
                      <Select
                        data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__Select_Input"
                        size="small"
                        color="secondary"
                        label="Select Background"
                        autoWidth
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        MenuProps={{
                          sx: {
                            maxHeight: '50%',
                          },
                        }}
                      >
                        {Object.values(profileBackgroundMap).map((option) => {
                          return (
                            <MenuItem
                              data-testid={`ProfileSettings-Form-Aesthetics-ProfileBackground-Field-Select__${option.value}_MenuItem`}
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                )}
              />
              <form.Subscribe
                data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__SelectionDisplay_Subscription"
                selector={(state) => ({
                  profileBackground: state.values.profileBackground,
                })}
                children={(profileBackground) => (
                  <ComponentDisplay
                    data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__SelectionDisplay_Wrapper"
                    sx={{ mx: '0.5em', my: '0.3em' }}
                  >
                    <Typography
                      data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__SelectionDisplay_Description"
                      variant="subtitle2"
                      align="left"
                      sx={{ width: '100%', ml: '1em', mt: '0.5em' }}
                    >
                      Preview
                    </Typography>
                    <ProfileBackgroundDisplay
                      data-testid="ProfileSettings-Form-Aesthetics-ProfileBackground-Field__SelectionDisplay_Image"
                      onClick={() =>
                        handleExpandImage(
                          profileBackgroundMap[profileBackground.profileBackground].url,
                        )
                      }
                      sx={{
                        backgroundImage: `url(${profileBackgroundMap[profileBackground.profileBackground].url})`,
                        cursor: 'pointer',
                      }}
                    >
                      <ExpandIconButton className="ExpandIcon" />
                    </ProfileBackgroundDisplay>
                  </ComponentDisplay>
                )}
              />
            </ComponentContainer>
            <ComponentContainer
              data-testid="ProfileSettingsForm-Aesthetics__Theme_Container"
              sx={{ p: '.5em', justifyContent: 'flex-start' }}
            >
              <Typography
                data-testid="ProfileSettings-Form-Aesthetics-Theme__Field_Title"
                variant="subtitle1"
              >
                VerseLedger Theme
              </Typography>
              <Divider />
              <form.Field
                name="theme"
                data-testid="ProfileSettings-Form-Aesthetics-Theme__Field"
                children={(field) => (
                  <ComponentDisplay
                    data-testid="ProfileSettings-Form-Aesthetics-Theme-Field__Input_Wrapper"
                    style={{
                      flexGrow: 1,
                      padding: '0.5em',
                      margin: '1em',
                      marginTop: '1.5em',
                      justifyContent: 'center',
                    }}
                  >
                    {theme.fidelity === 'high' && (
                      <MaskedVideo
                        themeOverride={field.state.value as ThemeType}
                        sx={{ opacity: 0.5 }}
                      />
                    )}
                    <FormControl>
                      <FormLabel
                        data-testid="ProfileSettings-Form-Aesthetics-Theme-Field__Input_Label"
                        color="secondary"
                      >
                        Select Theme
                      </FormLabel>
                      <RadioGroup
                        data-testid="ProfileSettings-Form-Aesthetics-Theme-Field__RadioGroup"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        row
                        sx={{
                          display: 'flex',
                          maxWidth: '350px',
                          justifyContent: 'center',
                        }}
                      >
                        {Object.values(themeInfoMap).map((option) => (
                          <FormControlLabel
                            data-testid={`ProfileSettings-Form-Aesthetics-Theme-Field__${option.themeType}_Radio`}
                            key={option.themeType}
                            value={option.themeType}
                            label={option.themeLabel}
                            control={
                              <Radio
                                color={
                                  //TODO: Define Default Prop in VERSEOS Theme for Radio Color
                                  theme.themeType === 'verseOS' ? 'secondary' : 'primary'
                                }
                              />
                            }
                            disabled={option.disabled}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Typography
                      data-testid="ProfileSettings-Form-Aesthetics-Theme-Field__Warning_Message"
                      variant="overline"
                      color="warning"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      {themeInfoMap[field.state.value as ThemeType].warning && (
                        <>
                          <WarningTwoTone
                            data-testid="ProfileSettings-Form-Aesthetics-Theme-Field__Warning_Icon"
                            fontSize="small"
                          />
                          {themeInfoMap[field.state.value as ThemeType].warningMsg}
                        </>
                      )}
                    </Typography>
                  </ComponentDisplay>
                )}
              />
            </ComponentContainer>
          </div>
        </FeatureDisplay>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting, state.values]}
          children={([canSubmit, isSubmitting, values]) => {
            const defaultValues = form.options?.defaultValues;
            const isUnchanged = JSON.stringify(values) === JSON.stringify(defaultValues);
            return (
              <LoadingButton
                data-testid="ProfileSettings__FormSubmit_Button"
                loading={!!isSubmitting}
                disabled={!canSubmit || isUnchanged}
                onClick={form.handleSubmit}
                variant="contained"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  m: '16px',
                  zIndex: 4,
                }}
              >
                Save Settings
              </LoadingButton>
            );
          }}
        />
      </form>
    </FeatureContainer>
  );
};
