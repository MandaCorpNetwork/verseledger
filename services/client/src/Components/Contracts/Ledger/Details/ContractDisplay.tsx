import { LocationChip } from '@Common/Components/App/LocationChip';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ChevronLeft, ChevronRight, ExpandMore, HelpOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  InputAdornment,
  styled,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBid';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractorsPanel } from './ActiveDataPanel';
import { BidPanel, EndPanel, StartPanel } from './TimePanel';

const SmallTabs = styled(Tabs)({
  minHeight: '10px',
});

const SmallTab = styled(Tab)({
  minHeight: '10px',
  height: '10px',
  fontSize: '.8em',
});

type ContractDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: IContract;
};

export const ContractDisplay: React.FC<ContractDisplayProps> = ({ contract }) => {
  const dispatch = useAppDispatch();

  Logger.info(`ContractDisplay ID: ${contract.id}`);

  const [briefingExpanded, setBriefingExpanded] = React.useState(true);
  const [payExpanded, setPayExpanded] = React.useState(true);
  const [locationsExpanded, setLocationsExpanded] = React.useState(true);
  const [activeDataTab, setActiveDataTab] = React.useState('contractors');
  const [timeTab, setTimeTab] = React.useState('bid');
  const [otherLocationIndex, setOtherLocationIndex] = React.useState(0);
  const [archetype, setArchetype] = React.useState<string | null>(null);

  React.useEffect(() => {
    const selectedArchetype = contractArchetypes.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract.subtype]);

  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetype }));
  };

  const handleActiveTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      setActiveDataTab(value);
    },
    [activeDataTab],
  );

  const handleTimeTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      setTimeTab(value);
    },
    [timeTab],
  );

  const toggleBriefingExpand = React.useCallback(() => {
    setBriefingExpanded(!briefingExpanded);
  }, [briefingExpanded]);

  const togglePayExpand = React.useCallback(() => {
    setPayExpanded(!payExpanded);
  }, [payExpanded]);

  const toggleLocationsExpand = React.useCallback(() => {
    setLocationsExpanded(!locationsExpanded);
  }, [locationsExpanded]);

  const contractTimePanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'bid':
          return <BidPanel contractId={contract.id} />;
        case 'start':
          return <StartPanel contractId={contract.id} />;
        case 'end':
          return <EndPanel contractId={contract.id} />;
        default:
          return;
      }
    },
    [timeTab],
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

  const statusChipColor = React.useCallback(() => {
    if (contract.status == 'BIDDING') {
      return 'secondary';
    } else if (contract.status == 'STARTED') {
      return 'info';
    } else if (contract.status == 'COMPLETE') {
      return 'success';
    } else if (contract.status == 'CANCELED') {
      return 'error';
    } else {
      return 'primary';
    }
  }, [contract.status]);

  const statusColor = statusChipColor();

  const handlePayStructurePopup = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };

  const handleSubmitBidPopup = () => {
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

  const handleOtherLocationIndexChange = React.useCallback(
    (direction: string) => {
      console.log(getOtherLocationIds());
      if (otherLocationIds.length > 1) {
        if (direction === 'back') {
          if (otherLocationIndex > 0) {
            setOtherLocationIndex((prevIndex) => prevIndex - 1);
          }
        }
        if (direction === 'forward') {
          if (otherLocationIndex < otherLocationIds.length - 1) {
            setOtherLocationIndex((prevIndex) => prevIndex + 1);
          }
        }
      }
      Logger.info(otherLocationIndex);
    },
    [setOtherLocationIndex, otherLocationIndex, otherLocationIds],
  );

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
      }}
    >
      <Box
        data-testid="ContractDisplay__TopBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '20%',
          justifyContent: 'space-around',
        }}
      >
        <Box
          data-testid="ContractDisplay__UserDisplayWrapper"
          sx={{
            width: '40%',
            alignContent: 'center',
          }}
        >
          <UserDisplay userid={contract.owner_id} />
        </Box>
        <Box
          data-testid="ContractDisplay-TopBox__TitleContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '55%',
            height: '100%',
          }}
        >
          <Box
            data-testid="ContractDisplay-Info__TitleBoxWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              p: '.5em',
              ml: '1em',
              width: '100%',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            <Box
              data-testid="ContractDisplay-Info__TitleBar"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'rgba(33,150,243,.2)',
                borderRadius: '10px',
                p: '.2em',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <Tooltip title={contract.title} arrow>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{ fontWeight: 'bold', maxWidth: '80%', pl: '.2em' }}
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
                {contractArchetypes.find((option) => option.archetype === archetype)
                  ?.archetypeIcon ?? <Typography>???</Typography>}
              </Tooltip>
            </Box>
            <Box
              data-testid="ContractDisplay__DetailsContainer"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: '.5em',
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              <Box
                data-testid="ContractDisplay-Info-Details__StatusWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(33,150,243,.2)',
                  borderRadius: '10px',
                  px: '.5em',
                  pb: '.5em',
                  pt: '.2em',
                  mr: '.5em',
                }}
              >
                <Typography
                  data-testid="ContractDisplay-Info-Details__StatusTitle"
                  align="center"
                  variant="body2"
                  sx={{ fontWeight: 'bold' }}
                >
                  Status
                </Typography>
                <Chip
                  variant="filled"
                  label={
                    contract.status.charAt(0).toUpperCase() +
                    contract.status.slice(1).toLowerCase()
                  }
                  color={statusColor}
                  size="small"
                />
              </Box>
              <Box
                data-testid="ContractDisplay-Info-Details__SubTypeWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(33,150,243,.2)',
                  borderRadius: '10px',
                  px: '.5em',
                  pb: '.5em',
                  pt: '.2em',
                }}
              >
                <Typography
                  data-testid="ContractDisplay-Info-Details__SubTypeTitle"
                  align="center"
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
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
                      contractArchetypes.find((option) => option.archetype === archetype)
                        ?.archetypeIcon
                    }
                    onClick={handleArchetypeOpen}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        data-testid="ContractDisplay__MiddleBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          maxHeight: '35%',
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
          <Box
            data-testid="ContractDisplay-PayandBriefing__BriefingWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'inherit',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              px: '.5em',
              width: '100%',
              maxHeight: '50%',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            <Typography
              data-testid="ContractDisplay-PayandBriefing__BriefingTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(33,150,243,.2)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
                my: '.5em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Briefing
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
            </Typography>
            <Collapse
              data-testid="ContractDisplay-Briefing__ContentsWrapper"
              in={briefingExpanded}
              sx={{
                backgroundColor: 'rgba(33,150,243,.2)',
                borderRadius: '10px',
                px: '1em',
                maxHeight: '100%',
                overflow: 'auto',
                mb: '.2em',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <Typography
                data-testid="ContractDisplay-PayandBriefing__BriefingContent"
                variant="body2"
              >
                {contract.briefing}
              </Typography>
            </Collapse>
          </Box>
          <Box
            data-testid="ContractDisplay-PayandBriefing__PayWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'inherit',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              px: '.5em',
              width: '100%',
              maxHeight: '50%',
              mt: '1em',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            <Typography
              data-testid="ContractDisplay-PayandBriefing__PayTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(33,150,243,.2)',
                borderRadius: '10px',
                pl: '1em',
                my: '.5em',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Pay
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
            </Typography>
            <Collapse
              data-testid="ContractDisplay-PayandBriefing_PayInfoWrapper"
              in={payExpanded}
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Tooltip
                title={
                  contract.payStructure.charAt(0) +
                  contract.payStructure.slice(1).toLowerCase()
                }
                arrow
              >
                <TextField
                  size="small"
                  label="Pay Structure"
                  value={
                    contract.payStructure.charAt(0) +
                    contract.payStructure.slice(1).toLowerCase()
                  }
                  color="secondary"
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handlePayStructurePopup}>
                        <HelpOutline color="secondary" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mr: '.5em',
                    maxWidth: '48%',
                  }}
                />
              </Tooltip>
              <Tooltip title={`¤${contract.defaultPay}`} arrow>
                <TextField
                  size="small"
                  label="Default Pay"
                  value={contract.defaultPay}
                  color="secondary"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography color="secondary">¤</Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ maxWidth: '48%' }}
                />
              </Tooltip>
            </Collapse>
          </Box>
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
          <Box
            data-testid="ContractDisplay__LocationWrapper"
            sx={{
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              width: '100%',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            <Typography
              data-testid="ContractDisplay__LocationTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(33,150,243,.2)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
                m: '.5em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Locations
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
            </Typography>
            <Collapse
              data-testid="ContractDisplay-Locations__LocationsListWrapper"
              in={locationsExpanded}
              sx={{
                width: '100%',
              }}
            >
              {contract.Locations && contract.Locations.length > 0 ? (
                <>
                  <Box
                    data-testid="ContractDisplay-Locations__StartLocationWrapper"
                    sx={{
                      backgroundColor: 'rgba(33,150,243,.2)',
                      borderRadius: '10px',
                      mb: '.5em',
                      mx: '.5em',
                      p: '.2em',
                    }}
                  >
                    <Typography
                      data-testid="ContractDisplay-Locations-StartLocation__Title"
                      variant="body2"
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      Start Location
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <LocationChip locationId={startLocationId ?? ''} />
                    </Box>
                  </Box>
                  {endLocationId && (
                    <Box
                      data-testid="ContractDisplay-Locations__EndLocationWrapper"
                      sx={{
                        backgroundColor: 'rgba(33,150,243,.2)',
                        borderRadius: '10px',
                        mb: '.5em',
                        mx: '.5em',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        data-testid="ContractDisplay-Locations-StartLocation__Title"
                        variant="body2"
                        align="center"
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        End Location
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <LocationChip locationId={endLocationId ?? ''} />
                      </Box>
                    </Box>
                  )}
                  {otherLocationIds.length > 0 && (
                    <Box
                      data-testid="ContractDisplay-Locations__OtherLocationsWrapper"
                      sx={{
                        backgroundColor: 'rgba(33,150,243,.2)',
                        borderRadius: '10px',
                        mb: '.5em',
                        mx: '.5em',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        data-testid="ContractDisplay-Locations-OtherLocation__Title"
                        variant="body2"
                        align="center"
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        Other Locations
                      </Typography>
                      <Box
                        data-testid="ContractDisplay-Locations-OtherLocations__LocationPagnationWrapper"
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleOtherLocationIndexChange('back')}
                          disabled={otherLocationIndex === 0}
                        >
                          <ChevronLeft fontSize="small" />
                        </IconButton>
                        <Box
                          data-testid="ContractDisplay-Locations-OtherLocations__LocationChipDisplayWrapper"
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            data-testid="ContractDisplay-Locations-OtherLocations__LocationChip"
                            variant="body2"
                            align="center"
                          >
                            {otherLocationIndex + 1}.{' '}
                            <LocationChip
                              locationId={
                                otherLocationIds
                                  ? otherLocationIds[otherLocationIndex]
                                  : 'Error'
                              }
                            />
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleOtherLocationIndexChange('forward')}
                          disabled={
                            otherLocationIds
                              ? otherLocationIds.length < 1 ||
                                otherLocationIndex === otherLocationIds.length - 1
                              : false
                          }
                        >
                          <ChevronRight fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <Typography
                  align="center"
                  variant="body2"
                  sx={{ mb: '.2em', color: 'info.main' }}
                >
                  Locations Redacted
                </Typography>
              )}
            </Collapse>
          </Box>
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
        <Box
          data-testid="ContractDisplay-ActiveData__TabWrapper"
          sx={{
            borderLeft: '2px solid',
            borderRight: '2px solid',
            borderRadius: '5px',
            borderColor: 'secondary.main',
            px: '1em',
            py: '.2em',
            width: '100%',
            boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
            backgroundImage:
              'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '5px 5px',
              opacity: 0.5,
            },
            '&:hover': {
              backgroundImage:
                'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
              borderColor: 'secondary.light',
              boxShadow: '0 0 5px 2px rgba(14,49,252,.4)',
            },
            transition: 'all 0.3s',
          }}
        >
          <SmallTabs
            variant="fullWidth"
            value={activeDataTab}
            onChange={handleActiveTabChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <SmallTab label="Contractors" value="contractors" />
            <SmallTab label="Ships" value="ships" disabled />
          </SmallTabs>
        </Box>
        <Box
          data-testid="ContractDisplay-ActiveData__PanelContainer"
          sx={{
            width: '100%',
            height: '90%',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '5px',
            mt: '.5em',
            borderLeft: '1px solid rgba(14,49,141,0.5)',
            borderRight: '1px solid rgba(14,49,141,0.5)',
            boxShadow: '0 5px 15px rgba(14,49,141,.8)',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              background:
                'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
              opacity: 0.6,
              backdropFilter: 'blur(10px)',
              zIndex: -1,
              backgroundImage:
                'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
              backgroundSize: '100% 2px',
            },
          }}
        >
          {activeDataPanel(activeDataTab)}
        </Box>
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
          <Box
            data-testid="ContractDisplay-ContractTime__TabWrapper"
            sx={{
              borderRight: '2px solid',
              borderLeft: '2px solid',
              borderRadius: '5px',
              borderColor: 'secondary.main',
              px: '.5em',
              boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
              backgroundImage:
                'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '5px 5px',
                opacity: 0.5,
              },
              '&:hover': {
                backgroundImage:
                  'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
                borderColor: 'secondary.light',
                boxShadow: '0 0 5px 2px rgba(14,49,252,.4)',
              },
              transition: 'all 0.3s',
            }}
          >
            <SmallTabs
              variant="fullWidth"
              value={timeTab}
              onChange={handleTimeTabChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <SmallTab label="Bid" value="bid" />
              <SmallTab label="Start" value="start" />
              <SmallTab label="End" value="end" />
            </SmallTabs>
          </Box>
          <Box
            data-testid="ContractDisplay-ContractTime__PanelWrapper"
            sx={{
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              height: '90%',
              mt: '.5em',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            {contractTimePanel(timeTab)}
          </Box>
        </Box>
        <Box
          data-testid="ContractDisplay__SubmitBidButtonWrapper"
          sx={{
            ml: 'auto',
            mt: 'auto',
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleSubmitBidPopup}>
            Submit Bid
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
