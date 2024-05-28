import {
  AvatarGroup,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { UserDisplay } from '@/Common/UserDisplay';
import { SalvageIcon } from '@Common/CustomIcons';
import { ExpandLess, ExpandMore, HelpOutline } from '@mui/icons-material';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';

type BriefingViewerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: IContract;
};

export const ContractBriefingViewer: React.FC<BriefingViewerProps> = ({ contract }) => {
  const dispatch = useAppDispatch();

  const [briefingExpanded, setBriefingExpanded] = React.useState(true);
  const [payExpanded, setPayExpanded] = React.useState(true);

  const toggleBriefingExpand = React.useCallback(() => {
    setBriefingExpanded(!briefingExpanded);
  }, [briefingExpanded]);

  const togglePayExpand = React.useCallback(() => {
    setPayExpanded(!payExpanded);
  }, [payExpanded]);

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

  return (
    <Box
      data-testid="ContractViewer-ContractBriefing__Container"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
        }}
      >
        <Box
          data-testid="ContractViewer-ContractBriefing__PayandBriefingContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            mt: '2em',
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
              <TextField
                size="small"
                label="Default Pay"
                value={contract.defaultPay}
                color="secondary"
                margin="dense"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
