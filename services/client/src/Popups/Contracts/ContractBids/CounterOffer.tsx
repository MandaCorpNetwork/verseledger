import { useSoundEffect } from '@Audio/AudioManager';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayField } from '@Common/Components/TextFields/PayField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/patch/updateBid.action';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const POPUP_COUNTER_OFFER_BID = 'counterOfferBid';

export type CounterOfferBidProps = {
  bid: IContractBid;
  contract: IContractWithOwner;
};

export const CounterOfferBid: React.FC<CounterOfferBidProps> = ({ bid, contract }) => {
  const sound = useSoundEffect();
  const [counterAmount, setCounterAmount] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();

  const ownerView = bid?.status === 'PENDING';
  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
        sound.playSound('warning');
      }
      const inputValue = Number(value.replace(/[^\d.]/g, ''));
      setCounterAmount(inputValue);
    },
    [sound],
  );

  const handlePayClear = () => {
    sound.playSound('toggleOff');
    setCounterAmount(currentOffer);
  };

  const handleAcceptOffer = useCallback(
    (contractId: string, bidId: string) => {
      const updatedBid = { status: 'ACCEPTED' as const };
      dispatch(
        updateBid({ contractId: contractId, bidId: bidId, bidData: updatedBid }),
      ).then((res) => {
        if (updateBid.fulfilled.match(res)) {
          enqueueSnackbar('Bid Accepted', { variant: 'success' });
          sound.playSound('success');
          dispatch(closePopup(POPUP_COUNTER_OFFER_BID));
        } else {
          enqueueSnackbar('Error Accepting Bid', { variant: 'error' });
          sound.playSound('error');
        }
      });
    },
    [dispatch, sound],
  );

  const handleCounterOffer = useCallback(
    (contractId: string, bidId: string, amount: number) => {
      const updatedBid = { amount: amount };
      dispatch(
        updateBid({ contractId: contractId, bidId: bidId, bidData: updatedBid }),
      ).then((res) => {
        if (updateBid.fulfilled.match(res)) {
          enqueueSnackbar('Bid Counter Offer Sent', { variant: 'success' });
          sound.playSound('send');
          dispatch(closePopup(POPUP_COUNTER_OFFER_BID));
        } else {
          enqueueSnackbar('Error Sending Counter Offer', { variant: 'error' });
          sound.playSound('error');
        }
      });
    },
    [dispatch, sound],
  );

  const handleSubmit = React.useCallback(() => {
    if (!bid) return enqueueSnackbar('Bid Not Found', { variant: 'error' });
    if (counterAmount !== null) {
      handleCounterOffer(contract?.id, bid.id, counterAmount);
    } else {
      handleAcceptOffer(contract?.id, bid.id);
    }
  }, [bid, counterAmount, handleCounterOffer, contract?.id, handleAcceptOffer]);

  const handleRejectOffer = () => {
    if (!bid) return enqueueSnackbar('Bid Not Found', { variant: 'error' });
    const updatedBid = { status: 'REJECTED' as const };
    dispatch(
      updateBid({ contractId: contract?.id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Bid Rejected', { variant: 'warning' });
        sound.playSound('warning');
        dispatch(closePopup(POPUP_COUNTER_OFFER_BID));
      } else {
        enqueueSnackbar('Error Rejecting Bid', { variant: 'error' });
        sound.playSound('error');
      }
    });
  };

  const submitText = counterAmount !== null ? 'Send Counter' : 'Accept Offer';

  const currentOffer = (bid && bid.amount) ?? contract.defaultPay;

  const acceptedContractorsCount =
    contract.Bids?.filter((bid) => bid?.status === 'ACCEPTED').length ?? 0;
  return (
    <VLPopup
      name={POPUP_COUNTER_OFFER_BID}
      title="Counter Offer"
      submitText={submitText}
      onSubmit={handleSubmit}
      cancelText="Reject Offer"
      onCancel={handleRejectOffer}
    >
      <Box data-testid="CounterOffer__Container">
        <DigiBox data-testid="CounterOffer__Wrapper" sx={{ p: '.5em', gap: '1em' }}>
          <UserDisplay
            data-testid="CounterOffer__User"
            user={ownerView ? (bid?.User as IUser) : contract.Owner}
          />
          <DigiDisplay sx={{ p: '.5em' }}>
            <Typography>{ownerView ? 'Bid Proposal' : 'Counter Offer'}</Typography>
            <Box sx={{ display: 'flex', mt: '.5em', alignItems: 'center', gap: '.5em' }}>
              <PayDisplay
                label="Current Offer"
                pay={currentOffer}
                structure={contract.payStructure as ContractPayStructure}
                sx={{ maxWidth: '120px', minWidth: '120px' }}
              />
              <PayField
                label="Counter Offer"
                value={counterAmount?.toLocaleString() ?? null}
                onChange={handlePayChange}
                onClear={handlePayClear}
                defaultValue={currentOffer.toLocaleString()}
                structure={contract.payStructure as ContractPayStructure}
                activeCount={acceptedContractorsCount}
                sx={{ maxWidth: '160px' }}
              />
            </Box>
          </DigiDisplay>
          <Box sx={{ mx: 'auto' }}>
            <Typography variant="tip" sx={{ px: '.5em' }}>
              {ownerView
                ? 'Contractor has submitted a Bid Proposal'
                : 'Contract Owner has sent a Counter Offer'}
            </Typography>
          </Box>
        </DigiBox>
      </Box>
    </VLPopup>
  );
};
