//CLFilterDropdown is a reusable DropDown for displaying filters in the Contract Ledger Table Tools Component.
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { ClearAllButton } from '@Common/Components/Buttons/ClearAllButton';
import { ArrowRight } from '@mui/icons-material';
import { Badge, Box, Chip, Collapse, Typography } from '@mui/material';
import { LocationsFilter } from '@Utils/Filters/LocationsFilter';
import { RatingsFilter } from '@Utils/Filters/RatingsFilter';
import { SchedulingDropdownFilter } from '@Utils/Filters/ScheduleFilter';
import { SubTypeFilter } from '@Utils/Filters/SubtypeFilter';
import { UECFilter } from '@Utils/Filters/UECFilter';
import { QueryNames } from '@Utils/QueryNames';
import React, { useCallback } from 'react';

import { useSoundEffect } from '@/AudioManager';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type DropdownFilterProps = {
  filter: 'Subtype' | 'Pay' | 'Locations' | 'Scheduling' | 'Ratings';
  label: string;
  isExpanded: boolean;
  onExpand: () => void;
};

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  filter,
  label,
  isExpanded,
  onExpand,
}) => {
  const { playSound } = useSoundEffect();
  const [filters, setFilters] = useURLQuery();

  const setDisabled = () => {
    if (filter === 'Locations') {
      return true;
    }
    return false;
  };

  const isDisabled = setDisabled();

  //FilterSwitches
  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'Subtype':
        return <SubTypeFilter size="small" />;
      case 'Locations':
        return <LocationsFilter size="medium" />;
      case 'Scheduling':
        return <SchedulingDropdownFilter />;
      case 'Ratings':
        return <RatingsFilter />;
      case 'Pay':
        return <UECFilter />;
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
      case 'Scheduling':
        return (
          filters.has(QueryNames.BidBefore) ||
          filters.has(QueryNames.BidAfter) ||
          filters.has(QueryNames.StartBefore) ||
          filters.has(QueryNames.StartAfter) ||
          filters.has(QueryNames.EndBefore) ||
          filters.has(QueryNames.EndAfter) ||
          filters.has(QueryNames.Duration)
        );
      case 'Ratings':
        return (
          filters.has(QueryNames.EmployerRating) ||
          filters.has(QueryNames.ContractorRating)
        );
      case 'Pay':
        return (
          filters.has(QueryNames.UECRangeMax) ||
          filters.has(QueryNames.UECRangeMin) ||
          filters.has(QueryNames.PayStructure)
        );
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
      const filterToUpdate = QueryNames[filter as keyof typeof QueryNames];
      const updatedFilters = filters
        .getAll(valueToDelete)
        .filter((value) => value !== valueToDelete);
      setFilters(filterToUpdate, updatedFilters);
    },
    [filters, setFilters, filter, playSound],
  );

  const getFilterToClear = React.useCallback(
    (filter: string): QueryNames[] => {
      switch (filter) {
        case 'Subtype':
          return [QueryNames.Subtype];
        case 'Locations':
          return [QueryNames.Locations];
        case 'Scheduling':
          return [
            QueryNames.BidAfter,
            QueryNames.BidBefore,
            QueryNames.EndAfter,
            QueryNames.EndBefore,
            QueryNames.StartAfter,
            QueryNames.StartBefore,
          ];
        case 'Ratings':
          return [QueryNames.EmployerRating, QueryNames.ContractorRating];
        case 'Pay':
          return [
            QueryNames.UECRangeMin,
            QueryNames.UECRangeMax,
            QueryNames.PayStructure,
          ];
        default:
          return [];
      }
    },
    [filter],
  );

  const handleClearAll = React.useCallback(() => {
    const filtersToClear = getFilterToClear(filter);
    filtersToClear.forEach((filterToUpdate) => {
      setFilters(filterToUpdate, []);
    });
    playSound('toggleOff');
  }, [setFilters, filter, playSound]);

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
            onClick={onExpand}
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                height: '100%',
              }}
            >
              <ClearAllButton onClear={handleClearAll} />
              {QueryNames[filter as unknown as keyof typeof QueryNames] ===
                QueryNames.Subtype && (
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
            </Box>
          </DigiBox>
        </Box>
      </Collapse>
    </Box>
  );
};
