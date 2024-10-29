import { contractArchetypes } from '@Common/Definitions/Structures/Contracts/ContractArchetypes';
import { ErrorTwoTone } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

type ArchetypeChipProps = {
  archetype: ContractArchetype;
  sx?: object;
  ['data-testid']?: string;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined';
  iconSize?: 'small' | 'medium' | 'large';
};

export const ArchetypeChip: React.FC<ArchetypeChipProps> = (props) => {
  const {
    archetype,
    sx,
    'data-testid': testid = 'Chip',
    size = 'small',
    color = 'secondary',
    variant = 'outlined',
    iconSize = 'medium',
  } = props;
  const dispatch = useAppDispatch();
  const archetypeObj = contractArchetypes.find(
    (option) => option.archetype === archetype,
  );

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
    <>
      <Chip
        data-testid={`ArchetypeChip__${testid}_Root`}
        label={archetype}
        icon={iconElement}
        size={size}
        variant={variant}
        color={color}
        onClick={handleArchetypeOpen}
        sx={{ ...sx }}
      />
    </>
  );
};
