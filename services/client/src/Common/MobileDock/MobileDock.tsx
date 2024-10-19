import './MobileDock.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { FileCopy, Print, Save, Share } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import React from 'react';

const semiCircleDegree = 90;
const offsetCircleDegree = -90;

const actions = [
  { icon: <FileCopy />, name: 'Copy' },
  { icon: <Save />, name: 'Save' },
  { icon: <Print />, name: 'Print' },
  { icon: <Share />, name: 'Share' },
];
const actionCount = actions.length;

type MobileDockProps = {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  vCenter?: boolean;
  hCenter?: boolean;
  // positionOffset?: object;
  fade?: boolean;
};

export const MobileDock: React.FC<MobileDockProps> = ({
  fade,
  top,
  bottom = true,
  left = true,
  right,
  vCenter,
  hCenter,
}) => {
  // Open Logic
  const [open, setOpen] = React.useState<boolean>(false);
  const sound = useSoundEffect();
  const handleClick = React.useCallback(() => {
    setOpen((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [setOpen, sound]);

  const getPosition = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const position = {} as any;
    switch (true) {
      case top:
        position.top = 0;
        break;
      case bottom:
        position.bottom = 0;
        break;
      case left:
        position.left = 0;
        break;
      case right:
        position.left = 0;
        break;
      case vCenter:
        position.top = '50%';
        position.transform = 'translateY(-50%)';
        break;
      case hCenter:
        position.right = '50%';
        position.transform = 'translateX(-50%)';
        break;
    }
    return position;
  }, [top, left, right, bottom, vCenter, hCenter]);
  const position = getPosition();

  return (
    <SpeedDial
      ariaLabel="menu"
      direction="up"
      open={open}
      onClick={handleClick}
      sx={[{ position: 'absolute' }, { ...position }]}
    >
      {actions.map((action, index) => {
        const angle = (semiCircleDegree / (actionCount - 1)) * index;
        const radius = 100;

        return (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={[
              {
                position: 'absolute',
                top: `-${radius * Math.cos((angle * Math.PI) / 180)}px`, //
                left: `-${radius * Math.sin((angle * Math.PI) / 180)}px`, //
              },
            ]}
          />
        );
      })}
    </SpeedDial>
  );
};
