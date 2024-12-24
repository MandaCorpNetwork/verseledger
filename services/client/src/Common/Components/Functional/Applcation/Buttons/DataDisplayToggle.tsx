import { useSoundEffect } from '@Audio/AudioManager';
import { type SvgIconComponent, TableChart, ViewStream } from '@mui/icons-material';
import {
  SvgIcon,
  type SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useCallback, useMemo } from 'react';

type DataDisplayToggleProps = {
  view: 0 | 1;
  onChange: (value: 0 | 1) => void;
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
 */
export const DataDisplayToggle: React.FC<DataDisplayToggleProps> = ({
  view,
  onChange,
  'data-testid': testid = 'DataView__ToggleGroup',
  'aria-label':
    ariaLabel = 'Toggle Button to Switch Display of Information between Card or Table',
  sx,
  slotProps,
  disabled,
}) => {
  /** Hooks */
  const extendTheme = useDynamicTheme();
  const sound = useSoundEffect();

  /** Click Handle Intercept for Playing Sound */
  const handleClick = useCallback(
    (_e: React.MouseEvent<HTMLElement>, value: 0 | 1) => {
      sound.playSound('clickMain');
      onChange(value);
    },
    [onChange, sound],
  );

  const CardIcon = useMemo(() => {
    if (slotProps?.cardView?.icon) {
      return slotProps.cardView.icon;
    }
    return ViewStream;
  }, [slotProps?.cardView?.icon]);

  const TableIcon = useMemo(() => {
    if (slotProps?.tableView?.icon) {
      return slotProps.tableView.icon;
    }
    return TableChart;
  }, [slotProps?.tableView?.icon]);

  /** Style Overwrites from Parent & Theme Settings */
  const layout = useMemo(() => {
    const buttonGroup = extendTheme.layout('Buttons.DataDisplayGroup');
    const toggleButton = extendTheme.layout('Buttons.DataDisplayToggleButton');
    const toggleIcon = extendTheme.layout('Buttons.DataDisplayToggleIcon');

    const buttonGroupOverwrite = {
      ...buttonGroup,
      ...sx,
    };
    const toggleButtonOverwrite = {
      ...toggleButton,
      ...slotProps?.toggleButton?.sx,
    };

    return { buttonGroupOverwrite, toggleButtonOverwrite, toggleIcon };
  }, [extendTheme, slotProps?.toggleButton?.sx, sx]);

  const groupSize = slotProps?.root?.size ?? 'small';
  const buttonSize = slotProps?.toggleButton?.size ?? 'small';

  return (
    <ToggleButtonGroup
      data-testid={testid}
      aria-label={ariaLabel}
      value={view}
      onChange={handleClick}
      exclusive
      disabled={disabled === true}
      sx={{ ...layout.buttonGroupOverwrite }}
      size={groupSize}
    >
      <Tooltip data-testid={`${testid}__CardView_Tooltip`} title="Card View" arrow>
        <ToggleButton
          data-testid={`${testid}-CardView__ToggleButton`}
          aria-label="Card View Toggle Button"
          value={0}
          size={buttonSize}
          disabled={disabled === 0}
          sx={{
            ...layout.toggleButtonOverwrite,
          }}
        >
          <SvgIcon component={CardIcon} sx={{ ...layout.toggleIcon }} />
        </ToggleButton>
      </Tooltip>
      <Tooltip data-testid={`${testid}__TableView_Tooltip`} title="Table View" arrow>
        <ToggleButton
          data-testid={`${testid}-TableView__ToggleButton`}
          aria-label="Table View Toggle Button"
          value={1}
          size={buttonSize}
          disabled={disabled === 1}
          sx={{
            ...layout.toggleButtonOverwrite,
          }}
        >
          <SvgIcon component={TableIcon} sx={{ ...layout.toggleIcon }} />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};
