import { useSoundEffect } from '@Audio/AudioManager';
import { SideControlPanel } from '@Common/Components/Collapse/SideControlPanel';
import {
  archetypeLoopButtons,
  contractArchetypes,
} from '@Common/Definitions/Contracts/ContractArchetypes';
import { AddCircle, KeyboardDoubleArrowRight, Search } from '@mui/icons-material';
import { Box, Button, Grow, IconButton, Slide, Tooltip } from '@mui/material';
import { POPUP_CREATE_CONTRACT } from '@Popups/Contracts/CreateContract/CreateContract';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { ContractLedgerLoopButton } from './ContractLedgerLoopButton';

type LedgerSidePanelProps = {
  openMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LedgerSidePanel: React.FC<LedgerSidePanelProps> = ({ openMobileSearch }) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  const { playSound } = useSoundEffect();
  const { searchParams, setFilters } = useURLQuery();
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const tablet = useIsTablet();

  const handleDrawerOpen = React.useCallback(() => {
    setExpanded((prev) => {
      if (prev) {
        playSound('close');
      } else {
        playSound('open');
      }
      return !prev;
    });
  }, [setExpanded, playSound]);

  const handleMobileSearchOpen = React.useCallback(() => {
    openMobileSearch((prev) => !prev);
  }, [openMobileSearch]);

  // TODO
  // const handleArchetypeChange = React.useCallback(
  //   (value: string) => {
  //     const currentFilterValues = searchParams.getAll(QueryNames.Archetype);
  //     playSound('clickMain');
  //     setFilters(
  //       QueryNames.Archetype,
  //       currentFilterValues.includes(value)
  //         ? currentFilterValues.filter((archetype) => archetype !== value)
  //         : [...currentFilterValues, value],
  //     );
  //   },
  //   [playSound, setFilters, searchParams],
  // );

  const openCreateContract = React.useCallback(() => {
    playSound('open');
    dispatch(openPopup(POPUP_CREATE_CONTRACT));
  }, [dispatch, playSound]);
  return (
    <SideControlPanel
      data-testid="ContractLedger__SidePanel"
      collapsedSize="50px"
      in={isExpanded}
      orientation="horizontal"
      sx={{
        height: '100%',
        width: isExpanded ? '600px' : '30px',
        mr: '1em',
      }}
    >
      {!mobile && !tablet && (
        <IconButton
          data-testid="ContractLedger-SidePanel__Expand_ToggleButton"
          onClick={handleDrawerOpen}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: `rotate(${isExpanded ? '180deg' : '0'})`,
            transition: 'transform 0.3s',
          }}
        >
          <KeyboardDoubleArrowRight fontSize="large" />
        </IconButton>
      )}
      <Box
        data-testid="ContractLedger-SidePanel__Buttons_Wrapper"
        marginTop={{ xs: '.5em', sm: '.5em', md: '2em', lg: '3em' }}
      >
        <Slide
          data-testid="ContractLedger-SidePanel__CollapsedButtons_Slide"
          direction="right"
          in={!isExpanded}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 800, exit: 300 }}
        >
          <Box>
            {mobile ||
              (tablet && (
                <IconButton
                  data-testid="ContractLedger-SidePanel-CollapsedButtons__MobileSearchToggle_Button"
                  size="small"
                  onClick={handleMobileSearchOpen}
                >
                  <Search fontSize="large" />
                </IconButton>
              ))}
            <Tooltip
              title="Create Contract"
              placement="right"
              disableInteractive
              enterDelay={500}
              enterNextDelay={2000}
              leaveDelay={300}
            >
              <IconButton
                data-testid="ContractLedger-SidePanel-CollapsedButtons__CreateContract_Button"
                onClick={openCreateContract}
                size="small"
              >
                <AddCircle fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Slide>
        <Grow
          data-testid="ContractLedger-ColumnOne__QuickNav_Grow"
          in={isExpanded}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 3500, exit: 300 }}
        >
          <Box
            data-testid="ContractLedger-ColumnOne__QuickNavWrapper"
            sx={{
              ml: '20%',
            }}
          >
            <Button
              onClick={openCreateContract}
              data-testid="CreateContract"
              size="small"
              color="secondary"
              variant="contained"
              sx={{ fontSize: '.7em', fontWeight: 'bold', mr: '.5em' }}
            >
              Create Contract
            </Button>
          </Box>
        </Grow>
      </Box>
      <Box
        data-testid="ContractLedger-ColumnOne__ArchetypeButtonWrapper"
        sx={{
          width: '100%',
          mr: isExpanded ? '.5em' : '',
          ml: isExpanded ? '.5em' : '',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Slide
          data-testid="ContractLedger-ColumnOne__ArchetypeButton_Slide"
          in={!isExpanded}
          mountOnEnter
          unmountOnExit
          direction="right"
          timeout={{ enter: 800, exit: 300 }}
        >
          <Box>
            {contractArchetypes.map((archetype) => (
              <Tooltip
                key={archetype.archetype}
                title={archetype.archetype}
                placement="right"
                disableInteractive
                enterDelay={300}
              >
                <IconButton>
                  {React.cloneElement(archetype.archetypeIcon, {
                    fontSize: 'large',
                    color: 'inherit',
                  })}
                </IconButton>
              </Tooltip>
            ))}
            {/* {contractArchetypes.map((archetype) => {
              <Tooltip
                key={archetype.archetype}
                title={archetype.archetype}
                placement="right"
                disableInteractive
                enterDelay={300}
              >
                <IconButton
                  data-testid={`ContractLedger-ColumnOne-ArchetypeButton__${archetype.archetype}_Button`}
                  onClick={() => handleArchetypeChange(archetype.archetype)}
                  sx={{
                    color: currentFilterValues.includes(archetype.archetype)
                      ? 'secondary.main'
                      : 'primary.light',
                  }}
                ></IconButton>
              </Tooltip>;
            })} */}
          </Box>
        </Slide>
        <Box
          data-testid="ContractLedger-SidePanel__Buttons_Wrapper"
          marginTop={{ xs: '.5em', sm: '.5em', md: '2em', lg: '3em' }}
        >
          <Grow
            data-testid="ContractLedger-ColumnOne__ArchetypeButton_Grow"
            in={isExpanded}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 3500, exit: 300 }}
          >
            <Box>
              {archetypeLoopButtons.map((button) => (
                <Box
                  key={button.title}
                  sx={{
                    mb: '1',
                    mr: '1em',
                  }}
                >
                  <ContractLedgerLoopButton
                    title={button.title}
                    videoSource={button.videoSource}
                    value={button.value}
                  />
                </Box>
              ))}
            </Box>
          </Grow>
        </Box>
      </Box>
    </SideControlPanel>
  );
};
