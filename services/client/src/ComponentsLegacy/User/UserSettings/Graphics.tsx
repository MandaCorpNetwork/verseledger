/* eslint-disable react/no-children-prop */
import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import DigiDisplay from '@CommonLegacy/Components/Boxes/DigiDisplay';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { FormLoadingButton } from '@CommonLegacy/Components/Buttons/FormLoadingButton';
import { WarningAmberTwoTone } from '@mui/icons-material';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { updateUserSettings } from '@Redux/Slices/Auth/Actions/updateUserSettings.action';
import { useForm } from '@tanstack/react-form';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import {
  IUpdateUserSettingsCMD,
  IUserSettings,
} from 'vl-shared/src/schemas/UserSettings';

type GraphicsSettingsProps = {
  currentSettings: IUserSettings;
};

const animationOptions = ['high', 'medium', 'low', 'none'];
const qualityOptions = ['high', 'medium', 'low', 'potato'];

export const GraphicsSettings: React.FC<GraphicsSettingsProps> = (props) => {
  const { currentSettings } = props;
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const form = useForm({
    defaultValues: {
      animations: currentSettings.animations ?? 'medium',
      quality: currentSettings.quality ?? 'medium',
    },
    onSubmit: ({ value }) => {
      const updatePayload: IUpdateUserSettingsCMD = {
        animations: value.animations,
        quality: value.quality,
      };
      sound.playSound('loading');

      dispatch(updateUserSettings(updatePayload))
        .then(() => {
          enqueueSnackbar('Graphics Settings updated Successfully', {
            variant: 'success',
          });
          sound.playSound('success');
        })
        .catch((error) => {
          enqueueSnackbar('Failed to update Graphics Settings', { variant: 'error' });
          sound.playSound('error');
          Logger.error('Failed to update Graphics Settings', error);
        });
    },
  });
  return (
    <FeatureContainer
      data-testid="UserSettings-SectionDisplay__GraphicsSettings_Container"
      sx={{ minHeight: '100%', minWidth: '100%', p: '2em' }}
    >
      <Typography
        data-testid="UserSettings-SectionDisplay__GraphicsSettings_Title"
        variant="h5"
        sx={{ fontWeight: 'bold', textShadow: '0 0 7px rgba(24,252,252,.8)', mb: '1em' }}
      >
        Graphics Settings
      </Typography>
      <form
        data-testid="UserSettings-SectionDisplay__GraphicsSettings_Form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '1em',
          padding: '0 1em',
        }}
      >
        <ComponentContainer
          data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Container"
          sx={{ width: '300px', p: '0.5em 1em' }}
        >
          <Typography
            data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Title"
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}
          >
            App Animations
          </Typography>
          <Typography
            data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Description"
            variant="body2"
            color="textSecondary"
          >
            Sets the intensity of animations through app.
          </Typography>
          <DigiDisplay
            data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Wrapper"
            sx={{ my: '0.5em', alignItems: 'flex-start', px: '0.5em' }}
          >
            <form.Field
              name="animations"
              data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Input"
              validators={{
                onChange: ({ value }) =>
                  animationOptions.includes(value) ? undefined : 'Invalid Option',
                onBlur: ({ value }) =>
                  animationOptions.includes(value) ? undefined : 'Invalid Option',
              }}
              children={(field) => (
                <RadioGroup
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <FormControlLabel
                    value="high"
                    control={<Radio color="secondary" />}
                    label="High"
                    color="secondary"
                  />
                  <Typography
                    variant="caption"
                    color={field.state.value === 'high' ? 'info' : 'textDisabled'}
                    sx={{ display: 'inline-flex', gap: '0.2em' }}
                  >
                    <WarningAmberTwoTone fontSize="small" />
                    Requires Browser Hardware Acceleration
                  </Typography>
                  <FormControlLabel
                    value="medium"
                    control={<Radio color="secondary" />}
                    label="Medium"
                    color="secondary"
                  />
                  <FormControlLabel
                    value="low"
                    control={<Radio color="secondary" />}
                    label="Low"
                    color="secondary"
                  />
                  <FormControlLabel
                    value="none"
                    control={<Radio color="secondary" />}
                    label="None"
                    color="secondary"
                  />
                </RadioGroup>
              )}
            />
          </DigiDisplay>
        </ComponentContainer>
        <ComponentContainer
          data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__ComponentFidelity_Container"
          sx={{ width: '300px', p: '0.5em 1em' }}
        >
          <Typography
            data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__ComponentFidelity_Title"
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}
          >
            Component Fidelity
          </Typography>
          <Typography
            data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__ComponentFidelity_Description"
            variant="body2"
            color="textSecondary"
          >
            Sets the Quality of Components on the site
          </Typography>
          <DigiDisplay
            data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__ComponentFidelity_Wrapper"
            sx={{ my: '0.5em', alignItems: 'flex-start', px: '0.5em' }}
          >
            <form.Field
              name="quality"
              data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Input"
              validators={{
                onChange: ({ value }) =>
                  qualityOptions.includes(value) ? undefined : 'Invalid Option',
                onBlur: ({ value }) =>
                  qualityOptions.includes(value) ? undefined : 'Invalid Option',
              }}
              children={(field) => (
                <RadioGroup
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <FormControlLabel
                    value="high"
                    control={<Radio color="secondary" />}
                    label="High"
                    color="secondary"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio color="secondary" />}
                    label="Medium"
                    color="secondary"
                  />
                  <FormControlLabel
                    value="low"
                    control={<Radio color="secondary" />}
                    label="Low"
                    color="secondary"
                  />
                  <FormControlLabel
                    value="potato"
                    control={<Radio color="secondary" />}
                    label="Potato"
                    color="secondary"
                  />
                </RadioGroup>
              )}
            />
          </DigiDisplay>
        </ComponentContainer>
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            marginBottom: '16px',
            marginRight: '16px',
          }}
        >
          {/* <form.Subscribe
            selector={(state) => [state.errors, state.isFormValid]}
            childrenm={([_errors, isFormValid]) => (
              <Alert
                variant="outlined"
                severity={isFormValid ? 'success' : 'error'}
              ></Alert>
            )}
          /> */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting, state.values]}
            children={([canSubmit, isSubmitting, values]) => {
              const defaultValues = form.options?.defaultValues;
              const isUnchanged =
                JSON.stringify(values) === JSON.stringify(defaultValues);
              return (
                <FormLoadingButton
                  label="Save Settings"
                  loading={!!isSubmitting}
                  disabled={!canSubmit || isUnchanged}
                  onClick={form.handleSubmit}
                />
              );
            }}
          />
        </div>
      </form>
    </FeatureContainer>
  );
};
