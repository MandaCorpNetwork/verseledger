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
  /**
   * @function handleAcceptInvite - Handles the Accept Invite button click
   * @return {void} - Updates the bidStatus to `ACCEPTED`
   */
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
  /**
   * @function handleDeclineInvite - Handles the Decline Invite button click
   * @return {void} - Updates the bidStatus to `DECLINED`
   */
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
  /**
   * @function handleWithdrawBid - Handles the Withdraw Bid button click
   * @return {void} - Updates the bidStatus to `EXPIRED`
   */
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
  /**
   * @function handleResubmitBid - Handles the Resubmit Bid button click
   * @return {void} - Opens the Submit Bid popup
   * @see {@link POPUP_SUBMIT_CONTRACT_BID}
   */
  const handleResubmitBid = React.useCallback(() => {
    if (!userBid) {
      enqueueSnackbar(`Bid doesn't Exist`, { variant: 'error' });
      playSound('error');
      return Logger.info('no user bid');
    }
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  }, [userBid, dispatch]);

  /**
   * @function getUpdatedContractStatus - Updates the contract object to pass to a PATCH request
   * @param {Partial<IContract>} contract - The contract to update
   * @param {string} status - The status to update the contract to
   * @param {Date} startDate - The start date of the contract if it exists
   * @param {Date} endDate - The end date of the contract if it exists
   * @param {Date} bidDate - The bid date of the contract if it exists
   * @returns {Partial<IContract>} - The updated contract object
   */
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
  /**
   * @function endBidding - Ends the bidding on the contract
   * @returns {void} - Closes the bidding on the contract.
   * Sets the bidEnd Date to the current date.
   */
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
  /**
   * @function handleEndBidding - Handles the end bidding button click
   * @returns {void} - Opens a verification popup to end the bidding
   * @see {@link POPUP_YOU_SURE}
   */
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
  /**
   * @function startContract - Starts the contract with status INPROGRESS
   * @returns {void} - Starts the contract with status INPROGRESS and sets the Start Date to the current date.
   */
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
  /**
   * @function getStartBodyText - Returns the body text for the start contract verification popup
   * @returns {string} - The body text for the start contract verification popup
   * - `Are you sure you want to start the contract?`
   * - `Are you sure you want to start the contract before the set start time (${contract.startDate?.toLocaleString()})?`
   * - `Are you sure you want to start the contract before the set bidding close (${contract.bidDate.toLocaleString()})?`
   */
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
  /** Calls {@link getStartBodyText} */
  const startBodyText = getStartBodyText();
  /**
   * @function handleStartContract - Handles the start contract button click
   * @returns {void} - Opens a verification popup to start the contract
   * @see {@link POPUP_YOU_SURE}
   */
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
  /**
   * @function getActiveBidUsers - Returns the users that have an `ACCEPTED` bid on the contract
   * @returns {IUser[]} - The users that have an `ACCEPTED` bid on the contract
   * TODO: Need to add Withdraw Bid Status still to allow rating contractors that leave a contract
   */
  const getActiveBidUsers = React.useCallback(() => {
    return contract.Bids?.filter((bid) => bid.status === 'ACCEPTED').map(
      (bid) => bid.User,
    );
  }, [contract]);
  /** Calls {@link getActiveBidUsers} */
  const contractUsers = getActiveBidUsers();
  /**
   * @function openReview - Opens the review popup for the contract to allow user to rate the contractors & contract owner
   * @returns {void} - Opens the review popup
   * @see {@link POPUP_SUBMIT_RATING}
   */
  const openReview = React.useCallback(() => {
    if (contractUsers) {
      if (contractUsers.length !== 0) {
        dispatch(openPopup(POPUP_SUBMIT_RATING, { users: contractUsers, contract }));
      }
    }
  }, [contractUsers, dispatch]);
  /**
   * @function completeContract - Completes the contract with status `COMPLETED` and sets the End Date to the current date.
   */
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
  /**
   * @function getCompleteBodyText - Determines the Text to pass to the Verify Popup for completing a Contract
   * @returns {string} - The body text for the complete contract verification popup
   * - `Are you sure you want to complete the contract before the set end time (${contract.endDate.toLocaleString()})?`
   * - `Are you sure you are ready to complete the contract?`
   */
  const getCompleteBodyText = React.useCallback(() => {
    const now = new Date();
    if (contract.status === 'INPROGRESS' && contract.endDate && contract.endDate < now) {
      return `Are you sure you want to complete the contract before the set end time (${contract.endDate.toLocaleString()})?`;
    } else {
      return `Are you sure you are ready to complete the contract?`;
    }
  }, [contract]);
  /** Calls {@link getCompleteBodyText} */
  const completeBodyText = getCompleteBodyText();
  /**
   * @function handleContractComplete - Handles the complete contract button click
   * @returns {void} - Opens a verification popup to complete the contract
   * @see {@link POPUP_YOU_SURE}
   */
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
  /**
   * @function cancelContract - Cancels the contract with status `CANCELED` and sets the End Date to the current date.
   * @returns {void} - Cancels the contract with status `CANCELED` and sets the End Date to the current date.
   */
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
  /**
   * @function getCancelBodyText - Determines the Text to pass to the Verify Popup for canceling a Contract
   * @returns {string} - The body text for the cancel contract verification popup
   * - `Are you sure you want to cancel the contract?`
   * - `Are you sure you want to cancel the contract before the set end time (${contract.endDate.toLocaleString()})?`
   */
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
  /** Calls {@link getCancelBodyText} */
  const cancelBodyText = getCancelBodyText();
  /**
   * @function handleCancelContract - Handles the cancel contract button click
   * @returns {void} - Opens a verification popup to cancel the contract
   * @see {@link POPUP_YOU_SURE}
   */
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
  /**
   * @function handleEditContract - Handles the edit contract button click
   * @returns {void} - Opens the edit contract popup
   * @see {@link POPUP_EDIT_CONTRACT}
   */
  const handleEditContract = React.useCallback(() => {
    if (contract.status === 'COMPLETED' || contract.status === 'CANCELED') {
      playSound('denied');
      enqueueSnackbar('Not able to edit this Contract', { variant: 'error' });
      return Logger.info('contract is completed or canceled');
    }
    playSound('open');
    dispatch(openPopup(POPUP_EDIT_CONTRACT, { contract: contract }));
  }, [contract, dispatch, playSound, enqueueSnackbar]);
  /**
   * @function displayReview - Determines if the user can open the review popup
   * @returns {boolean} - Whether the user can open the review popup
   */
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

  const contractEnded = contract.status === 'COMPLETED' || contract.status === 'CANCLED';

  const acceptedContractors =
    contract.Bids?.filter((bid) => bid.status === 'ACCEPTED') ?? [];

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
          disabled={acceptedContractors.length === 0}
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
          disabled={acceptedContractors.length === 0}
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
          disabled={acceptedContractors.length === 0}
        >
          Complete
        </Button>
      )}
      {isOwned && !contractEnded && (
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
      {isOwned && !contractEnded && (
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
      {!isOwned && userBid?.status === 'INVITED' && !contractEnded && (
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
      {!isOwned && userBid?.status === 'INVITED' && !contractEnded && (
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
      {!isOwned && userBid?.status === 'PENDING' && !contractEnded && (
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
      {!isOwned && userBid?.status === 'ACCEPTED' && !contractEnded && (
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
      {!isOwned && userBid?.status === 'REJECTED' && !contractEnded && (
        <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
          Bid has been Rejected
        </Typography>
      )}
      {!isOwned && userBid?.status === 'DECLINED' && !contractEnded && (
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
      {!isOwned && userBid?.status === 'EXPIRED' && !contractEnded && (
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
      {!isOwned && userBid?.status === null && !contractEnded && (
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
