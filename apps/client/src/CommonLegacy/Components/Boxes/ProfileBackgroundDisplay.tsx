import { OpenInFull } from '@mui/icons-material';
import { alpha, Box, styled } from '@mui/material';

export const ProfileBackgroundDisplay = styled(Box)(({ theme }) => [
  {
    width: '300px',
    height: '120px',
    overflow: 'hidden',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '1em',
    zIndex: 2,
  },
  (theme.fidelity === 'high' || theme.fidelity === 'medium') && {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      opacity: 0,
      background: `linear-gradient(145deg, ${alpha(theme.palette.background.default, 0.35)}, transparent 70%)`,
      zIndex: 1,
    },
  },
  (theme.fidelity === 'high' || theme.fidelity === 'medium') &&
    (theme.animations === 'high' || theme.animations === 'medium') && {
      '&:before': {
        transition: 'opacity 0.3s ease',
      },
      '&:hover': {
        '&:before': {
          opacity: 1,
        },
        '& .ExpandIcon': {
          opacity: 1,
        },
      },
    },
  //VERSEOS BASE THEME
  theme.themeType === 'verseOS' && {
    borderRadius: '12px',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 8px 16px ${alpha(theme.palette.background.default, 0.5)}, inset 0 0 8px ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  //VERSEOS HIGH & MEDIUM FIDELITY
  theme.themeType === 'verseOS' &&
    (theme.fidelity === 'high' || theme.fidelity === 'medium') && {
      borderColor: theme.palette.secondary.dark,
    },
  theme.themeType === 'verseOS' &&
    (theme.fidelity === 'high' || theme.fidelity === 'medium') &&
    (theme.animations === 'high' ||
      theme.animations === 'medium' ||
      theme.animations === 'low') && {
      transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease',
      '&:hover': {
        boxShadow: `0 16px 32px ${alpha(theme.palette.background.default, 0.6)}, inset 0 0 8px ${alpha(theme.palette.text.primary, 0.4)}`,
        borderColor: theme.palette.secondary.main,
      },
    },
  //VERSEOS POTATO FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'potato' && {
      boxShadow: 'none',
    },
  //PIRATEOS BASE THEME
  theme.themeType === 'pirateOS' && {
    border: '2px ridge',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 8px 16px ${alpha(theme.palette.background.default, 0.5)}, inset 0 0 8px ${alpha(theme.palette.primary.light, 0.5)}`,
  },
  theme.themeType === 'pirateOS' &&
    (theme.fidelity === 'high' || theme.fidelity === 'medium') && {
      borderColor: theme.palette.primary.dark,
    },
  theme.themeType === 'pirateOS' &&
    (theme.fidelity === 'high' || theme.fidelity === 'medium') &&
    (theme.animations === 'high' ||
      theme.animations === 'medium' ||
      theme.animations === 'low') && {
      transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease',
      '&:hover': {
        boxShadow: `0 16px 32px ${alpha(theme.palette.background.default, 0.6)}, inset 0 0 8px ${alpha(theme.palette.primary.light, 0.4)}`,
        borderColor: theme.palette.primary.main,
      },
    },
  //VERSEOS POTATO FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'potato' && {
      boxShadow: 'none',
    },
]);

export const ExpandIconButton = styled(OpenInFull)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  transition: 'opacity 0.3s ease-in',
  zIndex: 2,
});
