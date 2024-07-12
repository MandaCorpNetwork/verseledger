import { OutlinedLabel } from '@Common/Components/App/OutlinedLabel';
import { Avatar, Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useState } from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type ContractorProps = {
  bid: IContractBid;
  user: IUser;
  pay: string;
  contractOwned: boolean;
};

export const Contractor: React.FC<ContractorProps> = ({ user, pay, bid }) => {
  const [contractorBidStatus, setContractorBidStatus] = useState<string | null>(null);

  const handleAccept = () => setContractorBidStatus('Accepted');
  const handleReject = () => setContractorBidStatus('Rejected');
  const handleDismiss = () => setContractorBidStatus('Dismissed');

  const dispatch = useAppDispatch();

  const handlePlayerCardOpen = () => {
    dispatch(openPopup(POPUP_PLAYER_CARD));
  };

  return (
    <Box
      data-testid="ContractorsTab-ContractorList__ContractorBox"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        my: '.5em',
        borderRadius: '10px',
        px: '1em',
        py: '.2em',
        boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
        backgroundImage:
          'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: 'secondary.main',
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
      <Box
        data-testid="ContractorsTab-ContractorsList-Contractor__ProfileChipWrapper"
        sx={{
          my: 'auto',
        }}
      >
        <Tooltip title={user.displayName} arrow>
          <Chip
            data-testid="ContractorsTab-ContractorList-Contractor__ProfileChip"
            avatar={<Avatar src={user.pfp} />}
            label={user.displayName}
            color="secondary"
            variant="outlined"
            clickable={true}
            onClick={handlePlayerCardOpen}
            sx={{
              width: '115px',
            }}
          />
        </Tooltip>
      </Box>
      {contractorBidStatus === null && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor__BidControlButtonWrapper"
          sx={{
            ml: 'auto',
          }}
        >
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-BidControls__AcceptButton"
            color="success"
            onClick={handleAccept}
            sx={{
              mx: '1em',
            }}
          >
            Accept
          </Button>
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-BidControls__RejectButton"
            color="error"
            onClick={handleReject}
            sx={{
              mx: '1em',
            }}
          >
            Reject
          </Button>
        </Box>
      )}
      {contractorBidStatus === 'Accepted' && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor__AcceptedControlsWrapper"
          sx={{
            ml: 'auto',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__PayLabelWrapper"
            sx={{
              my: 'auto',
            }}
          >
            <OutlinedLabel
              size="small"
              margin="dense"
              label="Pay"
              value={pay}
              startAdornment="¤"
              maxWidth="75px"
              color="text.secondary"
            />
          </Box>
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__DismissButton"
            color="error"
            onClick={handleDismiss}
            sx={{
              mx: '1em',
            }}
          >
            Dismiss
          </Button>
        </Box>
      )}
      {contractorBidStatus === 'Rejected' && (
        <Typography
          data-testid="ContractorsTab-ContractorList-Contractor-BidControl__RejectedBidStatus"
          variant="overline"
          sx={{
            color: 'warning.main',
            my: 'auto',
            mx: 'auto',
          }}
        >
          Rejected
        </Typography>
      )}
      {contractorBidStatus === 'Dismissed' && (
        <Typography
          data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__DismissedContractorStatus"
          variant="overline"
          sx={{
            color: 'error.main',
            my: 'auto',
            mx: 'auto',
          }}
        >
          Dismissed
        </Typography>
      )}
    </Box>
  );
};
