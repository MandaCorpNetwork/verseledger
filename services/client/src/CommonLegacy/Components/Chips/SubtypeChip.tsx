import { contractArchetypes } from '@CommonLegacy/Definitions/Structures/Contracts/ContractArchetypes';
import { ErrorTwoTone } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

type SubtypeChipProps = {
  subtype: string;
  sx?: object;
  ['data-testid']?: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  iconSize?: 'small' | 'medium' | 'large';
};

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
    option.subTypes.some((subType) => subType.value === subtype),
  );

  const subtypeObj = archetypeObj?.subTypes.find((subType) => subType.value === subtype);

  // Handler to open Archetype Info Popup
  const handleArchetypeOpen = React.useCallback(() => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetypeObj?.archetype }));
  }, [dispatch, archetypeObj]);

  const iconElement = archetypeObj ? (
    React.cloneElement(archetypeObj.archetypeIcon, {
      fontSize: iconSize,
      color: color,
    })
  ) : (
    <ErrorTwoTone color="error" fontSize={iconSize} />
  );
  return (
    <Tooltip title={subtypeObj?.label}>
      <Chip
        data-testid={`SubtypeChip__${testid}_root`}
        label={subtypeObj?.label}
        icon={iconElement}
        variant={variant}
        size={size}
        color={color}
        onClick={handleArchetypeOpen}
        sx={{ ...sx, maxWidth: '120px' }}
      />
    </Tooltip>
  );
};
