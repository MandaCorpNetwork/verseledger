import { useSoundEffect } from '@Audio/AudioManager';
import { DropdownButton } from '@Common/Components/Functional/Applcation/Buttons/DropdownButton';
import { FilterButton } from '@Common/Components/Functional/Applcation/Buttons/FilterButton';
import { SearchBar } from '@Common/Components/Functional/Applcation/Inputs/SearchBar';
import { SortSelect } from '@Common/Components/Functional/Applcation/Inputs/SortSelect';
import { FilterMenu } from '@Common/Components/Functional/Applcation/Menus/Filters/FilterMenu';
import type { SearchFilter } from '@Common/Definitions/Search/Filters';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Badge, Box, Collapse, Tooltip, useTheme } from '@mui/material';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import { usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';

/**
 * ### Contract Manager Search Tools
 * @description Modular Search Tool Component for the Contract Manager App.
 */
export const SearchTools: React.FC = () => {
  // LOCAL STATES
  /** State determines if the SearchTools are rendered */
  const [searchToolsOpen, setSearchToolsOpen] = React.useState<boolean>(false);
  /** Ref for The Filter Menu */
  const filterMenuAnchor = React.useRef<HTMLDivElement>(null);

  // HOOKS
  const theme = useTheme();
  const filterUtils = useFilterUtils();
  const sound = useSoundEffect();

  /** Handles the clickEvent that displays the SearchTools */
  const toggleSearchTools = React.useCallback(() => {
    setSearchToolsOpen(!searchToolsOpen);
  }, [searchToolsOpen]);

  /** Define the FilterMenu State */
  const filterOpenState = usePopupState({ variant: 'popover', popupId: 'filterMenu' });

  /** Handles the clickEvent that displays the {@link FilterList} */
  const toggleFilterList = React.useCallback(() => {
    sound.playSound('clickMain');
    if (filterOpenState.isOpen) {
      filterOpenState.close();
    } else {
      filterOpenState.open();
    }
  }, [filterOpenState, sound]);

  /** Disables the MuiCollapse if Animation Settings are Low or None */
  const disableCollapse =
    theme.animations === 'low' || theme.animations === 'none' ? true : searchToolsOpen;

  /** Defines Filters for Filter List */
  const filterList = [
    'ContractType',
    'ContractLocations',
    'ContractSchedule',
    'ContractPay',
    'ContractRating',
  ] as SearchFilter[];

  /** Uses filterCount Function from FilterUtils */
  const filterCount = filterUtils.dynamicFilterCount([
    QueryNames.Locations,
    QueryNames.UECRangeMax,
    QueryNames.UECRangeMin,
    QueryNames.EmployerRating,
    QueryNames.ContractorRating,
    QueryNames.BidAfter,
    QueryNames.BidBefore,
    QueryNames.StartBefore,
    QueryNames.StartBefore,
    QueryNames.EndAfter,
    QueryNames.EndBefore,
    QueryNames.Duration,
    QueryNames.PayStructure,
    QueryNames.ContractArchetype,
    QueryNames.ContractSubtype,
    QueryNames.SortBy,
    QueryNames.SearchQuery,
    QueryNames.Status,
  ]);

  return (
    <Box
      component="search"
      aria-label="Contract Manager Search Tools Dropdown"
      id="SearchToolsContainer"
      data-testid="ContractManager-ContractList__SearchToolsContainer"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        mt: '.5em',
        position: 'relative',
        minHeight: '40px',
      }}
    >
      <Collapse
        data-testid="ContractManager-ContractList-SearchTools__TransformationWrapper"
        in={disableCollapse}
        timeout={theme.transitions.duration.shorter}
        unmountOnExit
        mountOnEnter
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          data-testid="ContractManager-ContractList-SearchTools__SearchToolsWrapper"
          ref={filterMenuAnchor}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '1em',
            flexGrow: 1,
            position: 'relative',
          }}
        >
          <FilterButton
            data-testid="ContractManager-ContractList-SearchTools__FilterMenu_Button"
            onClick={toggleFilterList}
            filterCount={filterCount}
          />
          <FilterMenu
            data-testid="ContractManager-ContractList-SearchTools-FilterMenu"
            popupState={filterOpenState}
            anchorEl={filterMenuAnchor}
            filterKeys={filterList}
          />
          <SortSelect optionsKey="contracts" />
          <SearchBar label="Search Contracts" placeholder="Title, Users, Ships..." />
        </div>
      </Collapse>
      <Tooltip arrow title="Search Tools" placement="right">
        <Box
          data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionWrapper"
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <Badge
            badgeContent={filterCount}
            color="error"
            variant="dot"
            overlap="circular"
          >
            <DropdownButton
              data-testid="ContractManager-ContractBrowser-SearchTools__Expand"
              aria-label="Expand Button for Search Tools Bar"
              open={searchToolsOpen}
              onClick={toggleSearchTools}
              variant="outline"
              size={theme.breakpoints.down('sm') ? 'large' : 'medium'}
            />
          </Badge>
        </Box>
      </Tooltip>
    </Box>
  );
};
