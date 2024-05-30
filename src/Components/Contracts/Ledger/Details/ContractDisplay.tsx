//ToDo-- Need to change out the boxes that expand and collapse w/ Mui Collapse Component for better transition effects
import { SalvageIcon } from '@Common/CustomIcons';
import { LocationChip } from '@Common/LocationChip';
import { ExpandLess, ExpandMore, HelpOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
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
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { UserDisplay } from '@/Common/UserDisplay';

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

  const [briefingExpanded, setBriefingExpanded] = React.useState(true);
  const [payExpanded, setPayExpanded] = React.useState(true);
  const [locationsExpanded, setLocationsExpanded] = React.useState(true);
  const [activeDataTab, setActiveDataTab] = React.useState('contractors');
  const [timeTab, setTimeTab] = React.useState('bid');

  const handleActiveTabChange = React.useCallback(
    (event: React.SyntheticEvent, value: string) => {
      setActiveDataTab(value);
    },
    [activeDataTab],
  );

  const handleTimeTabChange = React.useCallback(
    (event: React.SyntheticEvent, value: string) => {
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
      switch (panel) {
        case 'contractors':
          return <ContractorsPanel contract={contract} />;
        case 'ships':
          return;
        default:
          return;
      }
    },
    [activeDataTab],
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
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID));
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
            }}
          >
            <Box
              data-testid="ContractDisplay-Info__TitleBar"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'rgba(14,49,141,.25)',
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
                  sx={{ fontWeight: 'bold', maxWidth: '80%' }}
                >
                  {contract.title}
                </Typography>
              </Tooltip>
              <Box sx={{ flexGrow: '1', display: 'flex' }} />
              <Tooltip title="Archetype">
                <SalvageIcon fontSize="large" />
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
                  backgroundColor: 'rgba(14,49,141,.25)',
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
                  label={contract.status}
                  color={statusColor}
                  size="small"
                />
              </Box>
              <Box
                data-testid="ContractDisplay-Info-Details__SubTypeWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(14,49,141,.25)',
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
                <Chip variant="outlined" size="small" color="secondary" label="SubType" />
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
            }}
          >
            <Typography
              data-testid="ContractDisplay-PayandBriefing__BriefingTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
                my: '.5em',
              }}
            >
              Briefing
              <IconButton
                data-testid="ContractDisplay-PayandBriefing__BriefingExpansionButton"
                size="small"
                onClick={toggleBriefingExpand}
              >
                {briefingExpanded ? (
                  <ExpandMore fontSize="small" />
                ) : (
                  <ExpandLess fontSize="small" />
                )}
              </IconButton>
            </Typography>
            <Box
              data-testid="ContractDisplay-Briefing__ContentsWrapper"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
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
                hidden={!briefingExpanded}
              >
                {contract.briefing}
              </Typography>
            </Box>
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
            }}
          >
            <Typography
              data-testid="ContractDisplay-PayandBriefing__PayTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                my: '.5em',
                fontWeight: 'bold',
              }}
            >
              Pay
              <IconButton
                data-testid="ContractDisplay-PayandBriefing_PayExpansionButton"
                size="small"
                onClick={togglePayExpand}
              >
                {payExpanded ? (
                  <ExpandMore fontSize="small" />
                ) : (
                  <ExpandLess fontSize="small" />
                )}
              </IconButton>
            </Typography>
            {payExpanded ? (
              <Box
                data-testid="ContractDisplay-PayandBriefing_PayInfoWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  mb: '.5em',
                }}
              >
                <Tooltip title={contract.payStructure} arrow>
                  <TextField
                    size="small"
                    label="Pay Structure"
                    value={contract.payStructure}
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
                  />
                </Tooltip>
              </Box>
            ) : (
              <></>
            )}
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
            }}
          >
            <Typography
              data-testid="ContractDisplay__LocationTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
                m: '.5em',
              }}
            >
              Locations
              <IconButton
                data-testid="ContractDisplay-Locations_LocationsExpansionButton"
                size="small"
                onClick={toggleLocationsExpand}
              >
                {locationsExpanded ? (
                  <ExpandMore fontSize="small" />
                ) : (
                  <ExpandLess fontSize="small" />
                )}
              </IconButton>
            </Typography>
            {locationsExpanded ? (
              <Box
                data-testid="ContractDisplay-Locations__LocationsListWrapper"
                sx={{
                  mb: '.5em',
                  width: '100%',
                }}
              >
                <Box
                  data-testid="ContractDisplay-Locations__StartLocationWrapper"
                  sx={{
                    backgroundColor: 'rgba(14,49,141,.25)',
                    borderRadius: '10px',
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
                  <LocationChip label="Start" />
                </Box>
                <Box
                  data-testid="ContractDisplay-Locations__EndLocationWrapper"
                  sx={{
                    backgroundColor: 'rgba(14,49,141,.25)',
                    borderRadius: '10px',
                    mt: '.5em',
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
                  <LocationChip label="End" />
                </Box>
                <Box
                  data-testid="ContractDisplay-Locations__OtherLocationsWrapper"
                  sx={{
                    backgroundColor: 'rgba(14,49,141,.25)',
                    borderRadius: '10px',
                    mt: '.5em',
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
                    Other Locations
                  </Typography>
                  <LocationChip label="Other" />
                </Box>
              </Box>
            ) : (
              <></>
            )}
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
