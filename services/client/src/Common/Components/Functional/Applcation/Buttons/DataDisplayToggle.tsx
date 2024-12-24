import { useSoundEffect } from '@Audio/AudioManager';
import type { SvgIconComponent } from '@mui/icons-material';
import { type SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useCallback } from 'react';

type DataDisplayToggleProps = {
  view: 0 | 1;
  onChange: (_e: React.MouseEvent<HTMLElement>, value: 0 | 1) => void;
  'data-testid'?: string;
  'aria-label'?: string;
  disabled?: boolean | 0 | 1;
  sx?: SxProps<Theme>;
  slotProps?: {
    root?: {
      size?: 'small' | 'medium' | 'large';
    };
    cardView?: {
      icon?: SvgIconComponent;
    };
    tableView?: {
      icon?: SvgIconComponent;
    };
    toggleButton?: {
      sx?: SxProps<Theme>;
      size?: 'small' | 'medium' | 'large';
    };
  };
};

/**
 * Reusable ToggleButtonGroup for changing the View of presented Data Between Cards or Table
 * ___
 * TODO:
 * - Hook into new Local DB setup with LocalSettings allowing the user to switch their Views Dynamically.
 * - Upon Dynamic Setup, move to SearchTools Container
 */
export const DataDisplayToggle: React.FC<DataDisplayToggleProps> = ({
  view,
  onChange,
  'data-testid': testid = 'DataView__ToggleGroup',
  'aria-label':
    ariaLabel = 'Toggle Button to Switch Display of Information between Card or Table',
  sx,
  slotProps,
}) => {
  const extendTheme = useDynamicTheme();
  const sound = useSoundEffect();

  const handleClick = useCallback(() => {

  }, []);
  return (
    <ToggleButtonGroup value={view} onChange={onChange} exclusive>
      <ToggleButton value={0}>Card</ToggleButton>
      <ToggleButton value={1}>Table</ToggleButton>
    </ToggleButtonGroup>
  );
};
