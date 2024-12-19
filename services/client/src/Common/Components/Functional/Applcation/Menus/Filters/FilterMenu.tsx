import { useSoundEffect } from '@Audio/AudioManager';
import { DropdownStack } from '@Common/Components/Core/Menus/DropdownStack';
import { CollapseWrapper } from '@Common/Components/Wrappers/CollapseWrapper';
import { filterComponents } from '@Common/Definitions/Search/FilterComponentsMap';
import { SearchFilter } from '@Common/Definitions/Search/Filters';
import { Button, ClickAwayListener, Popover, useTheme } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import type { PopupState } from 'material-ui-popup-state/hooks';
import React from 'react';

import { FilterList } from './FilterList';

type FilterMenuProps = {
  /** Identifies which Filter Dropdowns to Render */
  filterKeys: SearchFilter[];
  /** Binding for the Wrapping Component State */
  popupState: PopupState;
  /** Sets The Anchor Component for the Menu */
  anchorEl: React.RefObject<HTMLDivElement>;
  'data-testid'?: string;
  'aria-label'?: string;
};

/**
 * @description Dynamic Filter Menu for reuse through Application. Acts as a Wrapper for generated Filters for a specific usage. Requires a Popup state due to using either a Collapse or Menu Popover. Takes in FilterKeys to determine which filters to render in.
 * ___
 * TODO:
 * - Extend Styles to be overwritten individually by Props if need arises
 */
export const FilterMenu: React.FC<FilterMenuProps> = ({
  popupState,
  filterKeys,
  anchorEl,
  'data-testid': testId = 'Filter Menu',
  'aria-label': ariaLabel = 'Menu of Dropdowns for Groups of Filters',
}) => {
  // Hooks
  const theme = useTheme();
  const extendTheme = useDynamicTheme();
  const sound = useSoundEffect();
  const filterUtils = useFilterUtils();

  /** Layout Extension */
  const layout = React.useMemo(() => {
    const clearAllButton = extendTheme.layout('FilterMenu.ClearAllButton');
    return { clearAllButton };
  }, [extendTheme]);

  /** Handles Closing the Popup State internally */
  const close = React.useCallback(() => {
    sound.playSound('close');
    popupState.close();
  }, [popupState, sound]);

  /** Evaluation for Rendering the Collapse Wrapper based on User Settings */
  const renderCollapse =
    ((theme.animations === 'medium' || theme.animations === 'high') &&
      theme.fidelity === 'high') ||
    (theme.fidelity === 'medium' && theme.animations === 'high');

  /** Get the Filter Component Objects to be Passed to the Filter List Component
   * Filter List Component Handles the Individual Filter Rendering Logic
   */
  const filters = React.useMemo(() => {
    return filterKeys.map((filterKey) => filterComponents[filterKey]);
  }, [filterKeys]);

  /** Single Out the Queries being used by the Menu */
  const queries = React.useMemo(() => {
    return filterKeys.flatMap((filterKey) => filterComponents[filterKey].filters || []);
  }, [filterKeys]);

  /** Gets the Current Filter Count from the Queries being used  by the Menu*/
  const filterCount = filterUtils.dynamicFilterCount(queries);

  const children = (
    <DropdownStack
      aria-labelledby="FilterMenu"
      data-testid={testId}
      sx={{ maxHeight: '700px', overflow: 'auto' }}
    >
      <Button
        aria-label={`${ariaLabel} Clear All Filters Button`}
        data-testid={`${testId}__ClearAll_Button`}
        size="small"
        color="warning"
        disabled={filterCount === 0}
        onClick={() => filterUtils.clearFilters(queries)}
        sx={{
          my: '0.5em',
          ...layout.clearAllButton,
        }}
      >
        Clear All Filters
      </Button>
      <FilterList filterList={filters} />
    </DropdownStack>
  );

  return (
    <>
      {renderCollapse && (
        <CollapseWrapper
          data-testid={`${testId}__Transition`}
          in={popupState.isOpen}
          ref={anchorEl}
          unmountOnExit
          mountOnEnter
          timeout={theme.transitions.duration.short}
          sx={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            zIndex: 'tooltip',
            mt: '0.5em',
          }}
        >
          <ClickAwayListener onClickAway={close}>{children}</ClickAwayListener>
        </CollapseWrapper>
      )}
      {!renderCollapse && (
        <Popover
          data-testid={`${testId}__Transition`}
          open={popupState.isOpen}
          anchorEl={anchorEl.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          onClose={close}
          sx={{
            width: '100%',
            display: 'flex',
            mt: '0.5em',
          }}
          slotProps={{
            paper: {
              sx: {
                width: anchorEl.current?.parentElement?.offsetWidth ?? 'auto',
              },
            },
          }}
        >
          {children}
        </Popover>
      )}
    </>
  );
};
