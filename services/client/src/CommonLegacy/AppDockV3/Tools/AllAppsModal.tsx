import { Dialog, Grow } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppSelector } from '@Redux/hooks';
import { selectAnimations } from '@Redux/Slices/Auth/auth.selectors';
import React from 'react';

import { AllAppsDisplay } from './AllAppsDisplay';

export const POPUP_APP_LIST = 'appList';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Grow in={true} timeout={1000} unmountOnExit mountOnEnter ref={ref} {...props} />
  );
});

export const AllApps: React.FC = () => {
  const animationSetting = useAppSelector(selectAnimations);

  const transitionComponent = animationSetting === 'high' ? Transition : undefined;
  return (
    <Dialog
      data-testid="AppList__Modal"
      open={true}
      data-popupstate={0}
      keepMounted
      maxWidth={false}
      scroll="paper"
      PaperProps={{
        sx: {
          background: 'none',
          boxShadow: 'none',
          height: '100%',
          width: '100%',
          backdropFilter: 'none',
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
        },
      }}
      TransitionComponent={transitionComponent}
      sx={{
        background: 'linear-gradient(135deg, rgba(14,35,141,0.4) 40%, rgba(8,22,80,0.6))',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AllAppsDisplay />
    </Dialog>
  );
};
