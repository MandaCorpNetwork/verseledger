import { useSoundEffect } from '@Audio/AudioManager';
import {
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardDoubleArrowDown,
  SvgIconComponent,
} from '@mui/icons-material';
import { IconButton, SvgIcon, SxProps } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useCallback, useMemo } from 'react';

type DropdownButtonProps = {
  open?: boolean;
  variant?: 'filled' | 'outline' | 'double';
  onClick: () => void;
  'data-testid'?: string;
  'aria-label'?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  slotProps?: {
    icon?: {
      component?: SvgIconComponent;
      sx?: SxProps<Theme>;
    };
  };
  noSound?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  open,
  onClick,
  'data-testid': testId = 'DropDown',
  'aria-label': ariaLabel = 'Drop Down',
  disabled = false,
  sx,
  slotProps,
  noSound = false,
  variant = 'filled',
  size = 'medium',
}) => {
  const extendTheme = useDynamicTheme();
  const sound = useSoundEffect();
  const theme = useTheme();

  const layout = useMemo(() => {
    const button = extendTheme.layout('Buttons.DropdownButton');
    const icon = extendTheme.layout('Buttons.DropdownIcon');
    const iconOverwrite = {
      ...icon,
      ...slotProps?.icon?.sx,
    };
    const buttonOverwrite = {
      ...button,
      ...sx,
    };

    return { iconOverwrite, buttonOverwrite };
  }, [extendTheme, slotProps?.icon?.sx, sx]);

  const handleClick = useCallback(() => {
    if (!noSound) sound.playSound('clickMain');
    onClick();
  }, [noSound, onClick, sound]);

  const Icon = useMemo(() => {
    if (slotProps?.icon?.component) {
      return slotProps.icon.component;
    }
    switch (variant) {
      case 'outline':
        return KeyboardArrowDown;
      case 'double':
        return KeyboardDoubleArrowDown;
      case 'filled':
      default:
        return ArrowDropDown;
    }
  }, [slotProps?.icon?.component, variant]);

  return (
    <IconButton
      aria-label={ariaLabel}
      data-testid={`${testId}__Button`}
      onClick={handleClick}
      disabled={disabled}
      sx={{
        ...layout.buttonOverwrite,
      }}
    >
      <SvgIcon
        data-testid={`${testId}__Icon`}
        component={Icon}
        fontSize={size}
        sx={{
          transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
          ...((theme.animations === 'high' || theme.animations === 'medium') && {
            transition: 'transform 0.3s',
          }),
          ...layout.iconOverwrite,
        }}
      />
    </IconButton>
  );
};
