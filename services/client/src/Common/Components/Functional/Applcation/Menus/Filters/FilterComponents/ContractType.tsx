import { ListSelectButton } from '@Common/Components/Core/Buttons/ListSelectButton';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import React from 'react';

export const ContractTypeFilter: React.FC = () => {
  const filterUtils = useFilterUtils();

  const subtypeOptions = filterUtils.contractSubtypeList;
  const renderArchetypeSelects = React.useCallback(() => {
    return contractArchetypes.map((archetype) => {
      return (
        <ListSelectButton key={archetype.archetype}>
          {archetype.archetypeLabel}
        </ListSelectButton>
      );
    });
  }, []);
  return (
    <Box>
      <Box>{renderArchetypeSelects()}</Box>
      <Box>
        <Autocomplete
          multiple
          freeSolo
          options={subtypeOptions.flatOptions}
          groupBy={(option) => subtypeOptions.optionsMap[option].group}
          getOptionLabel={(option) => subtypeOptions.optionsMap[option].label}
          renderInput={(params) => <TextField {...params} label="Subtype" />}
        />
      </Box>
    </Box>
  );
};
