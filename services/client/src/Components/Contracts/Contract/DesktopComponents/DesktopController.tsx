import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { Button, Typography } from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { POPUP_COUNTER_OFFER_BID } from '@Popups/Contracts/ContractBids/CounterOffer';
import { POPUP_EDIT_CONTRACT } from '@Popups/Contracts/EditContract/EditContract';
import { POPUP_SUBMIT_RATING } from '@Popups/Ratings/SubmitRating';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid';
import { updateContract } from '@Redux/Slices/Contracts/actions/post/updateContract';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

type DesktopControllerProps = {
  /** @prop {boolean} isOwned - Whether the user is the owner of the contract */
  isOwned: boolean;
  /** @prop {IContractBid} userBid - The user's bid on the contract if it exists */
  userBid?: IContractBid | null;
  /** @prop {IContract} contract - The contract to display information for */
  contract: IContract;
};

/**
 * ### DesktopController
 * @description
 * Displays Contract Controller Buttons for a Contract on a Desktop Screen.
 * @param {DesktopControllerProps} props - The props for the component
 * @returns {React.FC}
 * A {@link ControlPanelBox} with Contract Interaction Buttons for Bid Status & Contract Status & Details.
 * @author ThreeCrown - @ThreeCrown
 */
export const DesktopController: React.FC<DesktopControllerProps> = ({
  isOwned,
  userBid,
  contract,
}) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();

  // LOGIC

  /**
   * @function getUpdatedContractStatus - Updates the contract object to pass to a PATCH request
   * @param {Partial<IContract>} contract - The contract to update
   * @param {string} status - The status to update the contract to
   * @param {Date} startDate - The start date of the contract if it exists
   * @param {Date} endDate - The end date of the contract if it exists
   * @param {Date} bidDate - The bid date of the contract if it exists
   * @returns {Partial<IContract>} - The updated contract object
   */
  const getUpdatedContractStatus = useCallback(
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
  }, [contract, dispatch, getUpdatedContractStatus, playSound]);
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
  }, [contract.bidDate, contract.title, dispatch, endBidding]);

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
  }, [contract, dispatch, getUpdatedContractStatus, playSound]);
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
  }, [contract.startDate, contract.title, dispatch, startBodyText, startContract]);

  /**
   * @function getActiveBidUsers - Returns the users that have an `ACCEPTED` bid on the contract
   * @returns {IUser[]} - The users that have an `ACCEPTED` bid on the contract
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
  }, [contract, contractUsers, dispatch]);

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
        enqueueSnackbar('Contract Completed', { variant: 'success' });
        playSound('success');
        openReview();
      } else {
        enqueueSnackbar('Error Completing Contract Contract', { variant: 'error' });
        playSound('error');
      }
    });
  }, [contract, dispatch, getUpdatedContractStatus, playSound, openReview]);
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
          enqueueSnackbar('Contract Canceled', { variant: 'warning' });
          playSound('warning');
          openReview();
        } else {
          enqueueSnackbar('Error Canceling Contract', { variant: 'error' });
          playSound('error');
        }
      });
    }
  }, [contract, getUpdatedContractStatus, dispatch, playSound, openReview]);
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
  }, [dispatch, cancelContract, contract.title, cancelBodyText]);

  /**
   * @function handleEditContract - Handles the edit contract button click
   * @returns {void} - Opens the edit contract popup
   * @see {@link POPUP_EDIT_CONTRACT}
   */
  const handleEditContract = React.useCallback(() => {
    if (contract.status === 'COMPLETED' || contract.status === 'CANCELED') {
      playSound('denied');
      enqueueSnackbar('Not able to edit this Contract', { variant: 'error' });
    }
    playSound('open');
    dispatch(openPopup(POPUP_EDIT_CONTRACT, { contract: contract }));
  }, [contract, dispatch, playSound]);

  /**
   * @function handleAcceptInvite - Handles the Accept Invite button click
   * @return {void} - Updates the bidStatus to `ACCEPTED`
   */
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
        enqueueSnackbar('Accepted Invite', { variant: 'success' });
        playSound('success');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, contract, dispatch, playSound]);

  /**
   * @function handleDeclineInvite - Handles the Decline Invite button click
   * @return {void} - Updates the bidStatus to `DECLINED`
   */
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
        enqueueSnackbar('Declined Invite', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Accepting Invite', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, playSound, dispatch, contract]);

  /**
   * @function handleWithdrawBid - Handles the Withdraw Bid button click
   * @return {void} - Updates the bidStatus to `EXPIRED`
   */
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
        enqueueSnackbar('Resigned from Contract', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Resigning', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, contract, dispatch, playSound]);

  /**
   * @function handleCancelBid - Handles the Cancel Bid Button
   * @return {void} - Updates the bidStatus to `EXPIRED`
   */
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
        enqueueSnackbar('Canceled Bid', { variant: 'warning' });
        playSound('warning');
      } else {
        enqueueSnackbar('Error Resigning', { variant: 'error' });
        playSound('error');
      }
    });
  }, [userBid, contract, dispatch, playSound]);

  /**
   * @function handleResubmitBid - Handles the Resubmit Bid button click
   * @return {void} - Opens the Submit Bid popup
   * @see {@link POPUP_SUBMIT_CONTRACT_BID}
   */
  const handleResubmitBid = React.useCallback(() => {
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  }, [dispatch, contract]);

  const getResubmitText = React.useCallback(() => {
    if (!userBid) return;
    switch (userBid.status) {
      case 'DECLINED':
        return 'You declined an Invite';
      case 'EXPIRED':
        return 'Bid has Expired';
      case 'WITHDRAWN':
        return 'You Withdrew from the Contract';
      case 'DISMISSED':
        return 'You were Dismissed from the Contract';
      default:
        return;
    }
  }, [userBid]);

  const resubmitText = getResubmitText();

  /**
   * @function handleOpenOffer - Handles Opening the Offer Popup
   * @see {@link POPUP_COUNTER_OFFER_BID}
   */
  const handleOpenOffer = React.useCallback(() => {
    if (!userBid) return;
    dispatch(openPopup(POPUP_COUNTER_OFFER_BID, { bidId: userBid.id, contract }));
  }, [dispatch, userBid, contract]);

  const contractEnded = contract.status === 'COMPLETED' || contract.status === 'CANCLED';

  const acceptedContractors =
    contract.Bids?.filter((bid) => bid.status === 'ACCEPTED') ?? [];

  const hasAccepted =
    userBid?.status === 'ACCEPTED' ||
    userBid?.status === 'DISMISSED' ||
    userBid?.status === 'WITHDRAWN';
  return (
    <ControlPanelBox
      data-testid="ContractPage-Bottom-Left__Controller_Wrapper"
      sx={{
        mb: 'auto',
        py: '.5em',
        px: '.5em',
        gap: '.5em',
      }}
    >
      {isOwned && contract.status === 'BIDDING' && (
        <Button
          data-testid="ContractPage-ContractController__EndBidding_Button"
          variant="outlined"
          color="info"
          size="small"
          fullWidth
          onClick={handleEndBidding}
          disabled={acceptedContractors.length === 0}
        >
          End Bidding
        </Button>
      )}
      {isOwned && (contract.status === 'BIDDING' || contract.status === 'PENDING') && (
        <Button
          data-testid="ContractPage-ContractController__StartContract_Button"
          variant="outlined"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleStartContract}
          disabled={acceptedContractors.length === 0}
        >
          Start
        </Button>
      )}
      {isOwned && contract.status === 'INPROGRESS' && (
        <Button
          data-testid="ContractPage-ContractController__CompleteContract_Button"
          variant="outlined"
          color="success"
          size="small"
          fullWidth
          onClick={handleContractComplete}
          disabled={acceptedContractors.length === 0}
        >
          Complete
        </Button>
      )}
      {isOwned && !contractEnded && (
        <Button
          data-testid="ContractPage-ContractController__EditContract_Button"
          variant="outlined"
          color="warning"
          size="small"
          fullWidth
          onClick={handleEditContract}
        >
          Edit
        </Button>
      )}
      {isOwned && !contractEnded && (
        <Button
          data-testid="ContractPage-ContractController__CancelContract_Button"
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          onClick={handleCancelContract}
        >
          Cancel
        </Button>
      )}
      {!isOwned &&
        userBid?.status === 'INVITED' &&
        userBid?.amount === contract.defaultPay &&
        !contractEnded && (
          <Button
            data-testid="ContractPage-ContractController__AcceptInvite_Button"
            variant="outlined"
            color="success"
            size="small"
            fullWidth
            onClick={handleAcceptInvite}
          >
            Accept Invite
          </Button>
        )}
      {!isOwned &&
        userBid?.status === 'INVITED' &&
        userBid?.amount === contract.defaultPay &&
        !contractEnded && (
          <Button
            data-testid="ContractPage-ContractController__DeclineInvite_Button"
            variant="outlined"
            color="error"
            size="small"
            fullWidth
            onClick={handleDeclineInvite}
          >
            Decline Invite
          </Button>
        )}
      {!isOwned &&
        userBid?.status === 'INVITED' &&
        userBid?.amount !== contract.defaultPay &&
        !contractEnded && (
          <Button
            data-testid="ContractPage-ContractController__DeclineInvite_Button"
            variant="outlined"
            color="warning"
            size="small"
            fullWidth
            onClick={handleOpenOffer}
          >
            Open Offer
          </Button>
        )}
      {!isOwned && userBid?.status === 'PENDING' && !contractEnded && (
        <Button
          data-testid="ContractPage-ContractController__CancelBid_Button"
          variant="outlined"
          color="warning"
          size="small"
          fullWidth
          onClick={handleCancelBid}
        >
          Cancel Bid
        </Button>
      )}
      {!isOwned && userBid?.status === 'ACCEPTED' && !contractEnded && (
        <Button
          data-testid="ContractPage-ContractController__Withdraw_Button"
          variant="outlined"
          color="warning"
          size="small"
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
      {!isOwned && userBid?.status === 'DISMISSED' && !contractEnded && (
        <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
          You have been Dismissed
        </Typography>
      )}
      {!isOwned &&
        (userBid?.status === 'DECLINED' ||
          userBid?.status === 'EXPIRED' ||
          userBid?.status === 'WITHDRAWN' ||
          userBid?.status === 'DISMISSED') &&
        !contractEnded && (
          <>
            <Button
              data-testid="ContractPage-ContractController__ResubmitBid_Button"
              variant="contained"
              color="info"
              size="large"
              fullWidth
              onClick={handleResubmitBid}
              sx={{
                fontSize: '1em',
                fontWeight: 'bold',
              }}
            >
              Resubmit Bid
            </Button>
            <Typography sx={{ fontWeight: 'bold', color: 'info.main' }}>
              {resubmitText}
            </Typography>
          </>
        )}
      {!isOwned && !userBid && contract.status === 'BIDDING' && !contractEnded && (
        <Button
          data-testid="ContractPage-ContractController__SubmitBid_Button"
          variant="outlined"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleResubmitBid}
        >
          Submit Bid
        </Button>
      )}
      {(isOwned || hasAccepted) && contractEnded && (
        <Button
          data-testid="ContractPage-ContractController__Review_Button"
          variant="outlined"
          color="success"
          size="small"
          fullWidth
          onClick={openReview}
          disabled={acceptedContractors.length === 0}
        >
          Submit Ratings
        </Button>
      )}
    </ControlPanelBox>
  );
};
