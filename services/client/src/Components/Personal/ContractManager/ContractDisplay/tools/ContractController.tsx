import { Box, Button, Typography } from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { POPUP_EDIT_CONTRACT } from '@Popups/Contracts/EditContract/EditContract';
import { POPUP_SUBMIT_RATING } from '@Popups/Ratings/SubmitRating';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid';
import { updateContract } from '@Redux/Slices/Contracts/actions/post/updateContract';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

type ContractControllerProps = {
  contract: IContract;
  userBid: IContractBid | null;
  isOwned: boolean;
  deselectContract: () => void;
};

export const ContractController: React.FC<ContractControllerProps> = ({
  contract,
  userBid,
  isOwned,
  deselectContract,
}) => {
  const [, , overwriteURLQuery] = useURLQuery();
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  const location = useLocation();

  const handleAcceptInvite = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Invite doesn't Exist`, { variant: 'error' });
      playSound('error');
      return Logger.info('no user bid');
    }
    const updatedBid = { status: 'ACCEPTED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        overwriteURLQuery({
          [QueryNames.ContractManagerTab]: 'employed',
          [QueryNames.Contract]: contract.id,
        });
        enqueueSnackbar('Accepted Invite', { variant: 'success' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, contract, dispatch, overwriteURLQuery, playSound, enqueueSnackbar]);

  const handleDeclineInvite = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Invite doesn't Exist`, { variant: 'error' });
      playSound('error');
      return Logger.info('no user bid');
    }
    const updatedBid = { status: 'DECLINED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        deselectContract();
        enqueueSnackbar('Declined Invite', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, enqueueSnackbar, playSound, dispatch, contract, deselectContract]);

  const handleWithdrawBid = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return Logger.info('no user bid');
    }
    const updatedBid = { status: 'EXPIRED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        if (location.pathname === '/personal/ledger/contracts?cmTab=pending') {
          overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'pending' });
        }
        enqueueSnackbar('Resigned from Contract', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Resigning', { variant: 'error' });
        playSound('error');
      }
    });
  }, [
    userBid,
    contract,
    overwriteURLQuery,
    dispatch,
    location,
    playSound,
    enqueueSnackbar,
  ]);

  const handleResubmitBid = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return Logger.info('no user bid');
    }
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  }, [userBid, dispatch]);

  const getUpdatedContractStatus = (
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
  };

  const endBidding = React.useCallback(() => {
    const now = new Date();
    if (contract.status === 'BIDDING') {
      const updatedContract = getUpdatedContractStatus(
        contract,
        'PENDING',
        undefined,
        undefined,
        now,
      );
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
  }, [contract, getUpdatedContractStatus, dispatch]);

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
  }, [dispatch, contract]);

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
  }, [contract, dispatch]);

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
  }, [contract]);

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
  }, [contract, dispatch, startContract]);

  //TODO: Need to add Withdraw Bid Status still to allow rating contractors that leave a contract
  const getActiveBidUsers = React.useCallback(() => {
    return contract.Bids?.filter((bid) => bid.status === 'ACCEPTED').map(
      (bid) => bid.User,
    );
  }, [contract]);

  const contractUsers = getActiveBidUsers();

  const openReview = React.useCallback(() => {
    if (contractUsers) {
      if (contractUsers.length !== 0) {
        dispatch(openPopup(POPUP_SUBMIT_RATING, { users: contractUsers, contract }));
      }
    }
  }, [contractUsers, dispatch]);

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
        overwriteURLQuery({
          [QueryNames.ContractManagerTab]: 'closed',
          [QueryNames.Contract]: contract.id,
        });
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
    dispatch,
    getUpdatedContractStatus,
    overwriteURLQuery,
    playSound,
    openReview,
    enqueueSnackbar,
  ]);

  const getCompleteBodyText = React.useCallback(() => {
    const now = new Date();
    if (contract.status === 'INPROGRESS' && contract.endDate && contract.endDate < now) {
      return `Are you sure you want to complete the contract before the set end time (${contract.endDate.toLocaleString()})?`;
    } else {
      return `Are you sure you are ready to complete the contract?`;
    }
  }, [contract]);

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
  }, [contract, dispatch, completeContract, completeBodyText]);

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
          overwriteURLQuery({
            [QueryNames.ContractManagerTab]: 'history',
            [QueryNames.Contract]: contract.id,
          });
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
    overwriteURLQuery,
    enqueueSnackbar,
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
  }, [contract]);

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
  }, [dispatch, cancelContract, cancelBodyText]);

  const handleEditContract = React.useCallback(() => {
    if (contract.status === 'COMPLETED' || contract.status === 'CANCELED') {
      playSound('denied');
      enqueueSnackbar('Not able to edit this Contract', { variant: 'error' });
      return Logger.info('contract is completed or canceled');
    }
    playSound('open');
    dispatch(openPopup(POPUP_EDIT_CONTRACT, { contract: contract }));
  }, [contract, dispatch, playSound, enqueueSnackbar]);

  const displayReview = React.useCallback(() => {
    if (contract.status === 'COMPLETED' || contract.status === 'CANCELED') {
      if (isOwned) {
        return true;
      } else if (userBid?.status === 'ACCEPTED') {
        return true;
      }
    } else {
      return false;
    }
  }, [contract, userBid, isOwned]);

  return (
    <Box
      data-testid="SelectedContract-Controller__Controls_Wrapper"
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
      {isOwned && contract.status === 'BIDDING' && (
        <Button
          data-testid="SelectedContract-Controller-Process__StartContractButton"
          variant="outlined"
          color="secondary"
          size="medium"
          fullWidth
          onClick={handleEndBidding}
        >
          End Bidding
        </Button>
      )}
      {isOwned && contract.status === 'BIDDING' && (
        <Button
          data-testid="SelectedContract-Controller-Process__StartContractButton"
          variant="outlined"
          color="secondary"
          size="medium"
          fullWidth
          onClick={handleStartContract}
        >
          Start
        </Button>
      )}
      {isOwned && contract.status === 'INPROGRESS' && (
        <Button
          data-testid="SelectedContract-Controller-Process__CompleteContract"
          variant="outlined"
          color="success"
          size="medium"
          fullWidth
          onClick={handleContractComplete}
        >
          Complete
        </Button>
      )}
      {isOwned && contract.status !== 'COMPLETED' && contract.status !== 'CANCELLED' && (
        <Button
          data-testid="SelectedContract-Controller-Edit__EditContractButton"
          variant="outlined"
          color="info"
          size="medium"
          fullWidth
          onClick={handleEditContract}
        >
          Edit
        </Button>
      )}
      {isOwned && contract.status !== 'COMPLETED' && contract.status !== 'CANCELLED' && (
        <Button
          data-testid="SelectedContract-Controller-Edit__CancelContractButton"
          variant="outlined"
          color={contract.status !== 'INPROGRESS' ? 'warning' : 'error'}
          size="medium"
          fullWidth
          onClick={handleCancelContract}
        >
          Cancel
        </Button>
      )}
      {!isOwned && userBid?.status === 'INVITED' && (
        <Button
          data-testid="SelectedContract-Controller-Process__AcceptContractButton"
          variant="outlined"
          color="success"
          size="medium"
          fullWidth
          onClick={handleAcceptInvite}
        >
          Accept
        </Button>
      )}
      {!isOwned && userBid?.status === 'INVITED' && (
        <Button
          data-testid="SelectedContract-Controller-Process__AcceptContractButton"
          variant="outlined"
          color="error"
          size="medium"
          fullWidth
          onClick={handleDeclineInvite}
        >
          Decline
        </Button>
      )}
      {!isOwned && userBid?.status === 'PENDING' && (
        <Button
          data-testid="SelectedContract-Controller-Process__AcceptContractButton"
          variant="outlined"
          color="warning"
          size="medium"
          fullWidth
          onClick={handleWithdrawBid}
        >
          Cancel Bid
        </Button>
      )}
      {!isOwned && userBid?.status === 'ACCEPTED' && (
        <Button
          data-testid="SelectedContract-Controller-Process__AcceptContractButton"
          variant="outlined"
          color="warning"
          size="medium"
          fullWidth
          onClick={handleWithdrawBid}
        >
          Withdraw
        </Button>
      )}
      {!isOwned && userBid?.status === 'REJECTED' && (
        <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
          Bid has been Rejected
        </Typography>
      )}
      {!isOwned && userBid?.status === 'DECLINED' && (
        <>
          <Button
            data-testid="SelectedContract-Controller-Process__AcceptContractButton"
            variant="outlined"
            color="warning"
            size="medium"
            fullWidth
          >
            Submit Bid
          </Button>
          <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
            You Declined an Invite. You can submit a new bid if you would like.
          </Typography>
        </>
      )}
      {!isOwned && userBid?.status === 'EXPIRED' && (
        <>
          <Button
            data-testid="SelectedContract-Controller-Process__ResubmitBid_Button"
            variant="outlined"
            color="secondary"
            size="medium"
            fullWidth
            onClick={handleResubmitBid}
          >
            Resubmit Bid
          </Button>
          <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
            You are removed from the Active Contractors. Please resubmit a bid.
          </Typography>
        </>
      )}
      {!isOwned && userBid?.status === null && (
        <Button
          data-testid="SelectedContract-Controller-Process__SubmitBidButton"
          variant="outlined"
          color="success"
          size="medium"
          fullWidth
        >
          Submit Bid
        </Button>
      )}
      {displayReview() && (
        <Button
          data-testid="SelectedContract-Controller-Process__ReviewButton"
          variant="outlined"
          color="info"
          size="medium"
          fullWidth
          onClick={openReview}
        >
          Submit Ratings
        </Button>
      )}
    </Box>
  );
};
