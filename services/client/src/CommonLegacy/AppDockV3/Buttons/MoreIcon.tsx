import { AppsTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

type MoreIconProps = {
  toggleView: () => void;
  quality: string;
  animations: string;
};

export const MoreIcon: React.FC<MoreIconProps> = ({
  toggleView,
  quality,
  animations,
}) => {
  const [rotateY, setRotateY] = React.useState<number>(0);
  const animationFrameId = React.useRef<number | null>(null);
  const targetRotateY = React.useRef<number>(rotateY);

  const smoothRotate = React.useCallback(() => {
    setRotateY((prevRotateY) => {
      const delta = targetRotateY.current - prevRotateY;
      const step = delta * 0.1; //Smoothing Factor

      if (Math.abs(delta) < 0.1) {
        cancelAnimationFrame(animationFrameId!.current!);
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

  const moreIconStyles = React.useMemo(() => {
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
      case 'medium':
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
      case 'high':
      case 'medium':
      default:
        return 'large';
    }
  }, [quality]);

  const moreIcon = (
    <AppsTwoTone
      data-testid="AppDock__More_Icon"
      className={moreIconStyles}
      fontSize={iconSize}
      sx={[animations === 'high' && { '--rotate-y': `${rotateY}deg` }]}
    />
  );

  const moreIconReflection = (
    <AppsTwoTone
      data-testid="AppDock__More_IconReflection"
      className="DockFunctionReflection"
      fontSize="large"
    />
  );
  return (
    <Box
      data-testid="AppDock__AppList_Button"
      className="AppIconContainer"
      onMouseMove={advButtonAnimation?.handleMouseMove}
      onMouseLeave={advButtonAnimation?.resetRotation}
      onClick={toggleView}
    >
      {moreIcon}
      {(quality === 'medium' || quality === 'high') && moreIconReflection}
    </Box>
  );
};
