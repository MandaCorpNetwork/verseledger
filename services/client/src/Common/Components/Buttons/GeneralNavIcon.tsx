import { Launch } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';

type CopyStringProps = {
  /** URL String */
  url: string;
  /** External || Internal */
  variant: 'external' | 'internal';
  /** Size of the Icon. Default "Medium" */
  size?: 'small' | 'medium' | 'large';
  /** Color of Icon */
  iconColor?:
    | 'action'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'secondary'
    | 'disabled'
    | 'inherit'
    | 'primary';
  buttonColor?:
    | 'error'
    | 'success'
    | 'warning'
    | 'default'
    | 'info'
    | 'secondary'
    | 'inherit'
    | 'primary';
  /** Slots- Root: IconButton, Icon: MUI SvgIcon */
  slotProps?: {
    root?: {
      sx?: object;
    };
    icon?: {
      sx?: object;
    };
  };
  /** Slots- Icon: Change Icon Displayed */
  slots?: {
    icon?: React.ReactNode;
  };
  ['data-testid']?: string;
};

/** Reusable Nav IconButton */
export const GeneralNav: React.FC<CopyStringProps> = ({
  url,
  variant,
  size = 'medium',
  iconColor = 'secondary',
  buttonColor = 'secondary',
  slotProps,
  slots,
  'data-testid': testid,
}) => {
  const handleNav = useNav();
  const icon = slots?.icon ? (
    slots.icon
  ) : (
    <Launch
      fontSize={size}
      color={iconColor}
      sx={{ ...slotProps?.icon?.sx }}
      data-testid={`${testid + '__'}GeneralNav_Icon`}
    />
  );
  return (
    <IconButton
      data-testid={`${testid + '__'}GeneralNav_IconButton`}
      size="small"
      color={buttonColor}
      sx={{ ...slotProps?.root?.sx }}
      onClick={(e) => handleNav(e, url, variant)}
    >
      {icon}
    </IconButton>
  );
};
