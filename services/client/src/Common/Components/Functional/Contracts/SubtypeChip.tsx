import { contractSubtypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Chip, SvgIcon, type SxProps, Tooltip } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import type { IContractSubType } from 'vl-shared/src/schemas/contracts/ContractSubTypeSchema';

type ChipProps = {
  value: IContractSubType;
  'data-testid'?: string;
  'aria-label'?: string;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  slotProps?: {
    icon?: {
      sx?: SxProps<Theme>;
    };
  };
};

/**
 * Reusable Contract Subtype Chip. Clickable to pull up the Contract Archetype Information Popup.
 */
export const SubtypeChip: React.FC<ChipProps> = (props) => {
  const {
    value,
    'data-testid': testId = 'SubtypeChip',
    'aria-label':
      ariaLabel = 'Clickable Contract Subtype Chip that displays more Information',
    size = 'small',
    sx,
    color,
    slotProps,
  } = props;

  const dispatch = useAppDispatch();
  const extendTheme = useDynamicTheme();

  const subtype = contractSubtypes[value];

  const Icon = useMemo(() => subtype.icon, [subtype]);

  const handleArchetypeOpen = useCallback(() => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: subtype.archetype }));
  }, [dispatch, subtype.archetype]);

  const layout = useMemo(() => {
    const chip = extendTheme.layout('Chips.ContractSubtypeChip');
    const icon = extendTheme.layout('Chips.ContractSubtypeIcon');

    const chipOverwrite = {
      ...chip,
      ...sx,
    };
    const iconOverwrite = {
      ...icon,
      ...slotProps?.icon?.sx,
    };
    return { chipOverwrite, iconOverwrite };
  }, [extendTheme, slotProps?.icon?.sx, sx]);

  return (
    <Tooltip data-testid={`${testId}__Tooltip`} title={subtype.label}>
      <Chip
        data-testid={testId}
        aria-label={ariaLabel}
        icon={
          <SvgIcon
            component={Icon}
            color={color}
            sx={{
              ...layout.iconOverwrite,
            }}
          />
        }
        size={size}
        color={color}
        onClick={handleArchetypeOpen}
        sx={{
          maxWidth: '120px',
          ...layout.chipOverwrite,
        }}
      />
    </Tooltip>
  );
};
