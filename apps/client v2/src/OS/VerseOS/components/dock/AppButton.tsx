import { AppButton } from '@Components/Functional/Buttons/AppButton';
import { alpha, Box, useTheme } from '@mui/material';
import { settingsStore } from '@Store/userSettings/settingStore';
import { useStore } from '@tanstack/react-store';
import type { AppButtonProps } from '@Types/appDock/components';

export const VerseOSAppButton: React.FC<AppButtonProps> = (props) => {
  const { app, children, ...rest } = props;
  const theme = useTheme();
  const { fidelity, animations } = useStore(settingsStore);
  const isHighFidelity = fidelity === 'ultra' || fidelity === 'high';

  const glowColor = theme.palette.tertiary.main;
  const glassBg = alpha(theme.palette.background.paper, 0.25);
  const borderColor = app.disabled
    ? alpha(theme.palette.primary.dark, 0.5)
    : alpha(glowColor, 0.4);

  const Icon = app.icon;

  return (
    <AppButton
      app={app}
      {...rest}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
    >
      <Box
        data-testid={`${app.id}-AppButton__Surface`}
        aria-hidden={true}
        sx={[
          {
            borderRadius: '15px',
            border: '2px outset',
            borderColor,
            minWidth: '120px',
            maxWidth: '150px',
            '&:hover': {
              borderColor: app.disabled
                ? alpha(borderColor, 0.5)
                : alpha(borderColor, 0.8),
            },
          },
          fidelity === 'low' && {
            border: '2px solid',
            borderColor: alpha(borderColor, 0.8),
            minWidth: '100px',
            backgroundColor: 'action.disabled',
            '&:hover': {
              borderColor: 'secondary.main',
              bgcolor: 'action.disabled',
            },
            '&:disabled': {
              borderColor: alpha('primary.dark', 0.8),
            },
          },
          fidelity === 'potato' && {
            border: 'none',
            minWidth: 'fit-content',
          },
        ]}
      >
        <Box
          data-testid={`${app.id}-AppButton__Icon_Container`}
          sx={{
            position: 'relative',
            display: 'flex'
          }}
        >
          {/**Icon Logic setup */}
        </Box>
      </Box>
    </AppButton>
  );
};
