import { ContractArchetypeTree } from '@Common/Definitions/Contracts/ContractArchetypes';
import type { SvgIconComponent } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  type SxProps,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useMemo } from 'react';

type ListButtonProps = {
  archetype: ContractArchetypeTree;
  'data-testid'?: string;
  'aria-label'?: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  count?: number;
  slotProps?: {
    itemIcon?: {
      sx?: SxProps<Theme>;
    };
    itemText?: {
      sx?: SxProps<Theme>;
    };
    endIcon?: {
      sx?: SxProps<Theme>;
      component?: SvgIconComponent;
    };
  };
};

/**
 * ListItem Button for the Dropdown View of Contracts in the List Format.
 * ___
 * TODO:
 * - Fix Svg Icons being the wrong setup, try to simplify them
 */
export const ArchetypeListButton: React.FC<ListButtonProps> = ({
  archetype,
  'data-testid': testId = 'ContractList__ArchetypeButton',
  'aria-label': ariaLabel = 'Button to Expand List of Contracts Grouped by an Archetype',
  onClick,
  disabled,
  sx,
  count,
  slotProps,
}) => {
  const extendTheme = useDynamicTheme();

  const layout = useMemo(() => {
    const listButton = extendTheme.layout('Contracts.ArchetypeListButton');
    const listIcon = extendTheme.layout('Contracts.ArchetypeListIcon');
    const listText = extendTheme.layout('Contracts.ArchetypeListText');

    const listButtonOverwrite = {
      ...listButton,
      ...sx,
    };
    const listIconOverwrite = {
      ...listIcon,
      ...slotProps?.itemIcon?.sx,
    };
    const listTextOverwrite = {
      ...listText,
      ...slotProps?.itemText?.sx,
    };

    return { listButtonOverwrite, listIconOverwrite, listTextOverwrite };
  }, [extendTheme, slotProps?.itemIcon?.sx, slotProps?.itemText?.sx, sx]);

  return (
    <ListItemButton
      data-testid={testId}
      aria-label={ariaLabel}
      id={testId}
      onClick={onClick}
      disabled={disabled}
      sx={{
        ...layout.listButtonOverwrite,
      }}
    >
      <ListItemIcon
        data-testid={`${testId}__Icon_Wrapper`}
        aria-labelledby={testId}
        sx={{
          ...layout.listIconOverwrite,
        }}
      >
        <SvgIcon
          data-testid={`${testId}__Icon`}
          aria-labelledby={testId}
          component={archetype.archetypeIcon}
        />
      </ListItemIcon>
      <ListItemText
        data-testid={`${testId}__Label`}
        aria-labelledby={testId}
        primary={archetype.archetypeLabel}
      />
    </ListItemButton>
  );
};
