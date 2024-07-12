// import { LocationChip } from '@Common/Components/App/LocationChip';
import ControlPanelBox from '@Common/Components/Boxes/ControlPanelBox';
import DigiBox from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import ParagraphWrapper from '@Common/Components/Boxes/ParagraphWrapper';
import TabListHolo from '@Common/Components/Tabs/TabListHolo';
import DigiTitle from '@Common/Components/Typography/DigiTitle';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { HelpOutline } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import {
  Box,
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
import dayjs from 'dayjs';
import { useState } from 'react';
import React from 'react';
import { ILocationWithContractLocation } from 'vl-shared/src/schemas/LocationSchema';

import { ContractorsManager } from '@/Components/Personal/ContractManager/ContractDisplay/tools/pages/Contractors/ContractorsManager';

import { ContractController } from './tools/ContractController';
import { LocationsDisplay } from './tools/LocationsDisplay';

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
          sx: {
            cursor: 'default',
          },
        }}
        inputProps={{
          sx: {
            cursor: 'default',
          },
          style: {
            textAlign: 'center',
          },
        }}
      />
    </>
  );
};

type SelectedContractManagerProps = {
  contractId: string | null;
};

export const SelectedContractManager: React.FC<SelectedContractManagerProps> = ({
  contractId,
}) => {
  const [contractManagerTab, setContractManagerTab] = useState<string>('contractors');
  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [otherLocationIndex, setOtherLocationIndex] = React.useState(0);

  const options = contractArchetypes('secondary.main');

  const contract = useAppSelector((root) => selectContract(root, contractId as string));
  const currentUser = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const selectedArchetype = options.find((option) =>
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

  const contractLocations = React.useCallback(() => {
    if (!contract.Locations) {
      return [] as ILocationWithContractLocation[];
    }
    const validLocations = contract.Locations.filter(
      (loc) => loc.ContractLocation !== undefined,
    );
    return validLocations as ILocationWithContractLocation[];
  }, [contract]);

  const isContractOwned = React.useMemo(() => {
    if (contract.owner_id === currentUser?.id) {
      return true;
    } else {
      return false;
    }
  }, [currentUser, contract.owner_id, contractId]);

  const userBid = React.useMemo(() => {
    if (isContractOwned) {
      return null;
    }
    return contract.Bids?.find((bid) => bid.user_id === currentUser?.id) ?? null;
  }, [contract.Bids, currentUser, isContractOwned]);

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
        <DigiBox
          data-testid="SelectedContract__OverviewInfoContainer"
          sx={{
            width: '70%',
            padding: '1em',
          }}
        >
          <DigiDisplay
            data-testid="SelectedContract-OverviewInfo__HeaderWrapper"
            sx={{
              flexDirection: 'row',
              width: '100%',
              px: '1em',
              py: '.2em',
              alignItems: 'strech',
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
                sx={{ fontWeight: 'bold', maxWidth: '100%', cursor: 'default' }}
              >
                {contract.title}
              </Typography>
            </Box>
            <Box
              data-testid="SelectedContract-OverviewInfo-Header__ContractTypeContainer"
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <Tooltip title={archetype}>
                {options.find((option) => option.archetype === archetype)
                  ?.archetypeIcon ?? <Typography>???</Typography>}
              </Tooltip>
            </Box>
          </DigiDisplay>
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
              <DigiDisplay
                data-testid="SelectedContract-OverviewInfo-Bottom__StatusChipWrapper"
                sx={{
                  width: '100%',
                  pb: '.2em',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ mb: 'auto', fontWeight: 'bold', cursor: 'default' }}
                >
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
                    cursor: 'default',
                  }}
                />
              </DigiDisplay>
              <DigiDisplay
                data-testid="SelectedContract-OverviewInfo-Bottom__SubtypeChipWrapper"
                sx={{
                  width: '100%',
                  pb: '.2em',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', mb: 'auto', cursor: 'default' }}
                >
                  Contract Subtypes
                </Typography>
                <Chip
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  label={contract.subtype}
                  icon={
                    options.find((option) => option.archetype === archetype)
                      ?.archetypeIcon
                  }
                  onClick={handleArchetypeOpen}
                  sx={{
                    cursor: 'default',
                  }}
                />
              </DigiDisplay>
            </Box>
            <DigiDisplay
              data-testid="SelectedContract-OverviewInfo-Bottom__DetailsContainer"
              sx={{
                ml: 'auto',
                mr: '.5em',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
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
                    inputProps={{
                      readOnly: true,
                      sx: {
                        cursor: 'default',
                      },
                    }}
                    InputProps={{
                      sx: {
                        cursor: 'default',
                      },
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handlePayStructurePopup}
                          sx={{ cursor: 'pointer' }}
                        >
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
                      inputProps={{
                        readOnly: true,
                        sx: {
                          cursor: 'default',
                        },
                      }}
                      InputProps={{
                        sx: {
                          cursor: 'default',
                        },
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
            </DigiDisplay>
          </Box>
        </DigiBox>
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
          {contract.Locations && <LocationsDisplay locations={contractLocations()} />}
          <DigiBox
            data-testid="SelectedContract__BriefingWrapper"
            sx={{
              width: '80%',
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
            <DigiTitle
              data-testid="SelectedContract-Briefing__BriefingTitle"
              variant="body2"
            >
              Briefing
            </DigiTitle>
            <ParagraphWrapper
              data-testid="SelectedContract-Briefing__ContentWrapper"
              sx={{
                mx: '10%',
                mt: '.5em',
                maxHeight: '100px',
                p: '.5em',
              }}
            >
              <Typography
                data-testid="SelectedContract-Briefing__ContentText"
                variant="paragraph"
                sx={{
                  pl: '.5em',
                  fontSize: '.85em',
                }}
              >
                {contract.briefing}
              </Typography>
            </ParagraphWrapper>
          </DigiBox>
          <ControlPanelBox
            data-testid="SelectedContract__ControllerContainer"
            sx={{
              mt: 'auto',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', color: 'text.secondary', cursor: 'default' }}
            >
              Contract Controller
            </Typography>
            <ContractController
              contract={contract}
              userBid={userBid}
              isOwned={isContractOwned}
            />
          </ControlPanelBox>
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
                <TabListHolo
                  data-testid="SelectedContract-ContractManagement__TabList"
                  onChange={handleContractManageView}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="fullWidth"
                  sx={{
                    px: '1em',
                    py: '.2em',
                  }}
                >
                  <Tab label="Contractors" value="contractors" />
                  <Tab disabled label="Payroll" value="payroll" />
                  <Tab disabled label="Ships" value="ships" />
                </TabListHolo>
                <TabPanel
                  value="contractors"
                  sx={{
                    height: '100%',
                  }}
                >
                  <ContractorsManager contract={contract} isOwned={isContractOwned} />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
