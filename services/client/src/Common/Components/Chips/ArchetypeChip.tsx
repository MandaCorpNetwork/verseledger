import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Chip } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

const options = contractArchetypes('secondary.main', 'inherit');

type ArchetypeChipProps = {
  archetype: string;
  sx?: object;
  ['data-testid']?: string;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined';
};

export const ArchetypeChip: React.FC<ArchetypeChipProps> = (props) => {
  const {
    archetype,
    sx,
    'data-testid': testid = 'Chip',
    size = 'small',
    color = 'secondary',
    variant = 'outlined',
  } = props;
  const dispatch = useAppDispatch();
  const archetypeObj = options.find((option) => option.archetype === archetype);

  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetypeObj?.archetype }));
  };
  return (
    <>
      <Chip
        data-testid={`ArchetypeChip__${testid}_Root`}
        label={archetype}
        icon={archetypeObj?.archetypeIcon}
        size={size}
        variant={variant}
        color={color}
        onClick={handleArchetypeOpen}
        sx={{ ...sx }}
      />
    </>
  );
};
