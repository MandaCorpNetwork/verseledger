import { useSoundEffect } from '@Audio/AudioManager';
import { DropdownStack } from '@Common/Components/Core/Menus/DropdownStack';
import { CollapseWrapper } from '@Common/Components/Wrappers/CollapseWrapper';
import { filterComponents } from '@Common/Definitions/Search/FilterComponentsMap';
import { Popover, useTheme } from '@mui/material';
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
};

//TODO: Add Clickaway for the FilterMenu

export const FilterMenu: React.FC<FilterMenuProps> = ({
  popupState,
  filterKeys,
  anchorEl,
}) => {
  // Hooks
  const theme = useTheme();
  const sound = useSoundEffect();

  const close = React.useCallback(() => {
    sound.playSound('close');
    popupState.close();
  }, [popupState, sound]);

  const renderCollapse =
    ((theme.animations === 'medium' || theme.animations === 'high') &&
      theme.fidelity === 'high') ||
    (theme.fidelity === 'medium' && theme.animations === 'high');

  const filters = React.useMemo(() => {
    return filterKeys.map((filterKey) => filterComponents[filterKey]);
  }, [filterKeys]);

  const children = (
    <DropdownStack>
      <FilterList filterList={filters} />
    </DropdownStack>
  );

  return (
    <>
      {renderCollapse && (
        <CollapseWrapper
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
          {children}
        </CollapseWrapper>
      )}
      {!renderCollapse && (
        <Popover
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
