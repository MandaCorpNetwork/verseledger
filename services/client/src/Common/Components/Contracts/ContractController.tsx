import { Box, Button, Typography } from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { POPUP_EDIT_CONTRACT } from '@Popups/Contracts/EditContract/EditContract';
import { POPUP_SUBMIT_RATING } from '@Popups/Ratings/SubmitRating';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid.action';
import { updateContract } from '@Redux/Slices/Contracts/actions/patch/updateContract.action';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

type ContractControllerProps = {
  mobileView?: boolean;
  contract: IContract;
  deselectContract?: () => void;
  dashboard?: boolean;
};

export const ContractController: React.FC<ContractControllerProps> = (props) => {
  const { mobileView = false, contract, deselectContract, dashboard = 'false' } = props;
  const { overwriteURLQuery } = useURLQuery();
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  const location = useLocation();
  const currentUser = useAppSelector(selectCurrentUser);
  const isOwned = contract.owner_id === currentUser?.id;
  const userBid = React.useMemo(() => {
    if (isOwned) return null;
    return contract.Bids?.find((bid) => bid.user_id === currentUser?.id) ?? null;
  }, [currentUser, isOwned, contract]);
  const contractEnded = contract.status === 'COMPLETED' || contract.status === 'CANCLED';
  const acceptedContractors =
    contract.Bids?.filter((bid) => bid.status === 'ACCEPTED') ?? [];
  const hasAccepted =
    userBid?.status === 'ACCEPTED' ||
    userBid?.status === 'DISMISSED' ||
    userBid?.status === 'WITHDRAWN';
  const variant = mobileView ? 'contained' : 'outlined';

  const getContractors = React.useCallback(() => {
    //CHECK: Successfully Finds Bid
    // console.log('Found Bids:', contract.Bids);
    return contract.Bids?.filter(
      (bid) =>
        bid.status === 'ACCEPTED' ||
        bid.status === 'WITHDRAWN' ||
        bid.status === 'DISMISSED',
    ).map((bid) => bid.User);
  }, [contract.Bids]);

  const currentContractors = getContractors();

  const getCompletedReviews = React.useCallback(() => {
    return contract.Ratings?.filter(
      (rating) => rating.submitter_id === currentUser?.id,
    ).map((rating) => rating);
  }, [contract.Ratings, currentUser]);

  const completedReviews = getCompletedReviews();

  const reviewCompleted =
    (isOwned && currentContractors?.length !== completedReviews?.length) ||
    (userBid &&
      completedReviews &&
      currentContractors?.length !== completedReviews?.length - 1);

  const handleAcceptInvite = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Invite doesn't Exist`, { variant: 'error' });
      playSound('error');
      return;
    }
    const updatedBid = { status: 'ACCEPTED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        if (dashboard) {
          overwriteURLQuery({
            [QueryNames.ContractManagerTab]: 'employed',
            [QueryNames.Contract]: contract.id,
          });
        }
        enqueueSnackbar('Accepted Invite', { variant: 'success' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  }, [playSound, userBid, dispatch, contract.id, overwriteURLQuery, dashboard]);

  const handleDeclineInvite = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Invite doesn't Exist`, { variant: 'error' });
      playSound('error');
      return;
    }
    const updatedBid = { status: 'DECLINED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        if (deselectContract) {
          deselectContract();
        }
        enqueueSnackbar('Declined Invite', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, playSound, dispatch, contract.id, deselectContract]);

  const handleWithdrawBid = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return;
    }
    const updatedBid = { status: 'WITHDRAWN' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        if (dashboard) {
          if (location.pathname !== '/dashboard/contracts?cmTab=pending') {
            overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'pending' });
          }
        }
        enqueueSnackbar('Resigned from Contract', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Resigning', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, playSound, dispatch, contract.id, dashboard, location, overwriteURLQuery]);

  const handleCancelBid = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return;
    }
    const updatedBid = { status: 'EXPIRED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        if (dashboard) {
          if (location.pathname !== '/dashboard/contracts?cmTab=pending') {
            overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'pending' });
          }
        }
        enqueueSnackbar('Canceled Bid', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Resigning', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, playSound, dispatch, contract.id, dashboard, location, overwriteURLQuery]);

  const handleResubmitBid = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return;
    }
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  }, [userBid, dispatch, contract, playSound]);

  const getResubmitBidText = React.useCallback(() => {
    if (!userBid) return;
    if (userBid.status === 'DISMISSED')
      return 'You have been Dismissed from this Contract';
    if (userBid.status === 'WITHDRAWN') return 'You have Withdrawn from this Contract';
    if (userBid.status === 'EXPIRED') return 'Your Bid has Expired on this Contract';
  }, [userBid]);

  const resubmitBidText = getResubmitBidText();

  const getUpdatedContractStatus = React.useCallback(
    (
      contract: Partial<IContract>,
      status: string,
      startDate?: Date,
      endDate?: Date,
      bidDate?: Date,
    ) => {
      return {
        status,
        title: contract.title,
        subtype: contract.subtype,
        briefing: contract.briefing,
        contractorLimit: contract.contractorLimit,
        payStructure: contract.payStructure,
        defaultPay: contract.defaultPay,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(bidDate && { bidDate }),
      };
    },
    [],
  );

  const endBidding = React.useCallback(() => {
    const now = new Date();
    const updatedContract = getUpdatedContractStatus(
      contract,
      'PENDING',
      undefined,
      undefined,
      now,
    );
    if (contract.status === 'BIDDING') {
      dispatch(
        updateContract({ contractId: contract.id, contractRaw: updatedContract }),
      ).then((res) => {
        if (updateContract.fulfilled.match(res)) {
          enqueueSnackbar('Bidding Closed', { variant: 'info' });
          playSound('success');
        } else {
          enqueueSnackbar('Error Closing Bidding', { variant: 'error' });
          playSound('error');
        }
      });
    }
  }, [contract, dispatch, getUpdatedContractStatus, playSound]);

  const handleEndBidding = React.useCallback(() => {
    const now = new Date();
    if (contract.bidDate && contract.bidDate < now) {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'End Bidding',
          subjectText: `Ending Bidding on ${contract.title}`,
          bodyText: `Are you sure you want to end bidding before the set end time (${contract.bidDate.toLocaleString()})?`,
          acceptText: 'End Bidding',
          cancelText: 'Wait',
          clickaway: true,
          onAccept: endBidding,
        }),
      );
    } else {
      endBidding();
    }
  }, [contract.bidDate, contract.title, dispatch, endBidding]);

  const startContract = React.useCallback(() => {
    const now = new Date();
    if (contract.status === 'BIDDING' || contract.status === 'PENDING') {
      const updatedContract = getUpdatedContractStatus(contract, 'INPROGRESS', now);
      dispatch(
        updateContract({ contractId: contract.id, contractRaw: updatedContract }),
      ).then((res) => {
        if (updateContract.fulfilled.match(res)) {
          enqueueSnackbar('Contract Started', { variant: 'success' });
          playSound('success');
        } else {
          enqueueSnackbar('Error Starting Contract', { variant: 'error' });
          playSound('error');
        }
      });
    }
  }, [contract, dispatch, getUpdatedContractStatus, playSound]);

  const getStartBodyText = React.useCallback(() => {
    const now = new Date();
    if (
      contract.status === 'BIDDING' ||
      (contract.status === 'PENDING' && contract.startDate && contract.startDate < now)
    ) {
      return `Are you sure you want to start the contract before the set start time (${contract.startDate?.toLocaleString()})?`;
    } else if (contract.bidDate && contract.bidDate < now) {
      return `Are you sure you want to start the contract before the set bidding close (${contract.bidDate.toLocaleString()})?`;
    } else {
      return `Are you sure you want to start the contract?`;
    }
  }, [contract.status, contract.startDate, contract.bidDate]);

  const startBodyText = getStartBodyText();

  const handleStartContract = React.useCallback(() => {
    const now = new Date();
    if (contract.startDate && contract.startDate > now) {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'Start Contract',
          subjectText: `Starting Contract ${contract.title}`,
          bodyText: startBodyText,
          acceptText: 'Start Contract',
          cancelText: 'Wait',
          clickaway: true,
          onAccept: startContract,
        }),
      );
    } else {
      startContract();
    }
  }, [contract.startDate, contract.title, dispatch, startBodyText, startContract]);

  const openReview = React.useCallback(() => {
    if (currentContractors && currentContractors.length !== 0) {
      //TODO: Fix reviewCompleted
      dispatch(
        openPopup(POPUP_SUBMIT_RATING, {
          users: currentContractors,
          contract: contract,
        }),
      );
    }
  }, [currentContractors, contract, dispatch]);

  const completeContract = React.useCallback(() => {
    const now = new Date();
    const updatedContract = getUpdatedContractStatus(
      contract,
      'COMPLETED',
      undefined,
      now,
    );
    dispatch(
      updateContract({ contractId: contract.id, contractRaw: updatedContract }),
    ).then((res) => {
      if (updateContract.fulfilled.match(res)) {
        if (dashboard) {
          overwriteURLQuery({
            [QueryNames.ContractManagerTab]: 'closed',
          });
        }
        enqueueSnackbar('Contract Completed', { variant: 'success' });
        playSound('success');
        openReview();
      } else {
        enqueueSnackbar('Error Completing Contract Contract', { variant: 'error' });
        playSound('error');
      }
    });
  }, [
    contract,
    getUpdatedContractStatus,
    dispatch,
    overwriteURLQuery,
    playSound,
    dashboard,
    openReview,
  ]);

  const getCompleteBodyText = React.useCallback(() => {
    const now = new Date();
    if (contract.status === 'INPROGRESS' && contract.endDate && contract.endDate < now) {
      return `Are you sure you want to complete the contract before the set end time (${contract.endDate.toLocaleString()})?`;
    } else {
      return `Are you sure you are ready to complete the contract?`;
    }
  }, [contract.endDate, contract.status]);

  const completeBodyText = getCompleteBodyText();

  const handleContractComplete = React.useCallback(() => {
    if (contract.status === 'INPROGRESS') {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'Complete Contract',
          acceptText: 'Complete',
          cancelText: 'Wait',
          onAccept: completeContract,
          clickaway: true,
          subjectText: `Completeting Contract ${contract.title}`,
          bodyText: completeBodyText,
        }),
      );
    }
  }, [contract.status, contract.title, dispatch, completeContract, completeBodyText]);

  const cancelContract = React.useCallback(() => {
    const now = new Date();
    if (contract.status !== 'COMPLETE') {
      const updatedContract = getUpdatedContractStatus(
        contract,
        'CANCELED',
        undefined,
        now,
      );
      dispatch(
        updateContract({ contractId: contract.id, contractRaw: updatedContract }),
      ).then((res) => {
        if (updateContract.fulfilled.match(res)) {
          if (dashboard) {
            overwriteURLQuery({
              [QueryNames.ContractManagerTab]: 'history',
              [QueryNames.Contract]: contract.id,
            });
          }
          enqueueSnackbar('Contract Canceled', { variant: 'warning' });
          playSound('warning');
          openReview();
        } else {
          enqueueSnackbar('Error Canceling Contract', { variant: 'error' });
          playSound('error');
        }
      });
    }
  }, [
    contract,
    getUpdatedContractStatus,
    dispatch,
    dashboard,
    overwriteURLQuery,
    playSound,
    openReview,
  ]);

  const getCancelBodyText = React.useCallback(() => {
    const now = new Date();
    if (contract.status !== 'INPROGRESS') {
      return `Are you sure you want to cancel the contract?`;
    } else if (contract.endDate && contract.endDate < now) {
      return `Are you sure you want to cancel the contract before the set end time (${contract.endDate.toLocaleString()})?`;
    } else {
      return `Are you sure you want to cancel the contract?`;
    }
  }, [contract.status, contract.endDate]);

  const cancelBodyText = getCancelBodyText();

  const handleCancelContract = React.useCallback(() => {
    dispatch(
      openPopup(POPUP_YOU_SURE, {
        title: 'Cancel Contract',
        acceptText: 'Cancel',
        cancelText: 'Wait',
        onAccept: cancelContract,
        clickaway: true,
        subjectText: `Canceling Contract ${contract.title}`,
        bodyText: cancelBodyText,
      }),
    );
  }, [dispatch, cancelBodyText, cancelContract, contract.title]);

  const handleEditContract = React.useCallback(() => {
    if (contract.status === 'COMPLETED' || contract.status === 'CANCELED') {
      playSound('denied');
      enqueueSnackbar('Not able to edit this Contract', { variant: 'error' });
      return;
    }
    playSound('open');
    dispatch(openPopup(POPUP_EDIT_CONTRACT, { contract: contract }));
  }, [contract, dispatch, playSound]);
  return (
    <Box
      data-testid="ContractController_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: mobileView ? 'column' : 'row',
        width: '100%',
        alignItems: mobileView ? 'stretch' : 'center',
        gap: '.5em',
      }}
    >
      {isOwned && contract.status === 'BIDDING' && (
        <Button
          data-testid="ContractController__EndBidding_Button"
          variant={variant}
          color="secondary"
          size="medium"
          fullWidth
          onClick={handleEndBidding}
          disabled={acceptedContractors.length === 0}
        >
          End Bidding
        </Button>
      )}
      {isOwned && (contract.status === 'BIDDING' || contract.status === 'PENDING') && (
        <Button
          data-testid="ContractController__StartContract_Button"
          variant={variant}
          color="secondary"
          size="medium"
          fullWidth
          onClick={handleStartContract}
          disabled={acceptedContractors.length === 0}
        >
          Start
        </Button>
      )}
      {isOwned && contract.status === 'INPROGRESS' && (
        <Button
          data-testid="ContractController__CompleteContract_Button"
          variant={variant}
          color="success"
          size="medium"
          fullWidth
          onClick={handleContractComplete}
          disabled={acceptedContractors.length === 0}
        >
          Complete
        </Button>
      )}
      {isOwned && !contractEnded && (
        <Button
          data-testid="ContractController__EditContract_Button"
          variant={variant}
          color="info"
          size="medium"
          fullWidth
          onClick={handleEditContract}
        >
          Edit
        </Button>
      )}
      {isOwned && !contractEnded && (
        <Button
          data-testid="ContractController__CancelContract_Button"
          variant={variant}
          color={contract.status !== 'INPROGRESS' ? 'warning' : 'error'}
          size="medium"
          fullWidth
          onClick={handleCancelContract}
        >
          Cancel
        </Button>
      )}
      {!isOwned && userBid?.status === 'INVITED' && !contractEnded && (
        <Button
          data-testid="ContractController__AcceptInvite_Button"
          variant={variant}
          color="success"
          size="medium"
          fullWidth
          onClick={handleAcceptInvite}
        >
          Accept Invite
        </Button>
      )}
      {!isOwned && userBid?.status === 'INVITED' && !contractEnded && (
        <Button
          data-testid="ContractController__DeclineInvite_Button"
          variant={variant}
          color="error"
          size="medium"
          fullWidth
          onClick={handleDeclineInvite}
        >
          Decline Invite
        </Button>
      )}
      {!isOwned && userBid?.status === 'PENDING' && !contractEnded && (
        <Button
          data-testid="ContractController__CancelBid_Button"
          variant={variant}
          color="success"
          size="medium"
          fullWidth
          onClick={handleCancelBid}
        >
          Cancel Bid
        </Button>
      )}
      {!isOwned && userBid?.status === 'ACCEPTED' && !contractEnded && (
        <Button
          data-testid="ContractController__WithdrawBid_Button"
          variant={variant}
          color="success"
          size="medium"
          fullWidth
          onClick={handleWithdrawBid}
        >
          Withdraw
        </Button>
      )}
      {!isOwned && userBid?.status === 'REJECTED' && !contractEnded && (
        <Typography
          data-testid="ContractController__RejectedBid_Text"
          sx={{ fontWeight: 'bold', color: 'info.main' }}
        >
          Bid was Rejected
        </Typography>
      )}
      {!isOwned && userBid?.status === 'DECLINED' && !contractEnded && (
        <>
          <Button
            data-testid="ContractController__SubmitBid_Button"
            variant={variant}
            color="success"
            size="medium"
            fullWidth
            onClick={handleResubmitBid}
          >
            Submit Bid
          </Button>
          <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
            You Declined an Invite.
          </Typography>
        </>
      )}
      {!isOwned && hasAccepted && !contractEnded && (
        <>
          <Button
            data-testid="ContractController__ResubmitBid_Button"
            variant={variant}
            color="secondary"
            size="medium"
            fullWidth
            onClick={handleResubmitBid}
          >
            Resubmit Bid
          </Button>
          <Typography
            data-testid="ContractController__Resubmit_Text"
            sx={{ fontWeight: 'bold', color: 'info.main' }}
          >
            {resubmitBidText}
          </Typography>
        </>
      )}
      {!isOwned && !userBid && !contractEnded && (
        <Button
          data-testid="ContractController__SubmitBid_Button"
          variant={variant}
          color="secondary"
          size="medium"
          fullWidth
          onClick={handleResubmitBid}
        >
          Submit Bid
        </Button>
      )}
      {(isOwned || hasAccepted) && contractEnded && (
        <Button
          data-testid="ContractController__SubmitRatings_Button"
          variant={variant}
          color="info"
          size="medium"
          fullWidth
          onClick={openReview}
          disabled={(reviewCompleted || currentContractors?.length) == 0}
        >
          Submit Ratings
        </Button>
      )}
    </Box>
  );
};
