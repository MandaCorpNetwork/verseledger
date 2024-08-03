import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Chip } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

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
  const options = contractArchetypes('primary.main', iconSize);
  const dispatch = useAppDispatch();
  const archetypeObj = options.find((option) =>
    option.subTypes.some((subType) => subType.label === subtype),
  );

  // Handler to open Archetype Info Popup
  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetypeObj?.archetype }));
  };
  return (
    <>
      <Chip
        data-testid={`SubtypeChip__${testid}_root`}
        label={subtype}
        icon={archetypeObj ? archetypeObj.archetypeIcon : undefined}
        variant={variant}
        size={size}
        color={color}
        onClick={handleArchetypeOpen}
        sx={{ ...sx }}
      />
    </>
  );
};
