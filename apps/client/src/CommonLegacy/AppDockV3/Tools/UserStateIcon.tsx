import '@Assets/Css/AppDockV3.css';

import { SensorOccupiedTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { bindTrigger, type PopupState } from 'material-ui-popup-state/hooks';
import React from 'react';

type UserStateIconProps = {
  popupState: PopupState;
  quality: string;
  animations: string;
};

export const UserStateIcon: React.FC<UserStateIconProps> = ({
  popupState,
  quality,
  animations,
}) => {
  const { onClick, onTouchStart, ...ariaProps } = bindTrigger(popupState);
  const [rotateY, setRotateY] = React.useState<number>(0);

  const animationFrameId = React.useRef<number | null>(null);
  const targetRotateY = React.useRef<number>(rotateY);

  const smoothRotate = React.useCallback(() => {
    setRotateY((prevRotateY) => {
      const delta = targetRotateY.current - prevRotateY;
      const step = delta * 0.1;

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
  }, [smoothRotate]);

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

  const userLocation = useAppSelector(selectUserLocation);

  const isLocationSet = Boolean(userLocation.id);

  const userStateStyles = React.useMemo(() => {
    const classNames: string[] = ['DockFunctionIcon'];
    if (quality === 'medium' || quality === 'high') {
      classNames.push('AdvAppIcon');
    }
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
      // case 'medium':
      default:
        classNames.push('DockFunctionIconMedAnimation');
        break;
    }
    return classNames.join(' ');
  }, [animations, quality]);

  const iconSize = React.useMemo(() => {
    switch (quality) {
      case 'low':
      case 'potato':
        return 'medium';
      // case 'high':
      // case 'medium':
      default:
        return 'large';
    }
  }, [quality]);

  const functionIcon = (
    <SensorOccupiedTwoTone
      data-testid="AppDock__UserState_Icon"
      className={userStateStyles}
      fontSize={iconSize}
      sx={[animations === 'high' && { '--rotate-y': `${rotateY}deg` }]}
    />
  );

  const userStateReflectionStyles = React.useMemo(() => {
    const classNames: string[] = ['DockFunctionReflection'];
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
      // case 'medium':
      default:
        classNames.push('DockFunctionIconMedAnimation');
        break;
    }
    return classNames.join(' ');
  }, [animations]);

  const appIconReflection = (
    <SensorOccupiedTwoTone
      data-testid="AppDock__UserState_IconReflection"
      className={userStateReflectionStyles}
      fontSize="large"
    />
  );
  return (
    <Box
      data-testid="AppDock__UserState_Button"
      id="AppDock__UserState_Button"
      className={`AppIconContainer ${!isLocationSet && 'StateAlert'}`}
      onMouseMove={advButtonAnimation?.handleMouseMove}
      onMouseLeave={advButtonAnimation?.resetRotation}
      onClick={onClick}
      onTouchStart={onTouchStart}
      {...ariaProps}
    >
      {functionIcon}
      {(quality === 'medium' || quality === 'high') && appIconReflection}
    </Box>
  );
};
