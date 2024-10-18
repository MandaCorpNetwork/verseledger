import { AppsTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

type MoreIconProps = {
  toggleView: () => void;
};

export const MoreIcon: React.FC<MoreIconProps> = ({ toggleView }) => {
  const icon = <AppsTwoTone />;
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
  return (
    <Box
      className="Swap-Icon-Container"
      onMouseMove={handleMouseMove}
      onClick={toggleView}
    >
      {React.cloneElement(icon, {
        className: 'Swap-Icon',
        fontSize: 'large',
        sx: { '--rotate-y': `${rotateY}deg` },
      })}
      {React.cloneElement(icon, { className: 'Swap-Icon-Reflection', fontSize: 'large' })}
    </Box>
  );
};
