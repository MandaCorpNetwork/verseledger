import { alpha, Drawer, styled } from '@mui/material';

export const PanelSelection = styled(Drawer)(({ theme }) => [
  {
    position: 'relative',
    '& .MuiDrawer-paper': {
      position: 'relative',
      boxSizing: 'border-box',
    },
  },
  //VERSEOS BASE THEME
  theme.themeType === 'verseOS' && {
    borderRadius: '10px',
    '& .MuiDrawer-paper': {
      backgroundColor: alpha(theme.palette.primary.main, 0.3),
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      border: '2px solid',
      borderLeft: 'none',
      borderColor: theme.palette.primary.main,
    },
  },
  //VERSEOS HIGH FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' && {
      boxShadow: `2px 4px 4px ${alpha(theme.palette.background.paper, 0.4)}, 3px 3px 4px ${alpha(theme.palette.background.paper, 0.3)}, 4px 4px 12px ${alpha(theme.palette.background.paper, 0.2)}, 5px 5px 16px ${alpha(theme.palette.background.paper, 0.1)}`,
      '& .MuiDrawer-paper': {
        boxShadow: `inset 0px 1px 2px ${alpha(theme.palette.primary.light, 0.2)}, inset 0 -1px 2px ${alpha(theme.palette.background.default, 0.2)}, 0 4px 6px ${alpha(theme.palette.background.default, 0.3)}, 0 2px 4px ${alpha(theme.palette.primary.light, 0.2)}`,
        backgroundImage: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.4)}, ${alpha(theme.palette.background.paper, 0.6)})`,
        '&:before': {
          //TODO: Inspect not working
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.background.default, 0.3)} 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
          zIndex: -1,
          opacity: 1,
          height: '100%',
          width: '100%',
          backgroundRepeat: 'repeat',
        },
      },
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'high' && {
      '& .MuiDrawer-paper': {
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundImage: `linear-gradient(125deg, ${(theme.palette.background.default, 0.25)}, ${alpha(theme.palette.action.disabledBackground, 0.3)})`,
          borderColor: theme.palette.primary.light,
          boxShadow: `inset 0px 1px ${alpha(theme.palette.primary.light, 0.2)}, inset 0 -1px 2px ${alpha(theme.palette.background.default, 0.2)}`,
          '&:before': {
            backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 1px, transparent 1px)`,
          },
        },
      },
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: `2px 2px 6px 6px ${alpha(theme.palette.background.paper, 0.3)}, 2px 4px 8px 8px ${alpha(theme.palette.background.paper, 0.3)}, 4px 6px 12px 12px ${alpha(theme.palette.background.paper, 0.2)}, 4px 8px 16px 24px ${alpha(theme.palette.background.paper, 0.1)}`,
      },
    },
]);
