import { SpeedDialAction } from '@mui/material';
import React from 'react';

type MobileAppButtonProps = {
  icon: JSX.Element;
  isActive: boolean;
  isDisabled: boolean;
  label: boolean;
};
export const MobileAppButton: React.FC<MobileAppButtonProps> = ({
  icon,
  isActive,
  isDisabled,
  label,
}) => {
  return (
    <SpeedDialAction
      icon={React.cloneElement(icon, { fontSize: 'large', className: '' })}
      className=""
      tooltipTitle={label}
    />
  );
};
