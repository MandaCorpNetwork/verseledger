import { useSoundEffect } from '@Audio/AudioManager';
import { ListSelectButton } from '@Common/Components/Core/Buttons/ListSelectButton';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Check } from '@mui/icons-material';
import { Autocomplete, Box, List, MenuItem, TextField, Typography } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { Logger } from '@Utils/Logger';
import React from 'react';

type ContractTypeFilterProps = {
  'data-testid'?: string;
};

/**
 * @description Filter Component for Contract Subtype & Contract Archetype
 * ___
 * TODO:
 * - Independent Handling of Subtype Selection
 */
export const ContractTypeFilter: React.FC<ContractTypeFilterProps> = ({
  'data-testid': testid = 'FilterMenu',
}) => {
  const filterUtils = useFilterUtils();
  const themeExtend = useDynamicTheme();
  const { searchParams, setFilters } = useURLQuery();
  const sound = useSoundEffect();

  // Define Options for Dropdown
  const subtypeOptions = filterUtils.contractSubtypeList;

  /** Layout Overrides */
  const layout = React.useMemo(() => {
    const archetypeList = themeExtend.layout('ContractTypeFilter.ArchetypeListWrapper');
    const archetypeSubheader = themeExtend.layout(
      'ContractTypeFilter.ArchtypeListSubheader',
    );
    const subtypeAutocomplete = themeExtend.layout(
      'ContractTypeFilter.SubtypeAutocomplete',
    );
    const subtypeMenuItem = themeExtend.layout('ContractTypeFilter.SubtypeMenuItem');
    const subtypeMenuCheck = themeExtend.layout('ContractTypeFilter.SubtypeMenuCheck');

    return {
      archetypeList,
      archetypeSubheader,
      subtypeAutocomplete,
      subtypeMenuCheck,
      subtypeMenuItem,
    };
  }, [themeExtend]);

  /** Saves SubtypeFilters as an array */
  const selectedSubtypeFilters = React.useMemo(() => {
    const filters = searchParams.getAll(QueryNames.ContractSubtype);
    return Array.isArray(filters) ? filters : [filters];
  }, [searchParams]);

  /** Saves the ArchetypeFilters as an Array */
  const selectedArchtypeFilters = React.useMemo(() => {
    const filters = searchParams.getAll(QueryNames.ContractArchetype);
    return Array.isArray(filters) ? filters : [filters];
  }, [searchParams]);

  /** Function to Determine if the Subtype is Selected based on both Filters */
  const isSubtypeSelected = React.useCallback(
    (value: string) => {
      if (selectedSubtypeFilters.includes(value)) return true;
      const group = subtypeOptions.optionsMap[value].group;
      if (selectedArchtypeFilters.includes(group)) return true;
      return false;
    },
    [selectedArchtypeFilters, selectedSubtypeFilters, subtypeOptions.optionsMap],
  );

  /** Function to Determine if the Archetype is Selected based on both Filters */
  const isArchetypeSelected = React.useCallback(
    (value: string) => {
      if (selectedArchtypeFilters.includes(value)) return true;
      const archetypeObj = contractArchetypes.find((a) => a.archetype === value);
      if (!archetypeObj) {
        Logger.warn('Contract Archetype Missing from List', value);
        return false;
      }
      const allSubtypesSelected = archetypeObj.subtypes.every((s) =>
        selectedSubtypeFilters.includes(s.value),
      );
      return allSubtypesSelected;
    },
    [selectedArchtypeFilters, selectedSubtypeFilters],
  );

  /** Handle Toggling Archetype Filters */
  const toggleArchetypeFilter = React.useCallback(
    (value: string) => {
      const isSelected = isArchetypeSelected(value);

      if (isSelected) {
        if (selectedArchtypeFilters.includes(value)) {
          /** Remove the Archetype Filter */
          sound.playSound('clickMain');
          const newFilters = selectedArchtypeFilters.filter((a) => a !== value);
          setFilters(QueryNames.ContractArchetype, newFilters);
        } else {
          /** Remove Related Subtypes */
          const archetypeObj = contractArchetypes.find((a) => a.archetype === value);
          if (!archetypeObj) {
            /** Throw Warning if the Archetype is not found in the Definition List */
            Logger.warn('Contract Archetype Missing from List', value);
            return sound.playSound('error');
          }
          sound.playSound('clickMain');
          const newFilters = selectedSubtypeFilters.filter(
            (subtype) => !archetypeObj.subtypes.some((s) => s.value === subtype),
          );
          setFilters(QueryNames.ContractSubtype, newFilters);
        }
      } else {
        /** Add the Archetype to the Selected Archetype Filters */
        sound.playSound('clickMain');
        const newFilters = [...selectedArchtypeFilters, value];
        setFilters(QueryNames.ContractArchetype, newFilters);
      }
    },
    [
      isArchetypeSelected,
      selectedArchtypeFilters,
      selectedSubtypeFilters,
      setFilters,
      sound,
    ],
  );

  /** Handle Toggling Subtype Filters */
  const toggleSubtypeFilters = React.useCallback(
    (_e: React.SyntheticEvent, newValue: string[]) => {
      sound.playSound('clickMain');
      setFilters(QueryNames.ContractSubtype, newValue);
    },
    [setFilters, sound],
  );

  /** Render all Archetype Selection Buttons */
  const renderArchetypeSelects = React.useCallback(() => {
    return contractArchetypes.map((archetype) => {
      const selected = isArchetypeSelected(archetype.archetype);
      return (
        <ListSelectButton
          key={archetype.archetype}
          selected={selected}
          onClick={() => toggleArchetypeFilter(archetype.archetype)}
        >
          {archetype.archetypeLabel}
        </ListSelectButton>
      );
    });
  }, [isArchetypeSelected, toggleArchetypeFilter]);

  return (
    <div
      aria-label="Contract Type Filter List Container"
      id="FilterGroup__ContractType"
      data-testid={`${testid}__ContractType_GroupWrapper`}
    >
      <List
        aria-labelledby="ArchetypeFilters-Subheader"
        id="ContractType-ArchetypeFilters"
        data-testid={`${testid}-ContractType__ArchetypeFilters_List`}
        dense
        subheader={
          <Typography
            aria-label="Contract Archetype Filter List"
            id="ArchetypeFilters-Subheader"
            data-testid={`${testid}-ContractType-ArchetypeFilters-List__Subheader`}
            variant="subtitle2"
            color="textSecondary"
            gutterBottom
            sx={{
              pl: '0.5em',
              ...layout.archetypeSubheader,
            }}
          >
            Contract Archetype
          </Typography>
        }
      >
        <Box
          aria-labelledby="ArchetypeFilters-Subheader"
          id="ContractType-ArhetypeFilters-ListWrapper"
          data-testid={`${testid}-ContractType-ArchetypeFilters-List__Wrapper`}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            overflow: 'hidden',
            flexWrap: 'wrap',
            gap: '0.5em',
            ...layout.archetypeList,
          }}
        >
          {renderArchetypeSelects()}
        </Box>
      </List>
      <Autocomplete
        aria-label="Contract Subtype Filter List"
        id="ContractType-SubtypeFilters"
        data-testid={`${testid}-ContractType__SubtypeFilters_List`}
        // renderTags={() => null}
        autoHighlight
        multiple
        freeSolo
        options={subtypeOptions.flatOptions}
        value={subtypeOptions.flatOptions.filter((i) => isSubtypeSelected(i))}
        onChange={toggleSubtypeFilters}
        groupBy={(option) => subtypeOptions.optionsMap[option].group}
        getOptionLabel={(option) => subtypeOptions.optionsMap[option].label}
        renderInput={(params) => <TextField {...params} label="Contract Subtypes" />}
        renderOption={(props, option, { selected }) => {
          return (
            <MenuItem
              {...props}
              sx={{ display: 'flex', gap: '1em', ...layout.subtypeMenuItem }}
            >
              {option}
              {selected && (
                <Check sx={{ color: 'secondary.main', ...layout.subtypeMenuCheck }} />
              )}
            </MenuItem>
          );
        }}
        sx={{
          mt: '0.5em',
          ...layout.subtypeAutocomplete,
        }}
      />
    </div>
  );
};
