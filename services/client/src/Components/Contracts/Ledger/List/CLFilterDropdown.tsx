//CLFilterDropdown is a reusable DropDown for displaying filters in the Contract Ledger Table Tools Component.
import { ArrowRight } from '@mui/icons-material';
import { Badge, Box, Chip, Collapse, Typography } from '@mui/material';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { AccessTimeDropdownFilter } from '@/Common/Filters/AccessTimeDropdownFilter';
import { EmployerRatingSliderFilter } from '@/Common/Filters/EmployerRatingSliderFilter';
import { LocationsFilter } from '@/Common/Filters/LocationsFilter';
import { SubTypeFilter } from '@/Common/Filters/SubTypeFilter';
import { UECRangeFilter } from '@/Common/Filters/UECRangeFilter';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type CLFilterDropdownProps = {
  filter: string;
  label: string;
};

export const CLFilterDropdown: React.FC<CLFilterDropdownProps> = ({ filter, label }) => {
  const [filters] = useURLQuery();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  //FilterSwitches
  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'SubType':
        return <SubTypeFilter size="medium" />;
      case 'Locations':
        return <LocationsFilter size="medium" />;
      case 'Time Remaining':
        return <AccessTimeDropdownFilter />;
      case 'Employer Rating':
        return <EmployerRatingSliderFilter />;
      case 'Pay Range':
        return <UECRangeFilter size="medium" innerSpace="dense" />;
    }
  };
  const filterComponent = getFilterComponent(filter);
  //Fetches the Filter Component for the Dropdown

  const getFilterCount = (filterName: string) => {
    switch (filterName) {
      case 'SubType':
        return filters.getAll(QueryNames.Subtype).length;
      case 'Locations':
        return filters.getAll(QueryNames.Locations).length;
      case 'Time Remaining':
        return filters.getAll(QueryNames.TimeRemaining).length;
      case 'Employer Rating':
        return filters.has(QueryNames.EmployerRating);
      case 'Pay Range':
        return (
          (filters.has(QueryNames.UECRangeMax) ? 1 : 0) +
          (filters.has(QueryNames.UECRangeMin) ? 1 : 0)
        );
      default:
        return 0;
    }
  };
  //Fetches the amount of filters set for a given filter

  const getFilterValues = (filterName: string) => {
    switch (filterName) {
      case 'SubType':
        return filters.getAll(QueryNames.Subtype);
      case 'Locations':
        return filters.getAll(QueryNames.Locations);
      case 'Time Remaining':
        return filters.getAll(QueryNames.TimeRemaining);
      case 'Employer Rating':
        return filters.getAll(QueryNames.EmployerRating);
      case 'Pay Range':
        return [filters.get(QueryNames.UECRangeMin), filters.get(QueryNames.UECRangeMax)];
      default:
        return [];
    }
  };
  const filterValues = getFilterValues(filter);
  //Fetches the Values of the given Filter
  const isFiltersSet = (filterValues.length = 0);
  //Identifies if there are filters selected

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
          badgeContent={getFilterCount(filter)}
          color="error"
          max={99}
          overlap="rectangular"
          showZero={false}
          variant={filter == 'EmployerRating' ? 'dot' : 'standard'}
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
          {filter !== 'Employer Rating' && filter !== 'Pay Range' && (
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
                    //onDelete={}
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
