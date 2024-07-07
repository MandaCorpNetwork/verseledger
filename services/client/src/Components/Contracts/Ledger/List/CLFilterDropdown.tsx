//CLFilterDropdown is a reusable DropDown for displaying filters in the Contract Ledger Table Tools Component.
import { ArrowRight } from '@mui/icons-material';
import { Badge, Box, Chip, Collapse, Typography } from '@mui/material';
import { AccessTimeDropdownFilter } from '@Utils/Filters/AccessTimeDropdownFilter';
import { EmployerRatingSliderFilter } from '@Utils/Filters/EmployerRatingSliderFilter';
import { LocationsFilter } from '@Utils/Filters/LocationsFilter';
import { SubTypeFilter } from '@Utils/Filters/SubtypeFilter';
import { UECRangeFilter } from '@Utils/Filters/UECRangeFilter';
import { QueryNames } from '@Utils/QueryNames';
import React, { useCallback } from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type CLFilterDropdownProps = {
  filter: 'Subtype' | 'PayRange' | 'Locations' | 'TimeRemaining' | 'EmployerRating';
  label: string;
};

export const CLFilterDropdown: React.FC<CLFilterDropdownProps> = ({ filter, label }) => {
  const [filters, setFilters] = useURLQuery();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  //FilterSwitches
  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'Subtype':
        return <SubTypeFilter size="small" />;
      case 'Locations':
        return <LocationsFilter size="medium" />;
      case 'TimeRemaining':
        return <AccessTimeDropdownFilter />;
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

  const handleDeleteFilter = useCallback((valueToDelete: string) => {
    const filterToUpdate = QueryNames[filter as unknown as keyof typeof QueryNames];
    const updatedFilters = filters
      .getAll(filterToUpdate)
      .filter((value) => value !== valueToDelete);
    setFilters(filterToUpdate, updatedFilters);
  }, []);

  return (
    <Box
      data-testid={`ContractLedgerFilters__${filter}Container`}
      sx={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
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
              color: isExpanded ? 'secondary.main' : 'text.secondary',
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            {label}
          </Typography>
        </Badge>
        <ArrowRight
          color={isExpanded ? 'secondary' : 'inherit'}
          sx={{
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 150ms',
          }}
        />
      </Box>
      <Collapse
        data-testid={`ContractLedgerFilters-${filter}__FilterCollapse`}
        in={isExpanded}
      >
        <Box
          data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__CollapseWrapper`}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            p: '1em',
          }}
        >
          <Box
            data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__FilterComponentWrapper`}
            sx={{
              width: '35%',
              mr: '10%',
            }}
          >
            {filterComponent}
          </Box>
          {QueryNames[filter as unknown as keyof typeof QueryNames] !==
            QueryNames.EmployerRating &&
            filter !== 'PayRange' && (
              <Box
                data-testid={`ContractLedgerFilters-${filter}-FilterCollapse__FilterListWrapper`}
                sx={{
                  display: 'flex',
                  flexDitection: 'row',
                  width: '250px',
                  flexWrap: 'wrap',
                  borderTop: '2px solid',
                  borderBottom: '2px solid',
                  borderColor: 'text.secondary',
                  borderRadius: '5px',
                  padding: '.5em',
                  justifyContent: !isFiltersSet ? 'center' : '',
                  alignItems: !isFiltersSet ? 'center' : '',
                }}
              >
                {!isFiltersSet ? (
                  <Typography variant="body2">No Filters Set</Typography>
                ) : (
                  filterValues.map((value, index) => (
                    <Chip
                      key={index}
                      label={value && value.charAt(0).toUpperCase() + value.slice(1)}
                      size={'small'}
                      variant="outlined"
                      color="secondary"
                      sx={{ m: '.2em' }}
                      onDelete={() => value && handleDeleteFilter(value)}
                    />
                  ))
                )}
              </Box>
            )}
        </Box>
      </Collapse>
    </Box>
  );
};
