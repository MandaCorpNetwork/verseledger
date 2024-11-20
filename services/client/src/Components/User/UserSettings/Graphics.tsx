/* eslint-disable react/no-children-prop */
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { WarningAmberTwoTone } from '@mui/icons-material';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useForm } from '@tanstack/react-form';

export const GraphicsSettings: React.FC = () => {
  const form = useForm({
    defaultValues: {
      animations: '',
      fidelity: '',
    },
  });
  return (
    <GlassBox
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
        <DigiBox
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
        </DigiBox>
        <DigiBox
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
              name="fidelity"
              data-testid="UserSettings-SectionDisplay-GraphicsSettings-Form__AnimationsSettings_Input"
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
                    value="none"
                    control={<Radio color="secondary" />}
                    label="None"
                    color="secondary"
                  />
                </RadioGroup>
              )}
            />
          </DigiDisplay>
        </DigiBox>
      </form>
    </GlassBox>
  );
};
