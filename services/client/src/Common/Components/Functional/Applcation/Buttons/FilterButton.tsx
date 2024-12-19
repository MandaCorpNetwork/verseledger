import { FilterAlt, FilterAltTwoTone, type SvgIconComponent } from '@mui/icons-material';
import {
  Badge,
  Button,
  type ButtonProps,
  IconButton,
  type IconButtonProps,
  SvgIcon,
  type SxProps,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useMemo } from 'react';

type FilterButtonProps = {
  /** Count property to Render the Badge */
  filterCount?: number;
  /** Sets the Button as an IconButton or Normal Button */
  variant?: 'icon' | 'box';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'data-testid'?: string;
  'aria-label'?: string;
  iconSize?: 'small' | 'medium' | 'large';
  buttonSize?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sx?: SxProps<Theme>;
  slotProps?: {
    iconButton?: {
      props?: IconButtonProps;
      icon?: {
        component: SvgIconComponent;
        sx?: SxProps<Theme>;
      };
    };
    button?: {
      props?: ButtonProps;
      icon?: {
        component: SvgIconComponent;
        sx?: SxProps<Theme>;
      };
    };
    badge?: {
      sx?: SxProps<Theme>;
    };
  };
};

/**
 * @description Modular Filter Button Component that can either return an Icon Button or Normal Button for the filter. This button also recieves some custom properties to style a badge that denotes to the user if there are filters set.
 * Use Slot Props to access the IconButton, Button & Badge Props
 */
export const FilterButton: React.FC<FilterButtonProps> = ({
  filterCount = 0,
  variant = 'icon',
  onClick,
  'data-testid': testId = 'Filter',
  'aria-label': ariaLabel = 'Open Filter Menu Button',
  iconSize = 'medium',
  buttonSize,
  disabled = false,
  sx,
  slotProps,
}) => {
  const extendTheme = useDynamicTheme();

  const layout = useMemo(() => {
    const buttonPull = extendTheme.layout('Global.FilterButton');
    const iconButtonPull = extendTheme.layout('Global.FilterIconButton');
    const buttonSvgPull = extendTheme.layout('Global.FilterButtonSVG');
    const iconButtonSvgPull = extendTheme.layout('Global.FilterIconButtonSVG');
    const buttonBadgePull = extendTheme.layout('Global.FilterButtonBadge');
    const iconButtonBadgePull = extendTheme.layout('Global.FilterIconButtonBadge');

    const button = {
      ...buttonPull,
      ...sx,
    };

    const iconButton = {
      ...iconButtonPull,
      ...sx,
    };

    const buttonSvg = {
      ...buttonSvgPull,
      ...slotProps?.button?.icon?.sx,
    };

    const iconButtonSvg = {
      ...iconButtonSvgPull,
      ...slotProps?.iconButton?.icon?.sx,
    };

    const buttonBadge = {
      ...buttonBadgePull,
      ...slotProps?.badge?.sx,
    };

    const iconButtonBadge = {
      ...iconButtonBadgePull,
      ...slotProps?.badge?.sx,
    };

    return { button, iconButton, buttonSvg, iconButtonSvg, buttonBadge, iconButtonBadge };
  }, [extendTheme, slotProps, sx]);

  const Icon = useMemo(() => {
    if (slotProps?.iconButton?.icon?.component) {
      return slotProps.iconButton.icon.component;
    }
    if (slotProps?.button?.icon?.component) {
      return slotProps.button.icon.component;
    }
    if (filterCount < 1) {
      return FilterAltTwoTone;
    }
    return FilterAlt;
  }, [
    filterCount,
    slotProps?.button?.icon?.component,
    slotProps?.iconButton?.icon?.component,
  ]);

  const badgeOverlap = variant === 'icon' ? 'circular' : 'rectangular';
  return (
    <Badge
      badgeContent={filterCount}
      color="error"
      variant="dot"
      overlap={badgeOverlap}
      sx={{
        ...(variant === 'icon' ? layout.iconButtonBadge : layout.buttonBadge),
      }}
    >
      {variant === 'icon' ? (
        <IconButton
          data-testid={testId}
          aria-label={ariaLabel}
          onClick={onClick}
          disabled={disabled}
          size={buttonSize}
          sx={{
            ...layout.iconButton,
          }}
          {...slotProps?.iconButton?.props}
        >
          <SvgIcon
            data-testid={`${testId}__Icon`}
            component={Icon}
            fontSize={iconSize}
            sx={{
              ...layout.iconButtonSvg,
            }}
          />
        </IconButton>
      ) : (
        <Button
          data-testid={testId}
          aria-label={ariaLabel}
          onClick={onClick}
          disabled={disabled}
          size={buttonSize}
          sx={{
            ...layout.button,
          }}
          startIcon={
            <SvgIcon
              data-testid={`${testId}__Icon`}
              component={Icon}
              fontSize={iconSize}
              sx={{
                ...layout.buttonSvg,
              }}
            />
          }
        >
          Filters
        </Button>
      )}
    </Badge>
  );
};
