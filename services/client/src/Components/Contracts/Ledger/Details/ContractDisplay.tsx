import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ExpandMore, Launch, Link } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { Logger } from '@Utils/Logger';
import { URLUtil } from '@Utils/URLUtil';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

import { ContractorsPanel } from './ActiveDataPanel';
import { BiddingTimePanel, ContractDurationPanel } from './TimePanel';

type ContractDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: IContract;
};

export const ContractDisplay: React.FC<ContractDisplayProps> = ({ contract }) => {
  const { playSound } = useSoundEffect();
  const dispatch = useAppDispatch();
  const scrollRef = useHorizontalAdvancedScroll();
  const navigate = useNavigate();

  Logger.info(`ContractDisplay ID: ${contract.id}`);

  const [briefingExpanded, setBriefingExpanded] = React.useState(true);
  const [payExpanded, setPayExpanded] = React.useState(true);
  const [locationsExpanded, setLocationsExpanded] = React.useState(true);
  const [activeDataTab, setActiveDataTab] = React.useState('contractors');
  const [timeTab, setTimeTab] = React.useState('bid');
  const [archetype, setArchetype] = React.useState<string | null>(null);

  const options = contractArchetypes('secondary.main', 'medium');

  React.useEffect(() => {
    const selectedArchetype = options.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract.subtype]);

  const handleArchetypeOpen = () => {
    playSound('open');
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetype }));
  };

  const handleActiveTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setActiveDataTab(value);
    },
    [activeDataTab],
  );

  const handleTimeTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setTimeTab(value);
    },
    [timeTab],
  );

  const toggleBriefingExpand = React.useCallback(() => {
    if (briefingExpanded) {
      playSound('toggleOff');
    } else {
      playSound('toggleOn');
    }
    setBriefingExpanded(!briefingExpanded);
  }, [briefingExpanded]);

  const togglePayExpand = React.useCallback(() => {
    if (payExpanded) {
      playSound('toggleOff');
    } else {
      playSound('toggleOn');
    }
    setPayExpanded(!payExpanded);
  }, [payExpanded]);

  const toggleLocationsExpand = React.useCallback(() => {
    if (locationsExpanded) {
      playSound('toggleOff');
    } else {
      playSound('toggleOn');
    }
    setLocationsExpanded(!locationsExpanded);
  }, [locationsExpanded]);

  const contractTimePanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'bid':
          return <BiddingTimePanel contract={contract} />;
        case 'start':
          return <ContractDurationPanel contract={contract} />;
        default:
          return;
      }
    },
    [timeTab, contract],
  );

  const activeDataPanel = React.useCallback(
    (panel: string) => {
      Logger.info(`Rendering ContractId: ${contract.id}`);
      switch (panel) {
        case 'contractors':
          return (
            <ContractorsPanel
              contractId={contract.id}
              contractorLimit={contract.contractorLimit}
            />
          );
        case 'ships':
          return;
        default:
          return;
      }
    },
    [activeDataTab, contract],
  );

  const handleSubmitBidPopup = () => {
    playSound('open');
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  };

  const getStartLocationId = () => {
    if (contract.Locations) {
      const startLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'start',
      )?.id;
      return startLocationPull || null;
    }
    return null;
  };

  const startLocationId = getStartLocationId();

  const getEndLocationId = () => {
    if (contract.Locations) {
      const endLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'end',
      )?.id;
      Logger.info(`EndLocation: ${endLocationPull}`);
      return endLocationPull || null;
    }
    return null;
  };

  const endLocationId = getEndLocationId();

  const getOtherLocationIds = () => {
    if (contract.Locations) {
      const otherLocationsPull = contract?.Locations?.filter(
        (location) => location.ContractLocation?.tag === 'other',
      );
      return otherLocationsPull.map((location) => location.id);
    }
    return [];
  };

  const otherLocationIds = getOtherLocationIds();

  const handleContractPageNav = (contractId: string) => {
    playSound('navigate');
    navigate(`/contract?contractID=${contractId}`);
  };

  const handleCopyURL = (url: string) => {
    const prefix = URLUtil.frontendHost;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`${prefix}${url}`)
        .then(() => {
          playSound('clickMain');
          enqueueSnackbar('Copied Contract to Clipboard', { variant: 'success' });
        })
        .catch((err) => {
          playSound('error');
          enqueueSnackbar(`Failed to Copy Contract: ${err}`, { variant: 'error' });
        });
    } else {
      playSound('denied');
      enqueueSnackbar('Clipboard API not supported', { variant: 'warning' });
    }
  };

  return (
    <Box
      data-testid="ContractDisplay__Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        p: '.5em',
        gap: '1em',
        justifyContent: 'space-between',
      }}
    >
      <DigiBox
        data-testid="ContractDisplay-Info__TitleBoxWrapper"
        sx={{ width: '100%', height: '20%', p: '.5em' }}
      >
        <Box
          data-testid="ContractDisplay-Info__TitleBarWrapper"
          sx={{ width: '100%', mb: 'auto', display: 'flex', flexDirection: 'row' }}
        >
          <DigiDisplay
            data-testid="ContractDisplay-Info__TitleBar"
            sx={{
              flexDirection: 'row',
              py: '.2em',
              px: '.5em',
              justifyContent: 'space-around',
              flexGrow: 1,
            }}
          >
            <Tooltip title={contract.title} arrow>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 'bold',
                  maxWidth: '80%',
                  color: 'text.primary',
                  textShadow: '0 0 2px #fff, 0 0 10px #000',
                  cursor: 'default',
                }}
              >
                {contract.title}
              </Typography>
            </Tooltip>
            <Box
              sx={{
                flexGrow: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 'auto',
              }}
            />
            <Tooltip title={archetype}>
              {options.find((option) => option.archetype === archetype)
                ?.archetypeIcon ?? (
                <Typography color="error" fontWeight="bold">
                  ???
                </Typography>
              )}
            </Tooltip>
          </DigiDisplay>
          <IconButton
            size="small"
            onClick={() => handleCopyURL(`/contract?contractID=${contract.id}`)}
          >
            <Link fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleContractPageNav(contract.id)}>
            <Launch fontSize="small" />
          </IconButton>
        </Box>
        <Box
          data-testid="ContractDisplay__DetailsContainer"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: '.5em',
            width: '100%',
            flexGrow: 1,
            justifyContent: 'space-around',
          }}
        >
          <DigiDisplay
            data-testid="ContractDisplay-Info-Details__StatusWrapper"
            sx={{ px: '1em', my: 'auto', py: '.5em' }}
          >
            <Typography
              data-testid="ContractDisplay-Info-Details__StatusTitle"
              align="center"
              variant="body1"
              sx={{ fontWeight: 'bold', mb: '.5em', cursor: 'default' }}
            >
              Status
            </Typography>
            <ContractStatusChip status={contract.status} />
          </DigiDisplay>
          <DigiDisplay
            data-testid="ContractDisplay-Info-Details__SubTypeWrapper"
            sx={{ my: 'auto', px: '1em', py: '.5em' }}
          >
            <Typography
              data-testid="ContractDisplay-Info-Details__SubTypeTitle"
              align="center"
              variant="body1"
              sx={{
                fontWeight: 'bold',
                mb: '.5em',
                cursor: 'default',
              }}
            >
              Contract SubTypes
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Chip
                variant="outlined"
                size="small"
                color="secondary"
                label={contract.subtype}
                icon={
                  options.find((option) => option.archetype === archetype)?.archetypeIcon
                }
                onClick={handleArchetypeOpen}
              />
            </Box>
          </DigiDisplay>
          <UserDisplay userid={contract.owner_id} />
        </Box>
      </DigiBox>
      <Box
        data-testid="ContractDisplay__MiddleBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '30%',
          justifyContent: 'space-around',
        }}
      >
        <Box
          data-testid="ContractDisplay__PayandBriefingContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            alignContent: 'center',
            maxHeight: '100%',
          }}
        >
          <DigiBox
            data-testid="ContractDisplay-PayandBriefing__BriefingWrapper"
            sx={{
              px: '.5em',
              width: '100%',
              maxHeight: '50%',
            }}
          >
            <DigiDisplay
              data-testid="ContractDisplay-PayandBriefing__BriefingTitle"
              sx={{
                pl: '1em',
                my: '.5em',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Typography
                data-testid="ContractDisplay-PayandBriefing__BriefingTitle"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'default',
                }}
              >
                Briefing
              </Typography>
              <IconButton
                data-testid="ContractDisplay-PayandBriefing__BriefingExpansionButton"
                size="small"
                onClick={toggleBriefingExpand}
              >
                <ExpandMore
                  fontSize="small"
                  sx={{
                    transform: !briefingExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.5s',
                  }}
                />
              </IconButton>
            </DigiDisplay>
            <Collapse
              data-testid="ContractDisplay-Briefing__Contents_Container"
              in={briefingExpanded}
              sx={{
                maxHeight: 'calc (100% - 2.5em)',
                overflow: 'auto',
                mb: '.5em',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(0,73,130)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(24,252,252)',
                },
              }}
            >
              <DigiDisplay
                data-testid="ContractDisplay-Briefing__Contents_Wrapper"
                sx={{
                  px: '1em',
                  py: '.2em',
                }}
              >
                <Typography
                  data-testid="ContractDisplay-PayandBriefing__BriefingContent"
                  variant="body2"
                  sx={{
                    color: 'text.primary',
                  }}
                >
                  {contract.briefing}
                </Typography>
              </DigiDisplay>
            </Collapse>
          </DigiBox>
          <DigiBox
            data-testid="ContractDisplay-PayandBriefing__PayWrapper"
            sx={{
              px: '.5em',
              width: '100%',
              maxHeight: '50%',
              mt: '1em',
            }}
          >
            <DigiDisplay
              data-testid="ContractDisplay-PayandBriefing__PayTitle_Wrapper"
              sx={{
                pl: '1em',
                my: '.5em',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Typography
                data-testid="ContractDisplay-PayandBriefing__PayTitle"
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'default',
                }}
              >
                Pay
              </Typography>
              <IconButton
                data-testid="ContractDisplay-PayandBriefing_PayExpansionButton"
                size="small"
                onClick={togglePayExpand}
              >
                <ExpandMore
                  fontSize="small"
                  sx={{
                    transform: !payExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.5s',
                  }}
                />
              </IconButton>
            </DigiDisplay>

            <Collapse
              data-testid="ContractDisplay-PayandBriefing_PayInfoWrapper"
              in={payExpanded}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {contract.isBonusPay && (
                <Typography variant="tip" align="center" sx={{ px: '.5em', mb: 'auto' }}>
                  The contract has bonus pay available.
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  mb: '.5em',
                }}
              >
                <Tooltip
                  title={
                    contract.payStructure.charAt(0) +
                    contract.payStructure.slice(1).toLowerCase()
                  }
                  arrow
                >
                  <PayStructure payStructure={contract.payStructure} width="120px" />
                </Tooltip>
                <Tooltip title={`¤${contract.defaultPay}`} arrow>
                  <PayDisplay
                    label="Default Pay"
                    pay={contract.defaultPay}
                    structure={
                      (contract.payStructure as ContractPayStructure) ?? undefined
                    }
                    width="120px"
                  />
                </Tooltip>
              </Box>
            </Collapse>
          </DigiBox>
        </Box>
        <Box
          data-testid="ContractDisplay__LocationContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            maxHeight: '100%',
          }}
        >
          <DigiBox
            data-testid="ContractDisplay__LocationWrapper"
            sx={{
              width: '100%',
              p: '.5em',
            }}
          >
            <DigiDisplay
              data-testid="ContractDisplay__LocationTitle_Wrapper"
              sx={{
                pl: '1em',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Typography
                data-testid="ContractDisplay__LocationTitle"
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'default',
                }}
              >
                Locations
              </Typography>
              <IconButton
                data-testid="ContractDisplay-Locations_LocationsExpansionButton"
                size="small"
                onClick={toggleLocationsExpand}
              >
                <ExpandMore
                  fontSize="small"
                  sx={{
                    transform: !locationsExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.5s',
                  }}
                />
              </IconButton>
            </DigiDisplay>

            <Collapse
              data-testid="ContractDisplay-Locations__LocationsListWrapper"
              in={locationsExpanded}
              sx={{
                width: '100%',
              }}
            >
              {contract.Locations && contract.Locations.length > 0 ? (
                <>
                  <DigiField
                    data-testid="ContractDisplay-Locations__StartLocationWrapper"
                    label="Start Loaction"
                    sx={{
                      my: '.5em',
                      p: '.2em',
                      mx: '2em',
                    }}
                    slots={{
                      label: {
                        sx: {
                          fontSize: '.8em',
                          mx: 'auto',
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <LocationChip locationId={startLocationId ?? ''} />
                    </Box>
                  </DigiField>
                  {endLocationId && (
                    <DigiField
                      data-testid="ContractDisplay-Locations__EndLocationWrapper"
                      label="End Location"
                      sx={{
                        mb: '.5em',
                        mx: '2em',
                        justifyContent: 'center',
                      }}
                      slots={{
                        label: {
                          sx: {
                            fontSize: '.8em',
                            mx: 'auto',
                          },
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <LocationChip locationId={endLocationId ?? ''} />
                      </Box>
                    </DigiField>
                  )}
                  {otherLocationIds.length > 0 && (
                    <PopupFormSelection
                      data-testid="ContractDisplay-Locations__OtherLocationsWrapper"
                      sx={{
                        mb: '.5em',
                        mx: '2em',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        data-testid="ContractDisplay-Locations-OtherLocation__Title"
                        variant="body2"
                        align="center"
                      >
                        Other Locations
                      </Typography>
                      <Box
                        data-testid="ContractDisplay-Locations-OtherLocations__LocationPagnationWrapper"
                        ref={scrollRef}
                        sx={{
                          display: 'flex',
                          gap: '.5em',
                          mb: '.5em',
                          overflow: 'auto',
                          '&::-webkit-scrollbar': {
                            width: '5px',
                            height: '5px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: 'rgb(0,73,130)',
                            borderRadius: '10px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            borderRadius: '20px',
                            background: 'rgb(24,252,252)',
                          },
                        }}
                      >
                        {otherLocationIds.map((loc) => (
                          <LocationChip key={loc} locationId={loc} />
                        ))}
                      </Box>
                    </PopupFormSelection>
                  )}
                </>
              ) : (
                <Typography
                  align="center"
                  variant="error"
                  sx={{
                    my: '1em',
                    px: '.2em',
                    py: '.1em',
                  }}
                >
                  Contract Missing Start Location. Please report error.
                </Typography>
              )}
            </Collapse>
          </DigiBox>
        </Box>
      </Box>
      <Box
        data-testid="ContractDisplay__ActiveDataContainer"
        sx={{
          width: '100%',
          minHeight: '20%',
          p: '.5em',
          my: '.5em',
        }}
      >
        <ControlPanelBox
          data-testid="ContractDisplay-ActiveData__TabWrapper"
          sx={{
            display: 'block',
            px: '1em',
            py: '.2em',
            width: '100%',
          }}
        >
          <SmallTabsHolo
            variant="fullWidth"
            value={activeDataTab}
            onChange={handleActiveTabChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <SmallTabHolo label="Contractors" value="contractors" />
            <SmallTabHolo label="Ships" value="ships" disabled />
          </SmallTabsHolo>
        </ControlPanelBox>
        <DigiBox
          data-testid="ContractDisplay-ActiveData__PanelContainer"
          sx={{
            width: '100%',
            height: '90%',
            mt: '.5em',
          }}
        >
          {activeDataPanel(activeDataTab)}
        </DigiBox>
      </Box>
      <Box
        data-testid="ContractDisplay__BottomBox"
        sx={{
          width: '100%',
          minHeight: '20%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          data-testid="ContractDisplay__ContractTimeContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '.5em',
            width: '70%',
          }}
        >
          <ControlPanelBox
            data-testid="ContractDisplay-ContractTime__TabWrapper"
            sx={{
              px: '1em',
              display: 'block',
            }}
          >
            <SmallTabsHolo
              variant="fullWidth"
              value={timeTab}
              onChange={handleTimeTabChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <SmallTabHolo label="Bidding Time" value="bid" />
              <SmallTabHolo label="Contract Duration" value="start" />
            </SmallTabsHolo>
          </ControlPanelBox>
          <DigiBox
            data-testid="ContractDisplay-ContractTime__PanelWrapper"
            sx={{
              height: '90%',
              mt: '.5em',
            }}
          >
            {contractTimePanel(timeTab)}
          </DigiBox>
        </Box>
        <Box
          data-testid="ContractDisplay__SubmitBidButtonWrapper"
          sx={{
            mx: 'auto',
            my: 'auto',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSubmitBidPopup}
          >
            Submit Bid
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
