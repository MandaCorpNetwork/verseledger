import '@Assets/Css/AppDockV3.css';

import { VLLogo } from '@Common/Definitions/CustomIcons';
import { Box } from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useLocation } from 'react-router-dom';

type SplashIconProps = {
  quality: string;
  animations: string;
};

export const SplashIcon: React.FC<SplashIconProps> = ({ quality, animations }) => {
  const [rotateY, setRotateY] = React.useState<number>(0);

  const animationFrameId = React.useRef<number | null>(null);
  const targetRotateY = React.useRef<number>(rotateY);

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
    (event: React.MouseEvent<HTMLDivElement>) => {
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

  const resetRotation = React.useCallback(() => {
    targetRotateY.current = 0;
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(smoothRotate);
    }
  }, [smoothRotate, targetRotateY]);

  const advButtonAnimation = React.useMemo(() => {
    if (animations === 'high') {
      return { handleMouseMove, resetRotation };
    }
  }, [animations, handleMouseMove, resetRotation]);

  React.useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const nav = useNav();
  const location = useLocation();
  const isActive = location.pathname !== '/';

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (location.pathname !== '/') {
        nav('/', 'internal', true).onClick(e);
      }
    },
    [location.pathname, nav],
  );

  const handleAuxClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (location.pathname !== '/') {
        nav('/', 'internal', true).onAuxClick(e);
      }
    },
    [location.pathname, nav],
  );

  const splashIconStyles = React.useMemo(() => {
    const classNames: string[] = [];
    if (!isActive) {
      classNames.push('off');
      return classNames.join(' ');
    }
    if (quality === 'medium' || quality === 'high') {
      classNames.push('AdvAppIcon');
    }
    classNames.push('DockFunctionIcon');
    switch (animations) {
      case 'high':
        classNames.push('DockFunctionIconHighAnimation');
        break;
      case 'low':
        classNames.push('DockFunctionIconLowAnimation');
        break;
      case 'none':
        classNames.push('DockFunctionIconNoAnimation');
        break;
      case 'medium':
      default:
        classNames.push('DockFunctionIconMedAnimation');
        break;
    }
    return classNames.join(' ');
  }, [animations, isActive, quality]);

  const splashIcon = (
    <VLLogo
      data-testid="AppDock__Splash_Icon"
      className={splashIconStyles}
      fontSize="large"
      sx={[animations === 'high' && { '--rotate-y': `${rotateY}deg` }]}
    />
  );

  const splashIconReflection = (
    <VLLogo
      data-testid="AppDock__Splash_IconReflection"
      className={`DockFunctionReflection ${!isActive && 'off'}`}
      fontSize="large"
    />
  );

  return (
    <Box
      data-testid="AppDock__Splash_Button"
      className="AppIconContainer"
      onMouseMove={advButtonAnimation?.handleMouseMove}
      onMouseLeave={advButtonAnimation?.resetRotation}
      onClick={handleClick}
      onAuxClick={handleAuxClick}
    >
      {splashIcon}
      {(quality === 'medium' || quality === 'high') && splashIconReflection}
    </Box>
  );
};
