import '../AppDock.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { Box, Button, Typography } from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

type AppIconProps = {
  label: string;
  icon: JSX.Element;
  path: string;
  disabled?: boolean;
};

export const AppButton: React.FC<AppIconProps> = ({
  label,
  icon,
  path,
  disabled = false,
}) => {
  const [rotateY, setRotateY] = React.useState<number>(0);
  const animationFrameId = React.useRef<number | null>(null);
  const targetRotateY = React.useRef<number>(rotateY);
  const { t } = useTranslation();

  const smoothRotate = React.useCallback(() => {
    setRotateY((prevRotateY) => {
      const delta = targetRotateY.current - prevRotateY;
      const step = delta * 0.1; //Smoothing Factor

      if (Math.abs(delta) < 0.1) {
        cancelAnimationFrame(animationFrameId.current!);
        animationFrameId.current = null;
        return targetRotateY.current;
      }
      return prevRotateY + step;
    });
    animationFrameId.current = requestAnimationFrame(smoothRotate);
  }, []);

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, target } = event;
      const element = target as HTMLElement;
      const { left, right } = element.getBoundingClientRect();

      const mouseX = clientX - left;
      const width = right - left;
      const percentage = mouseX / width;
      const boundedYRotation = -30 + percentage * 70;

      targetRotateY.current = boundedYRotation;

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(smoothRotate);
      }
    },
    [smoothRotate],
  );

  const location = useLocation();
  const navigate = useNav();
  const sound = useSoundEffect();
  const { selectedOrgId } = useParams();

  const orgButton = path.startsWith('/orgs');

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      sound.playSound('navigate');
      if (orgButton && path !== '/orgs/finder') {
        const url = selectedOrgId ? `${path}/${selectedOrgId}` : path;
        navigate(url, 'internal', true).onClick(e);
      } else {
        navigate(path, 'internal', true).onClick(e);
      }
    },
    [navigate, orgButton, path, selectedOrgId, sound],
  );

  const isActive =
    label === 'Home'
      ? location.pathname === path || location.pathname === '/apps'
      : location.pathname.startsWith(path);

  const onClass = isActive ? 'on' : 'off';

  return (
    <Button
      className="App-Button"
      sx={{
        borderRadius: '15px',
        border: '2px outset',
        borderColor: disabled ? 'rgba(8,22,80,0.3)' : 'rgba(0,183,252,0.5)',
        minWidth: '120px',
        '&:hover': {
          border: '2px outset',
          borderColor: disabled ? 'rgba(8,22,80,0.5)' : 'rgba(0,183,252,0.8)',
        },
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      disabled={disabled}
      onMouseEnter={() => sound.playSound('hover')}
    >
      {orgButton && (
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: '50%',
            left: 2,
            writingMode: 'vertical-lr',
            textOrientation: 'upright',
            letterSpacing: '0.1px',
            fontWeight: 'bold',
            transform: 'translateY(-65%)',
            color: 'action.disabledBackground',
            opacity: '0.7',
            fontSize: '1.2em',
            textShadow:
              '-1px -1px 2px rgba(60, 255, 255, 0.2), 1px 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          {t('@APP.ORGS.LABEL')}
        </Typography>
      )}
      <Box className="App-Icon-Container">
        {React.cloneElement(icon, {
          className: `App-Icon ${onClass} rotate`,
          sx: { '--rotate-y': `${rotateY}deg` },
          fontSize: 'large',
        })}
        {React.cloneElement(icon, {
          className: `App-Reflection ${onClass}`,
          fontSize: 'large',
        })}
      </Box>
      <Typography
        color="textPrimary"
        className={`App-Title ${onClass}`}
        variant="body2"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {t(label) ?? label}
        <Box className={`App-Indicator ${onClass}`} />
      </Typography>
    </Button>
  );
};
