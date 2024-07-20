import { OutlinedLabel } from '@Common/Components/App/OutlinedLabel';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type ContractorProps = {
  bid: IContractBid;
  user: IUser;
  pay: string;
  contractOwned: boolean;
};

export const Contractor: React.FC<ContractorProps> = ({
  user,
  pay,
  bid,
  contractOwned,
}) => {
  const dispatch = useAppDispatch();
  const handleAccept = () => {
    const updatedBid = { status: 'ACCEPTED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    );
  };
  const handleReject = () => {
    const updatedBid = { status: 'REJECTED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    );
  };
  const handleDismiss = () => {};

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
          <UserChip user={user} size="medium" />
        </Tooltip>
      </Box>
      {contractOwned && bid.status === 'PENDING' && (
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
      {contractOwned && bid.status === 'ACCEPTED' && (
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
      {contractOwned && bid.status === 'REJECTED' && (
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
      {/* {contractOwned && bid.status === 'DISMISSED' && (
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
      )} */}
    </Box>
  );
};
