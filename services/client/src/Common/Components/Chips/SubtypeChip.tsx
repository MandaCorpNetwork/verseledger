import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Chip } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

//Defining Subtype Objects
const options = contractArchetypes('primary.main');

type ArchetypeChipProps = {
  subtype: string;
};

export const SubtypeChip: React.FC<ArchetypeChipProps> = ({ subtype }) => {
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
        data-testid="ContractBid-ContractDetails-ContractType__SubtypeChip"
        label={subtype}
        icon={archetypeObj ? archetypeObj.archetypeIcon : undefined}
        variant="outlined"
        size="small"
        color="secondary"
        onClick={handleArchetypeOpen}
      />
    </>
  );
};
