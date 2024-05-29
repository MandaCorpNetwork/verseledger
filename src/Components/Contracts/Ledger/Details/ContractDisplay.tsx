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
          return <BidPanel />;
        case 'start':
          return <StartPanel />;
        case 'end':
          return <EndPanel />;
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
          return <ContractorsPanel />;
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
      data-testid="ContractViewer-ContractBriefing__Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        data-testid="ContractViewer-ContractBriefing__TopBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <UserDisplay userid={contract.owner_id} />
        <Box
          data-testid="ContractViewer-ContractBriefing-TopBox__TitleContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            data-testid="ContractViewer-ContractBriefing-Info__TitleBoxWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              p: '.5em',
              ml: '1em',
              minWidth: '250px',
            }}
          >
            <Box
              data-testid="ContractViewer-ContractBriefing-Info__TitleBar"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                p: '.2em',
                justifyContent: 'space-around',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {contract.title}
              </Typography>
              <Box sx={{ flexGrow: '1', display: 'flex' }} />
              <SalvageIcon fontSize="large" />
            </Box>
            <Box
              data-testid="ContractViewer-ContractBriefing__DetailsContainer"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: '.5em',
              }}
            >
              <Box
                data-testid="ContractViewer-ContractBriefing-Info-Details__StatusWrapper"
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
                  data-testid="ContractViewer-ContractBriefing-Info-Details__StatusTitle"
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
                data-testid="ContractViewer-ContractBriefing-Info-Details__SubTypeWrapper"
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
                  data-testid="ContractViewer-ContractBriefing-Info-Details__SubTypeTitle"
                  align="center"
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Contract SubTypes
                </Typography>
                <Chip
                  variant="outlined"
                  size="small"
                  color="secondary"
                  label={contract.subType}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        data-testid="ContractViewer-ContractBriefing__MiddleBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <Box
          data-testid="ContractViewer-ContractBriefing__PayandBriefingContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            mt: '2em',
            alignContent: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Box
            data-testid="ContractViewer-ContractBriefing-PayandBriefing__BriefingWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'inherit',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              p: '.5em',
              width: '100%',
            }}
          >
            <Typography
              data-testid="ContractViewer-ContractBriefing-PayandBriefing__BriefingTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
              }}
            >
              Briefing
              <IconButton
                data-testid="ContractViewer-ContractBriefing-PayandBriefing__BriefingExpansionButton"
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
            <Typography
              data-testid="ContractViewer-ContractBriefing-PayandBriefing__BriefingContent"
              variant="body2"
              hidden={!briefingExpanded}
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                px: '1em',
                mt: '.5em',
              }}
            >
              {contract.briefing}
            </Typography>
          </Box>
          <Box
            data-testid="ContractViewer-ContractBriefing-PayandBriefing__PayWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'inherit',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              p: '.5em',
              width: '100%',
              mt: '1em',
            }}
          >
            <Typography
              data-testid="ContractViewer-ContractBriefing-PayandBriefing__PayTitle"
              variant="body2"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
                fontWeight: 'bold',
              }}
            >
              Pay
              <IconButton
                data-testid="ContractViewer-ContractBriefing-PayandBriefing_PayExpansionButton"
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
            <Box
              data-testid="ContractViewer-ContractBriefing-PayandBriefing_PayInfoWrapper"
              hidden={!payExpanded}
              sx={{
                display: 'flex',
                flexDirection: 'row',
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
          </Box>
        </Box>
        <Box
          data-testid="ContractViewer-ContractBriefing__LocationContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '5px',
            borderColor: 'primary.main',
            p: '.5em',
            width: '45%',
            mt: '1em',
          }}
        >
          <Typography
            data-testid="ContractViewer-ContractBriefing__LocationTitle"
            variant="body2"
            sx={{
              backgroundColor: 'rgba(14,49,141,.25)',
              borderRadius: '10px',
              pl: '1em',
              fontWeight: 'bold',
            }}
          >
            Locations
            <IconButton
              data-testid="ContractViewer-ContractBriefing-Locations_LocationsExpansionButton"
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
          <Box
            data-testid="ContractViewer-ContractBriefing-Locations__StartLocationWrapper"
            sx={{
              backgroundColor: 'rgba(14,49,141,.25)',
              borderRadius: '10px',
              mt: '.5em',
              mx: '.5em',
              p: '.2em',
            }}
          >
            <Typography
              data-testid="ContractViewer-ContractBriefing-Locations-StartLocation__Title"
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
            data-testid="ContractViewer-ContractBriefing-Locations__EndLocationWrapper"
            sx={{
              backgroundColor: 'rgba(14,49,141,.25)',
              borderRadius: '10px',
              mt: '.5em',
              mx: '.5em',
              justifyContent: 'center',
            }}
          >
            <Typography
              data-testid="ContractViewer-ContractBriefing-Locations-StartLocation__Title"
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
            data-testid="ContractViewer-ContractBriefing-Locations__OtherLocationsWrapper"
            sx={{
              backgroundColor: 'rgba(14,49,141,.25)',
              borderRadius: '10px',
              mt: '.5em',
              mx: '.5em',
              justifyContent: 'center',
            }}
          >
            <Typography
              data-testid="ContractViewer-ContractBriefing-Locations-StartLocation__Title"
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
      </Box>
      <Box
        data-testid="ContractViewer-ContractBriefing__ActiveDataContainer"
        sx={{
          mt: '1em',
          width: '100%',
          height: '35%',
          p: '.5em',
        }}
      >
        <Box
          data-testid="ContractViewer-ContractBriefing-ActiveData__TabWrapper"
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
            <SmallTab label="Ships" value="ships" />
          </SmallTabs>
        </Box>
        <Box
          data-testid="ContractViewer-ContractBriefing-ActiveData__PanelContainer"
          sx={{
            width: '100%',
            height: '50%',
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
        data-testid="ContractViewer-ContractBriefing__BottomBox"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          mt: '2em',
        }}
      >
        <Box
          data-testid="ContractViewer-ContractBriefing__ContractTimeContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '5px',
            borderColor: 'primary.main',
            p: '.5em',
            width: '75%',
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
          <Box data-testid="ContractViewer-ContractBriefing-ContractTime__PanelWrapper">
            {contractTimePanel(timeTab)}
          </Box>
        </Box>
        <Box data-testid="ContractViewer-ContractBriefing__SubmitBidButton">
          <Button variant="contained" color="secondary" onClick={handleSubmitBidPopup}>
            Submit Bid
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
