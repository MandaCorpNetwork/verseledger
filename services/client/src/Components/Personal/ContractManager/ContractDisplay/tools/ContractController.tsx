import { Box, Button, Typography } from '@mui/material';
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

  const handleAcceptInvite = () => {
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
        overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'employed' });
        enqueueSnackbar('Accepted Invite', { variant: 'success' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const handleDeclineInvite = () => {
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
  };

  const handleWithdrawBid = () => {
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
        overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'pending' });
        enqueueSnackbar('Resigned from Contract', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Resigning', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const handleResubmitBid = () => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return Logger.info('no user bid');
    }
    const updatedBid = { status: 'PENDING' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: userBid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'pending' });
        enqueueSnackbar('Bid Resubmitted', { variant: 'warning' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Resubmitting Bid', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const getUpdatedContractStatus = (
    contract: Partial<IContract>,
    status: string,
    startDate?: Date,
    endDate?: Date,
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
    };
  };

  const handleContractStart = () => {
    const now = new Date();
    if (contract.status === 'BIDDING') {
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
  };

  const getActiveBidUsers = () => {
    return contract.Bids?.filter((bid) => bid.status === 'ACCEPTED').map(
      (bid) => bid.User,
    );
  };

  const contractUsers = getActiveBidUsers();

  const openReview = () => {
    dispatch(openPopup(POPUP_SUBMIT_RATING, { users: contractUsers, contract }));
  };

  const completeContract = () => {
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
        overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'history' });
        enqueueSnackbar('Contract Completed', { variant: 'success' });
        playSound('success');
        openReview();
      } else {
        enqueueSnackbar('Error Completing Contract Contract', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const completeBodyText = contract.endDate
    ? 'Are you sure you want to complete this contract before the scheduled End Date?'
    : 'Are you sure you want to complete this contract?';

  const handleContractComplete = () => {
    if (contract.status === 'INPROGRESS') {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'Complete Contract',
          acceptText: 'Complete',
          onAccept: completeContract,
          clickaway: true,
          subjectText: 'Closing Contract With Complete Status',
          bodyText: completeBodyText,
        }),
      );
    }
  };

  const handleContractCancel = () => {
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
          overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'history' });
          enqueueSnackbar('Contract Canceled', { variant: 'warning' });
          playSound('warning');
        } else {
          enqueueSnackbar('Error Canceling Contract', { variant: 'error' });
          playSound('error');
        }
      });
    }
  };

  const handleEditContract = () => {
    if (contract.status === 'COMPLETED' || contract.status === 'CANCELED') {
      playSound('denied');
      enqueueSnackbar('Not able to edit this Contract', { variant: 'error' });
      return Logger.info('contract is completed or canceled');
    }
    playSound('open');
    dispatch(openPopup(POPUP_EDIT_CONTRACT, { contract: contract }));
  };

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
          onClick={handleContractStart}
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
          color="error"
          size="medium"
          fullWidth
          onClick={handleContractCancel}
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
    </Box>
  );
};
