import { useSoundEffect } from '@Audio/AudioManager';
import { SideControlPanel } from '@Common/Components/Collapse/SideControlPanel';
import { DoubleArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { POPUP_CREATE_CONTRACT } from '@Popups/Contracts/CreateContract/CreateContract';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { CollapsedButtons } from './CollapsedButtons';
import { ExpandedButtons } from './ExpandedButtons';

//TODO: Fix Expanded View
type LedgerSidePanelProps = {
  openMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LedgerSidePanel: React.FC<LedgerSidePanelProps> = ({ openMobileSearch }) => {
  // For Attaching Sidebar to Far Left of the window.
  const [leftAdjust, setLeftAdjust] = React.useState<number>(0);
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  const adjustPostion = React.useCallback(() => {
    const sidePanel = document.querySelector('[data-testid="ContractLedger__SidePanel"]');
    if (sidePanel) {
      const rect = sidePanel?.getBoundingClientRect();
      const currentLeft = rect?.left;
      setLeftAdjust(-currentLeft);
    }
  }, []);

  React.useEffect(() => {
    adjustPostion();
    window.addEventListener('resize', adjustPostion);
    return () => {
      window.removeEventListener('resize', adjustPostion);
    };
  }, [adjustPostion]);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const { searchParams, setFilters } = useURLQuery();

  const handleDrawerOpen = React.useCallback(() => {
    setExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [setExpanded, sound]);

  const handleMobileSearchOpen = React.useCallback(() => {
    openMobileSearch((prev) => !prev);
  }, [openMobileSearch]);

  const handleArchetypeChange = React.useCallback(
    (value: ContractArchetype) => {
      const currentFilterValues = searchParams.getAll(QueryNames.Archetype);
      sound.playSound('clickMain');
      setFilters(
        QueryNames.Archetype,
        currentFilterValues.includes(value)
          ? currentFilterValues.filter((archetype) => archetype !== value)
          : [...currentFilterValues, value],
      );
    },
    [sound, setFilters, searchParams],
  );

  const currentArchetypeFilters = React.useMemo(() => {
    return searchParams.getAll(QueryNames.Archetype);
  }, [searchParams]);

  const openCreateContract = React.useCallback(() => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_CREATE_CONTRACT));
  }, [dispatch, sound]);

  // Determine the Top Padding to accomodate for the Expand Icon Button
  const expandComp = isMobile || isTablet ? '.5em' : '50px';

  return (
    <SideControlPanel
      data-testid="ContractLedger__SidePanel"
      collapsedSize="60px"
      in={isExpanded}
      orientation="horizontal"
      sx={{
        height: '100%',
        position: 'relative',
        left: leftAdjust,
        display: 'flex',
        flexDirection: 'column',
        pt: expandComp,
      }}
    >
      {!isMobile && !isTablet && (
        <IconButton
          data-testid="ContractLedger-SidePanel__Expand_ToggleButton"
          onClick={handleDrawerOpen}
          disabled
          sx={{
            position: 'absolute',
            top: 0,
            right: 5,
            transform: `rotate(${isExpanded ? '180deg' : '0'})`,
            transition: 'transform 0.3s',
          }}
        >
          <DoubleArrow fontSize="large" />
        </IconButton>
      )}
      <CollapsedButtons
        isExpanded={isExpanded}
        isMobile={isMobile}
        isTablet={isTablet}
        searchClick={handleMobileSearchOpen}
        setFilter={handleArchetypeChange}
        currentFilters={currentArchetypeFilters as ContractArchetype[]}
        openCreate={openCreateContract}
      />
      <ExpandedButtons
        isExpanded={isExpanded}
        setFilter={handleArchetypeChange}
        currentFilters={currentArchetypeFilters as ContractArchetype[]}
        openCreate={openCreateContract}
      />
    </SideControlPanel>
  );
};
