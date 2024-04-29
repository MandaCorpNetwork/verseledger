import { ArrowBackIosNew, FilterAlt } from '@mui/icons-material';
import { Badge, Box, Collapse, IconButton, Tooltip } from '@mui/material';
import React from 'react';

import { QueryNames } from '@/Common/definitions/QueryNames';
import { SearchBar } from '@/Common/Filters/SearchBar';
import { SortBySelect } from '@/Common/Filters/SortBySelect';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { ContractManagerFilterList } from './ContractManagerFiltersList';

export const ContractManagerSearchTools: React.FC = () => {
  const [searchToolsOpen, setSearchToolsOpen] = React.useState<boolean>(false);
  const [filtersListOpen, setFiltersListOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [filters] = useURLQuery();
  const toggleSearchTools = () => {
    setSearchToolsOpen(!searchToolsOpen);
  };

  const toggleFilterList = (event: React.MouseEvent<HTMLElement>) => {
    const target = anchorEl ? null : (event.currentTarget as HTMLButtonElement);
    setAnchorEl(target);
    setFiltersListOpen(!filtersListOpen);
  };

  const filterCount =
    filters.getAll(QueryNames.SubType).length +
    filters.getAll(QueryNames.Locations).length +
    (filters.has(QueryNames.UECRangeMax) ? 1 : 0) +
    (filters.has(QueryNames.UECRangeMin) ? 1 : 0);

  const isQueried =
    filters.has(QueryNames.SubType) ||
    filters.has(QueryNames.Locations) ||
    filters.has(QueryNames.UECRangeMax) ||
    filters.has(QueryNames.SortBy) ||
    filters.has(QueryNames.SearchQuery);

  const sortOptions = [
    {
      label: 'Pay',
      value: 'pay',
    },
    {
      label: 'Title',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
    },
    {
      label: 'Location',
      value: 'location',
    },
    {
      label: 'Time Left',
      value: 'timeleft',
    },
  ];

  return (
    <Box
      data-testid="ContractManager-ContractList__SearchToolsContainer"
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', mt: '.5em' }}
    >
      <Collapse
        data-testid="ContractManager-ContractList-SearchTools__TransformationWrapper"
        in={searchToolsOpen}
        timeout={200}
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          data-testid="ContractManager-ContractList-SearchTools__SearchToolsWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1em',
            flexGrow: 1,
          }}
        >
          <Badge
            badgeContent={filterCount}
            color="error"
            variant="dot"
            overlap="circular"
          >
            <IconButton
              data-testid="ContractManager-ContractList-SearchTools__FiltersButton"
              onClick={toggleFilterList}
            >
              <FilterAlt />
            </IconButton>
          </Badge>
          <ContractManagerFilterList isOpen={filtersListOpen} anchor={anchorEl} />
          <SortBySelect size="small" sortOptions={sortOptions} containerSize="small" />
          <SearchBar
            size="small"
            label="Search Contracts"
            placeholder="Title, Contractors, Ships..."
          />
        </Box>
      </Collapse>
      <Box
        data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionWrapper"
        sx={{ display: 'flex', ml: 'auto' }}
      >
        <Badge invisible={!isQueried} color="error" variant="dot" overlap="circular">
          <Tooltip arrow title="Search Tools">
            <IconButton
              data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionButton"
              onClick={toggleSearchTools}
              sx={{
                transform: !searchToolsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 200ms',
              }}
            >
              <ArrowBackIosNew fontSize="large" />
            </IconButton>
          </Tooltip>
        </Badge>
      </Box>
    </Box>
  );
};
