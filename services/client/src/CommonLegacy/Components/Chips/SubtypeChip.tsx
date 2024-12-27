import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ErrorTwoTone } from '@mui/icons-material';
import { Chip, SvgIcon, Tooltip } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

type SubtypeChipProps = {
  subtype: string;
  sx?: object;
  'data-testid'?: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  iconSize?: 'small' | 'medium' | 'large';
};

/**
 * @deprecated
 * ! Waiting for Refactoring of Other Uses
 */
export const SubtypeChip: React.FC<SubtypeChipProps> = (props) => {
  const {
    subtype,
    sx,
    'data-testid': testid = 'SubtypeChip',
    variant = 'outlined',
    size = 'small',
    color = 'secondary',
    iconSize = 'medium',
  } = props;
  //Defining Subtype Objects
  const dispatch = useAppDispatch();
  const archetypeObj = contractArchetypes.find((option) =>
    option.subtypes.some((subType) => subType.value === subtype),
  );

  const subtypeObj = archetypeObj?.subtypes.find((subType) => subType.value === subtype);

  // Handler to open Archetype Info Popup
  const handleArchetypeOpen = React.useCallback(() => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetypeObj?.archetype }));
  }, [dispatch, archetypeObj]);

  const ArchetypeIcon = archetypeObj?.archetypeIcon ?? ErrorTwoTone;
  return (
    <Tooltip title={subtypeObj?.label}>
      <Chip
        data-testid={`SubtypeChip__${testid}_root`}
        label={subtypeObj?.label}
        icon={<SvgIcon component={ArchetypeIcon} color={color} fontSize={iconSize} />}
        variant={variant}
        size={size}
        color={color}
        onClick={handleArchetypeOpen}
        sx={{ ...sx, maxWidth: '120px' }}
      />
    </Tooltip>
  );
};
