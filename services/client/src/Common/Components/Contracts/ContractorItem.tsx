import { useSoundEffect } from '@Audio/AudioManager';
import { RatingDisplay } from '@Common/Components/App/RatingDisplay';
import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_COUNTER_OFFER_BID } from '@Popups/Contracts/ContractBids/CounterOffer';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid.action';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type ContractorProps = {
  bid: IContractBid | null;
  user: IUser | null;
  contractOwned: boolean;
  contract: IContract;
};

export const Contractor: React.FC<ContractorProps> = ({
  user,
  bid,
  contractOwned,
  contract,
}) => {
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  // const closed = contract.status === 'COMPLETED' || contract.status === 'CANCELED';
  const handleAccept = React.useCallback(() => {
    const updatedBid = { status: 'ACCEPTED' as const };
    if (bid == null) return;
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
  }, [dispatch, playSound, bid]);

  const handleReject = React.useCallback(() => {
    const updatedBid = { status: 'REJECTED' as const };
    if (bid == null) return;
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
  }, [bid, playSound, dispatch]);

  const handleDismiss = React.useCallback(() => {
    const updatedBid = { status: 'DISMISSED' as const };
    if (bid == null) return;
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
  }, [bid, dispatch, playSound]);

  const handleInvite = React.useCallback(() => {
    const updatedBid = { status: 'INVITED' as const };
    if (bid == null) return;
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
  }, [bid, dispatch, playSound]);

  const handleCancelInvite = React.useCallback(() => {
    const updatedBid = { status: 'EXPIRED' as const };
    if (bid == null) return;
    console.log(bid);
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
  }, [bid, playSound, dispatch]);

  const handleOpenOffer = React.useCallback(() => {
    dispatch(openPopup(POPUP_COUNTER_OFFER_BID, { bid, contract }));
  }, [dispatch, bid, contract]);

  const getBidStatusColor = React.useCallback((status: string | null) => {
    switch (status) {
      case 'PENDING':
        return 'info';
      case 'ACCEPTED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'DECLINED':
      case 'WITHDRAWN':
        return 'warning';
      case 'EXPIRED':
        return 'primary';
      case 'INVITED':
      default:
        return 'secondary';
    }
  }, []);

  const bidStatusColor = bid ? getBidStatusColor(bid.status) : 'secondary';

  const getUserRating = React.useCallback(() => {
    if (user == null) return;
    const userRatings = contract.Ratings?.filter(
      (rating) => rating.reciever_id === user.id,
    );
    if (!userRatings || userRatings.length === 0) return 0;
    const ratingSum = userRatings.reduce((acc, rating) => acc + rating.rating_value, 0);
    return ratingSum / userRatings.length;
  }, [contract, user]);

  const userRating = getUserRating();

  const isEnded = contract.status === 'CANCELED' || contract.status === 'COMPLETED';

  const hasAccepted =
    bid &&
    (bid.status === 'ACCEPTED' ||
      bid.status === 'DISMISSED' ||
      bid.status === 'WITHDRAWN');

  return (
    <ControlPanelBox
      data-testid="ContractorsTab-ContractorList__ContractorBox"
      sx={{
        flexDirection: 'row',
        my: '1em',
        px: '1em',
        py: '.2em',
        maxHeight: '50px',
        justifyContent: 'space-between',
        '@media (max-width: 1799px)': {
          flexDirection: 'column',
          flexWrap: 'wrap',
          maxHeight: '70px',
        },
      }}
    >
      {user && (
        <UserChip
          user={user}
          size="medium"
          color={bidStatusColor}
          sx={{ maxWidth: '125px' }}
        />
      )}
      {(bid?.status === 'PENDING' || bid?.status === 'INVITED') &&
        bid.amount !== contract.defaultPay && (
          <PayDisplay
            label="Current Offer"
            pay={bid.amount}
            structure={contract.payStructure as ContractPayStructure}
            sx={{ width: '120px' }}
          />
        )}
      {bid?.status === 'ACCEPTED' && (
        <Typography
          variant={contractOwned ? 'body2' : 'overline'}
          sx={{ color: 'success.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
        >
          Active
        </Typography>
      )}
      {bid?.status === 'EXPIRED' && (
        <Typography
          variant="overline"
          sx={{ color: 'warning.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
        >
          Cancled Bid
        </Typography>
      )}
      {bid?.status === 'WITHDRAWN' && (
        <Typography
          variant="overline"
          sx={{ color: 'error.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
        >
          Withdrawn Contractor
        </Typography>
      )}
      {bid?.status === 'INVITED' && bid?.amount === contract.defaultPay && (
        <Typography
          variant="overline"
          sx={{ color: 'secondary.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
        >
          Invited Contractor
        </Typography>
      )}
      {bid?.status === 'INVITED' && bid?.amount !== contract.defaultPay && (
        <Typography
          variant="overline"
          sx={{ color: 'info.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
        >
          {contractOwned ? 'Counter Offer Sent' : 'Counter Recieved'}
        </Typography>
      )}
      {bid?.status === 'DISMISSED' && (
        <Typography
          variant="overline"
          sx={{ color: 'error.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
        >
          Contractor Dismissed
        </Typography>
      )}
      {contractOwned &&
        bid?.status === 'PENDING' &&
        bid?.amount === contract.defaultPay && (
          <Typography
            variant="overline"
            sx={{ color: 'warning.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
          >
            Pending
          </Typography>
        )}
      {contractOwned &&
        bid?.status === 'PENDING' &&
        bid?.amount !== contract.defaultPay && (
          <Typography
            variant="overline"
            sx={{ color: 'warning.main', textShadow: '0 0 5px rgba(0,0,0,.7)' }}
          >
            Pending Offer
          </Typography>
        )}
      {contractOwned &&
        bid?.status === 'PENDING' &&
        bid?.amount === contract.defaultPay &&
        !isEnded && (
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
      {contractOwned &&
        bid?.status === 'PENDING' &&
        bid?.amount !== contract.defaultPay &&
        !isEnded && (
          <Box data-testid="ContractorsTab-ContractorList-Contractor-BidControls__OpenOfferButton_Wrapper">
            <Button
              data-testid="ContractorsTab-ContractorList-Contractor-BidControls__OpenOfferButton"
              color="secondary"
              onClick={handleOpenOffer}
            >
              Open Offer
            </Button>
          </Box>
        )}
      {bid?.status === 'ACCEPTED' && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__PayLabelWrapper"
          sx={{
            my: 'auto',
          }}
        >
          <DigiField label="Ship" slots={{ typography: { variant: 'body2' } }}>
            InDev
          </DigiField>
        </Box>
      )}
      {contractOwned && hasAccepted && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__PayLabelWrapper"
          sx={{
            my: 'auto',
          }}
        >
          <PayDisplay
            label="Pay"
            pay={bid.amount}
            structure={contract.payStructure as ContractPayStructure}
            size="small"
          />
        </Box>
      )}
      {contractOwned && bid?.status === 'ACCEPTED' && !isEnded && (
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
      {contractOwned && bid?.status === 'REJECTED' && (
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
      {contractOwned &&
        (bid?.status === 'REJECTED' ||
          bid?.status === 'DISMISSED' ||
          bid?.status === 'WITHDRAWN') &&
        !isEnded && (
          <Button color="warning" onClick={handleInvite}>
            Reinvite Contractor
          </Button>
        )}
      {contractOwned && bid?.status === 'DECLINED' && (
        <Typography variant="overline" sx={{ color: 'warning.main' }}>
          Declined Invitation
        </Typography>
      )}
      {contractOwned && bid?.status === 'INVITED' && !isEnded && (
        <Button color="warning" variant="text" onClick={handleCancelInvite}>
          Cancel Invite
        </Button>
      )}
      {isEnded && hasAccepted && (
        <RatingDisplay size="small" value={userRating ?? 0} variant="defined" />
      )}
    </ControlPanelBox>
  );
};
