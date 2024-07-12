// import { LocationChip } from '@Common/Components/App/LocationChip';
import { LocationChip } from '@Common/Components/App/LocationChip';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { archetypes } from '@Common/Definitions/Contracts/ContractArchetype';
import { ChevronLeft, ChevronRight, HelpOutline } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Tab,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import dayjs from 'dayjs';
import { useState } from 'react';
import React from 'react';

import { ContractorsManager } from '@/Components/Personal/ContractManager/ContractDisplay/ContractorsManager';

type ContractDataFieldProps = {
  label: string;
  value: string;
};
const ContractDataField: React.FC<ContractDataFieldProps> = ({ label, value }) => {
  return (
    <>
      <TextField
        label={label}
        value={value}
        size="small"
        margin="dense"
        InputProps={{
          readOnly: true,
        }}
        inputProps={{
          style: {
            textAlign: 'center',
          },
        }}
      />
    </>
  );
};

// const ExpandButton: React.FC<unknown> = () => {
//   const [isExpanded, setIsExpanded] = React.useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <IconButton
//       onClick={toggleExpand}
//       size="small"
//       sx={{
//         backgroundColor: 'rgba(14,49,141,.25)',
//       }}
//     >
//       {isExpanded ? <OpenInFull fontSize="small" /> : <UnfoldLess fontSize="small" />}
//     </IconButton>
//   );
// };

type SelectedContractManagerProps = {
  contractId: string | null;
};

export const SelectedContractManager: React.FC<SelectedContractManagerProps> = ({
  contractId,
}) => {
  const [contractManagerTab, setContractManagerTab] = useState<string>('contractors');
  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [otherLocationIndex, setOtherLocationIndex] = React.useState(0);

  const contract = useAppSelector((root) => selectContract(root, contractId as string));

  const currentUser = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const selectedArchetype = archetypes.find((option) =>
      option.subTypes.some((subtype) => subtype.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype?.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract.subtype]);

  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetype }));
  };

  const handlePayStructurePopup = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };

  const handleContractManageView = (_event: React.SyntheticEvent, newValue: string) => {
    setContractManagerTab(newValue);
  };

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

  const startTime = React.useMemo(() => {
    const startDate = dayjs(contract.startDate);
    const formattedStartDate = startDate.format('DD MMM, YY @ HH:mm');
    if (contract.startDate === null) {
      return 'Manually Started';
    }
    return formattedStartDate;
  }, [contract.startDate]);

  const endTime = React.useMemo(() => {
    const endDate = dayjs(contract.endDate);
    const formattedEndDate = endDate.format('DD MMM, YY @ HH:mm');
    if (contract.endDate === null) {
      return 'Manually Ended';
    }
    return formattedEndDate;
  }, [contract.endDate]);

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

  const isContractOwned = React.useMemo(() => {
    if (contract.owner_id === currentUser?.id) {
      return true;
    } else {
      return false;
    }
  }, [currentUser, contract.owner_id]);

  return (
    <Box
      data-testid="SelectedContractManagerWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        p: '1em',
      }}
    >
      <Box
        data-testid="SelectedContract__TopBoxWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '30%',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '.5em',
          mb: '1em',
        }}
      >
        <Box
          data-testid="SelectedContract__PlayerDisplayContainer"
          sx={{
            padding: '.5em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '30%',
          }}
        >
          <UserDisplay userid={contract.owner_id} />
        </Box>
        <Box
          data-testid="SelectedContract__OverviewInfoContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%',
            padding: '1em',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '5px',
            borderColor: 'primary.main',
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
            data-testid="SelectedContract-OverviewInfo__HeaderWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              borderRadius: '20px',
              backgroundColor: 'rgba(33,150,243,.2)',
              px: '1em',
              justifyContent: 'center',
              py: '.2em',
            }}
          >
            <Box
              data-testid="SelectedContract-OverviewInfo-Header__TitleWrapper"
              sx={{ display: 'flex', flexDirection: 'row', mr: 'auto' }}
            >
              <Typography
                data-testid="SelectedContract__ContractTitle"
                variant="h4"
                noWrap
                sx={{ fontWeight: 'bold', maxWidth: '100%' }}
              >
                {contract.title}
              </Typography>
            </Box>
            <Box
              data-testid="SelectedContract-OverviewInfo-Header__ContractTypeContainer"
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <Tooltip title={archetype}>
                {archetypes.find((option) => option.archetype === archetype)
                  ?.archetypeIcon ?? <Typography>???</Typography>}
              </Tooltip>
            </Box>
          </Box>
          <Box
            data-testid="SelectedContract-OverviewInfo__BottomWrapper"
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: '.5em' }}
          >
            <Box
              data-testid="SelectedContract-OverviewInfo-Bottom__Status&SubtypeWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '25%',
                alignItems: 'space-around',
                justifyContent: 'space-around',
              }}
            >
              <Box
                data-testid="SelectedContract-OverviewInfo-Bottom__StatusChipWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(14,49,141,.25)',
                  pb: '.2em',
                }}
              >
                <Typography variant="body2" sx={{ mb: 'auto', fontWeight: 'bold' }}>
                  Status
                </Typography>
                <Chip
                  data-testid="SelectedContract-OverviewInfo-Bottom-Status__StatusChip"
                  label={
                    contract.status.charAt(0).toUpperCase() +
                    contract.status.slice(1).toLowerCase()
                  }
                  color={statusColor}
                  sx={{
                    fontWeight: 'bold',
                  }}
                />
              </Box>
              <Box
                data-testid="SelectedContract-OverviewInfo-Bottom__SubtypeChipWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(14,49,141,.25)',
                  borderRadius: '10px',
                  width: '100%',
                  pb: '.2em',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 'auto' }}>
                  Contract Subtypes
                </Typography>
                <Chip
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  label={contract.subtype}
                  icon={
                    archetypes.find((option) => option.archetype === archetype)
                      ?.archetypeIcon
                  }
                  onClick={handleArchetypeOpen}
                />
              </Box>
            </Box>
            <Box
              data-testid="SelectedContract-OverviewInfo-Bottom__DetailsContainer"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: 'auto',
                mr: '.5em',
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Details
              </Typography>
              <Box
                data-testid="SelectedContract-OverviewInfo-Bottom__DetailsWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '.5em',
                  mb: '.2em',
                }}
              >
                <Box
                  data-testid="SelectedContract-OverviewInfo-Bottom__PayInfoWrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '35%',
                    ml: 'auto',
                  }}
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
                  />
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
                    />
                  </Tooltip>
                </Box>
                <Box
                  data-testid="SelectedContract-OverviewInfo-Bottom__TimeInfoWrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '35%',
                    mr: 'auto',
                  }}
                >
                  <ContractDataField label="Start" value={startTime} />
                  <ContractDataField label="Remaining" value={endTime} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        data-testid="SelectedContract__BottomBoxWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '55%',
          p: '.5em',
        }}
      >
        <Box
          data-testid="SelectedContract-Bottom__LeftBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            data-testid="SelectedContract__LocationsContainer"
            sx={{
              width: '80%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              mb: '1em',
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
              data-testid="SelectedContract-Locations__TitleText"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
              }}
            >
              Locations
            </Typography>
            <Box
              data-testid="SelectedContract-Locations__StartandEndWrapper"
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: '.5em',
                my: '.5em',
              }}
            >
              <Box
                data-testid="SelectedContract-Locations__StartLocationWrapper"
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  pb: '.3em',
                  backgroundColor: 'rgba(14,49,141,.25)',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Start Location
                </Typography>
                <LocationChip locationId={startLocationId ?? ''} />
              </Box>
              {endLocationId && (
                <Box
                  data-testid="SelectedContract-Locations__EndLocationWrapper"
                  sx={{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mr: 'auto',
                    pb: '.3em',
                    backgroundColor: 'rgba(14,49,141,.25)',
                    borderRadius: '10px',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    End Location
                  </Typography>
                  <LocationChip locationId={endLocationId} />
                </Box>
              )}
            </Box>
            {otherLocationIds.length > 0 && (
              <Box
                data-testid="SelectedContract-Locations_OtherLocationsContainer"
                sx={{
                  width: '82%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(14,49,141,.25)',
                  borderRadius: '10px',
                  pb: '.3em',
                  mx: 'auto',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Other Locations
                </Typography>
                <Box
                  data-testid="SelectedContract-Locations__OtherLocationsWrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
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
              </Box>
            )}
          </Box>
          <Box
            data-testid="SelectedContract__BriefingWrapper"
            sx={{
              width: '80%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              mb: '1em',
              position: 'relative',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
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
              data-testid="SelectedContract-Briefing__BriefingTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
              }}
            >
              Briefing
            </Typography>
            <Box
              data-testid="SelectedContract-Briefing__ContentWrapper"
              sx={{
                mx: '10%',
                mt: '.5em',
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                p: '.5em',
                maxHeight: '100px',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '20px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <Typography
                data-testid="SelectedContract-Briefing__ContentText"
                variant="body2"
                sx={{
                  textWrap: 'wrap',
                  whiteSpace: 'normal',
                  wordBreak: 'break-all',
                  pl: '.5em',
                }}
              >
                {contract.briefing}
              </Typography>
            </Box>
          </Box>
          <Box
            data-testid="SelectedContract__ControllerContainer"
            sx={{
              mt: 'auto',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              borderLeft: '2px solid',
              borderRight: '2px solid',
              borderRadius: '5px',
              borderColor: 'secondary.main',
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
            <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
              Contract Controller
            </Typography>
            <Box
              data-testid="SelectedContract__ControllerWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                gap: '.5em',
                mb: '.5em',
                px: '1em',
              }}
            >
              {isContractOwned && contract.status === 'BIDDING' && (
                <Button
                  data-testid="SelectedContract-Controller-Process__StartContractButton"
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  fullWidth
                >
                  Start
                </Button>
              )}
              {isContractOwned && contract.status === 'INPROGRESS' && (
                <Button
                  data-testid="SelectedContract-Controller-Process__CompleteContract"
                  variant="outlined"
                  color="success"
                  size="medium"
                  fullWidth
                >
                  Complete
                </Button>
              )}
              {isContractOwned &&
                contract.status !== 'COMPLETED' &&
                contract.status !== 'CANCELLED' && (
                  <Button
                    data-testid="SelectedContract-Controller-Edit__EditContractButton"
                    variant="outlined"
                    color="info"
                    size="medium"
                    fullWidth
                  >
                    Edit
                  </Button>
                )}
              {isContractOwned &&
                contract.status !== 'COMPLETED' &&
                contract.status !== 'CANCELLED' && (
                  <Button
                    data-testid="SelectedContract-Controller-Edit__CancelContractButton"
                    variant="outlined"
                    color="error"
                    size="medium"
                    fullWidth
                  >
                    Cancel
                  </Button>
                )}
            </Box>
          </Box>
        </Box>
        <Box
          data-testid="SelectedContract-Bottom__RightBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '48%',
            height: '100%',
            ml: 'auto',
            mr: 'auto',
          }}
        >
          <Box
            data-testid="SelectedContract__ContractManagementContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              data-testid="SelectedContract-ContractManagement__TabWrapper"
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <TabContext value={contractManagerTab}>
                <TabList
                  data-testid="SelectedContract-ContractManagement__TabList"
                  onChange={handleContractManageView}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="fullWidth"
                  sx={{
                    borderLeft: '2px solid',
                    borderRight: '2px solid',
                    borderRadius: '5px',
                    borderColor: 'secondary.main',
                    px: '1em',
                    py: '.2em',
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
                  <Tab label="Contractors" value="contractors" />
                  <Tab disabled label="Payroll" value="payroll" />
                  <Tab disabled label="Ships" value="ships" />
                </TabList>
                <TabPanel
                  value="contractors"
                  sx={{
                    height: '100%',
                  }}
                >
                  <ContractorsManager
                    contract={contract}
                    contractOwned={isContractOwned}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
