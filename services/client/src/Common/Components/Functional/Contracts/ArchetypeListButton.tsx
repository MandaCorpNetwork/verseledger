import { ContractArchetypeTree } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ArrowDropDown, type SvgIconComponent } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  type SxProps,
  useTheme,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type ListButtonProps = {
  archetype: ContractArchetypeTree;
  'data-testid'?: string;
  'aria-label'?: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  count?: number;
  open?: boolean;
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
 * - Setup the Styles for PirateOS
 * - Add Translations
 * - Manage Formatted Text
 * - Extend Overwrite Props to the Dropdown Icon
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
  open,
}) => {
  const extendTheme = useDynamicTheme();
  const theme = useTheme();
  const { t } = useTranslation();

  const layout = useMemo(() => {
    const listButton = extendTheme.layout('Contracts.ArchetypeListButton');
    const listIcon = extendTheme.layout('Contracts.ArchetypeListIcon');
    const listText = extendTheme.layout('Contracts.ArchetypeListText');
    const dropIcon = extendTheme.layout('Contracts.ArchetypeListDropIcon');

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
    const dropIconOverwrite = {
      ...dropIcon,
      ...slotProps?.endIcon?.sx,
    };

    return {
      listButtonOverwrite,
      listIconOverwrite,
      listTextOverwrite,
      dropIconOverwrite,
    };
  }, [
    extendTheme,
    slotProps?.endIcon?.sx,
    slotProps?.itemIcon?.sx,
    slotProps?.itemText?.sx,
    sx,
  ]);

  const DropIcon = useMemo(() => {
    if (slotProps?.endIcon?.component) {
      return slotProps.endIcon.component;
    }
    return ArrowDropDown;
  }, [slotProps?.endIcon?.component]);

  const getCount = useCallback(() => {
    if (!count) return t('@CONTRACTS.NONE');
    const contractLabel = count > 1 ? '@CONTRACTS.PLURAL' : '@CONTRACTS.SINGLE';
    return `${count} ${t(contractLabel)}`;
  }, [count, t]);

  const countLabel = getCount();

  return (
    <ListItemButton
      data-testid={testId}
      aria-label={ariaLabel}
      id={testId}
      onClick={onClick}
      disabled={disabled}
      selected={open}
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
        primary={t(archetype.archetypeLabel)}
        secondary={countLabel}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1em',
          ...layout.listTextOverwrite,
        }}
        slotProps={{
          primary: {
            variant: 'h5',
          },
          secondary: {
            variant: 'caption',
            color: 'info',
            sx: {
              mb: '3px',
            },
          },
        }}
      />
      <SvgIcon
        data-testid={`${testId}__Dropdown_Icon`}
        component={DropIcon}
        sx={{
          transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
          ...((theme.animations === 'high' || theme.animations === 'medium') && {
            transition: 'transform 0.3s',
          }),
          ...layout.dropIconOverwrite,
        }}
      />
    </ListItemButton>
  );
};
