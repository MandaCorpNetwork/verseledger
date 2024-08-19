//CLFilterDropdown is a reusable DropDown for displaying filters in the Contract Ledger Table Tools Component.
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { ArrowRight } from '@mui/icons-material';
import { Badge, Box, Chip, Collapse, Typography } from '@mui/material';
import { SchedulingDropdownFilter } from '@Utils/Filters/AccessTimeDropdownFilter';
import { LocationsFilter } from '@Utils/Filters/LocationsFilter';
import { EmployerRatingSliderFilter } from '@Utils/Filters/MultiRatingSliderFilter';
import { SubTypeFilter } from '@Utils/Filters/SubtypeFilter';
import { UECRangeFilter } from '@Utils/Filters/UECRangeFilter';
import { QueryNames } from '@Utils/QueryNames';
import React, { useCallback } from 'react';

import { useSoundEffect } from '@/AudioManager';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type CLFilterDropdownProps = {
  filter: 'Subtype' | 'PayRange' | 'Locations' | 'Scheduling' | 'EmployerRating';
  label: string;
};

export const CLFilterDropdown: React.FC<CLFilterDropdownProps> = ({ filter, label }) => {
  const { playSound } = useSoundEffect();
  const [filters, setFilters] = useURLQuery();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const setDisabled = () => {
    if (filter === 'Locations' || filter === 'PayRange' || filter === 'EmployerRating') {
      return true;
    }
    return false;
  };

  const isDisabled = setDisabled();

  const handleExpand = () => {
    if (isDisabled) {
      playSound('denied');
      return;
    }
    playSound('clickMain');
    setIsExpanded(!isExpanded);
  };

  //FilterSwitches
  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'Subtype':
        return <SubTypeFilter size="small" />;
      case 'Locations':
        return <LocationsFilter size="medium" />;
      case 'Scheduling':
        return <SchedulingDropdownFilter />;
      case 'EmployerRating':
        return <EmployerRatingSliderFilter />;
      case 'PayRange':
        return <UECRangeFilter size="medium" innerSpace="dense" />;
    }
  };
  const filterComponent = getFilterComponent(filter);
  //Fetches the Filter Component for the Dropdown

  const getFilterCount = (filterName: string) => {
    switch (filterName) {
      case 'Subtype':
        return filters.has(QueryNames.Subtype);
      case 'Locations':
        return filters.has(QueryNames.Locations);
      case 'TimeRemaining':
        return filters.has(QueryNames.TimeRemaining);
      case 'EmployerRating':
        return filters.has(QueryNames.EmployerRating);
      case 'PayRange':
        return filters.has(QueryNames.UECRangeMax) || filters.has(QueryNames.UECRangeMin);
      default:
        return 0;
    }
  };
  // Fetches if filters set for a given filter

  const getFilterValues = (filterName: string) => {
    switch (filterName) {
      case 'Subtype':
        return filters.getAll(QueryNames.Subtype);
      case 'Locations':
        return filters.getAll(QueryNames.Locations);
      case 'TimeRemaining':
        return filters.getAll(QueryNames.TimeRemaining);
      case 'EmployerRating':
        return filters.getAll(QueryNames.EmployerRating);
      case 'PayRange':
        return [filters.get(QueryNames.UECRangeMin), filters.get(QueryNames.UECRangeMax)];
      default:
        return [];
    }
  };
  const filterValues = getFilterValues(filter);
  // Fetches the Values of the given Filter
  const isFiltersSet = getFilterCount(filter);
  // Identifies if there are filters selected

  const handleDeleteFilter = useCallback(
    (valueToDelete: string) => {
      const filterToUpdate = QueryNames[filter as unknown as keyof typeof QueryNames];
      const updatedFilters = filters
        .getAll(filterToUpdate)
        .filter((value) => value !== valueToDelete);
      setFilters(filterToUpdate, updatedFilters);
    },
    [filters, setFilters, filter],
  );

  return (
    <Box
      data-testid={`ContractLedgerFilters__${filter}Container`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        data-testid={`ContractLedgerFilters-${filter}__TitleWrapper`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          color: 'text.secondary',
        }}
      >
        <Badge
          invisible={!isFiltersSet}
          color="error"
          overlap="rectangular"
          variant="dot"
        >
          <Typography
            data-testid={`ContractLedgerFilters-${filter}__TitleDropDown`}
            variant="body1"
            onClick={handleExpand}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: isDisabled
                ? 'text.disabled'
                : isExpanded
                  ? 'secondary.main'
                  : 'text.secondary',
              cursor: 'pointer',
              fontWeight: 'bold',
              textShadow: '0 0 5px rgba(33,150,243,.3)',
              '&:hover': {
                color: isDisabled ? 'action.disabled' : 'text.primary',
                cursor: isDisabled ? 'default' : 'pointer',
                textShadow: '0 0 5px rgba(255,255,245,.6)',
              },
            }}
          >
            {label}
            <ArrowRight
              color={isExpanded ? 'secondary' : 'inherit'}
              sx={{
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms',
              }}
            />
          </Typography>
        </Badge>
      </Box>
      <Collapse
        data-testid={`ContractLedgerFilters-${filter}__FilterCollapse`}
        in={isExpanded}
        sx={{
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <DigiBox
            data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__CollapseWrapper`}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: '1em',
              m: '.5em',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '100%',
              flex: '0 1 auto',
              boxSizing: 'border-box',
              gap: '1em',
            }}
          >
            <Box
              data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__FilterComponentWrapper`}
              sx={{
                minWidth: '200px',
                flexShrink: 0,
              }}
            >
              {filterComponent}
            </Box>
            {QueryNames[filter as unknown as keyof typeof QueryNames] !==
              QueryNames.EmployerRating &&
              filter !== 'PayRange' && (
                <PopupFormDisplay
                  data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__FilterListWrapper`}
                  sx={{
                    display: 'flex',
                    flexDitection: 'row',
                    flexWrap: 'wrap',
                    padding: '.5em',
                    justifyContent: !isFiltersSet ? 'center' : '',
                    alignItems: !isFiltersSet ? 'center' : '',
                    minWidth: '150px',
                  }}
                >
                  {!isFiltersSet ? (
                    <Typography
                      variant="body2"
                      color="grey"
                      sx={{
                        textShadow: '0 0 5px rgba(0,0,0,.8)',
                      }}
                    >
                      No Filters Set
                    </Typography>
                  ) : (
                    filterValues.map((value, index) => (
                      <Chip
                        key={index}
                        label={value && value.charAt(0).toUpperCase() + value.slice(1)}
                        size={'small'}
                        variant="outlined"
                        color="secondary"
                        sx={{ m: '.2em' }}
                        onDelete={() => {
                          if (value) {
                            handleDeleteFilter(value);
                            playSound('toggleOff');
                          }
                        }}
                      />
                    ))
                  )}
                </PopupFormDisplay>
              )}
          </DigiBox>
        </Box>
      </Collapse>
    </Box>
  );
};
