import { OutlinedLabel } from '@Common/Components/App/OutlinedLabel';
import ControlPanelBox from '@Common/Components/Boxes/ControlPanelBox';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid';
import { useSound } from '@Utils/howlerController';
import { enqueueSnackbar } from 'notistack';
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
  const { playSound } = useSound();
  const handleAccept = () => {
    const updatedBid = { status: 'ACCEPTED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Accepted Bid', { variant: 'success' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Accepting Bid', { variant: 'error' });
        playSound('error');
      }
    });
  };
  const handleReject = () => {
    const updatedBid = { status: 'REJECTED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Rejected Bid', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Rejecting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  };
  const handleDismiss = () => {
    const updatedBid = { status: 'EXPIRED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Contractor Dismissed', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Dismissing Contractor', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const handleInvite = () => {
    const updatedBid = { status: 'INVITED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Contractor Invited', { variant: 'default' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Sending Invite', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const handleCancelInvite = () => {
    const updatedBid = { status: 'EXPIRED' as const };
    dispatch(
      updateBid({ contractId: bid.contract_id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Canceled Invite', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Canceling Invite', { variant: 'error' });
        playSound('error');
      }
    });
  };

  return (
    <ControlPanelBox
      data-testid="ContractorsTab-ContractorList__ContractorBox"
      sx={{
        flexDirection: 'row',
        my: '.5em',
        px: '1em',
        py: '.2em',
        justifyContent: 'space-between',
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
      {bid.status === 'ACCEPTED' && (
        <Typography
          variant={contractOwned ? 'body2' : 'overline'}
          sx={{ color: 'success.main' }}
        >
          Active
        </Typography>
      )}
      {bid.status === 'EXPIRED' && (
        <Typography variant="overline" sx={{ color: 'error.main' }}>
          Withdrawn Contractor
        </Typography>
      )}
      {bid.status === 'INVITED' && (
        <Typography variant="overline" sx={{ color: 'secondary.main' }}>
          Invited Contractor
        </Typography>
      )}
      {contractOwned && bid.status === 'PENDING' && (
        <Typography variant="body2" sx={{ color: 'warning.main' }}>
          Pending
        </Typography>
      )}
      {contractOwned && bid.status === 'PENDING' && (
        <Box data-testid="ContractorsTab-ContractorList-Contractor__BidControlButtonWrapper">
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-BidControls__AcceptButton"
            color="success"
            onClick={handleAccept}
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
      {bid.status === 'ACCEPTED' && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__PayLabelWrapper"
          sx={{
            my: 'auto',
          }}
        >
          <OutlinedLabel
            size="small"
            margin="dense"
            label="Ship"
            value="InDev"
            maxWidth="75px"
            color="text.disabled"
          />
        </Box>
      )}
      {contractOwned && bid.status === 'ACCEPTED' && (
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
      )}
      {contractOwned && bid.status === 'ACCEPTED' && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor__AcceptedControlsWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
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
          variant="body2"
          sx={{
            color: 'warning.main',
            my: 'auto',
            mx: 'auto',
          }}
        >
          Rejected Bid
        </Typography>
      )}
      {contractOwned && bid.status === 'REJECTED' && (
        <Button color="warning" onClick={handleInvite}>
          Reinvite Contractor
        </Button>
      )}
      {contractOwned && bid.status === 'DECLINED' && (
        <Typography variant="overline" sx={{ color: 'warning.main' }}>
          Declined Invitation
        </Typography>
      )}
      {contractOwned && bid.status === 'INVITED' && (
        <Button color="warning" variant="text" onClick={handleCancelInvite}>
          Cancel Invite
        </Button>
      )}
    </ControlPanelBox>
  );
};
