import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayField } from '@Common/Components/TextFields/PayField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { updateBid } from '@Redux/Slices/Bids/Actions/updateBid';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

export const POPUP_COUNTER_OFFER_BID = 'counterOfferBid';

export type CounterOfferBidProps = {
  bid: IContractBid;
  contract: IContract;
};

export const CounterOfferBid: React.FC<CounterOfferBidProps> = ({ bid, contract }) => {
  const { playSound } = useSoundEffect();
  const [counterAmount, setCounterAmount] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
        playSound('warning');
      }
      const inputValue = Number(value.replace(/[^\d.]/g, ''));
      setCounterAmount(inputValue);
    },
    [counterAmount],
  );

  const handlePayClear = () => {
    playSound('toggleOff');
    setCounterAmount(null);
  };

  const handleSubmit = React.useCallback(() => {
    const handleAcceptOffer = (contractId: string, bidId: string) => {
      const updatedBid = { status: 'ACCEPTED' as const };
      dispatch(
        updateBid({ contractId: contractId, bidId: bidId, bidData: updatedBid }),
      ).then((res) => {
        if (updateBid.fulfilled.match(res)) {
          enqueueSnackbar('Bid Accepted', { variant: 'success' });
          playSound('success');
          dispatch(closePopup(POPUP_COUNTER_OFFER_BID));
        } else {
          enqueueSnackbar('Error Accepting Bid', { variant: 'error' });
          playSound('error');
        }
      });
    };

    const handleCounterOffer = (contractId: string, bidId: string, amount: number) => {
      const updatedBid = { amount: amount };
      dispatch(
        updateBid({ contractId: contractId, bidId: bidId, bidData: updatedBid }),
      ).then((res) => {
        if (updateBid.fulfilled.match(res)) {
          enqueueSnackbar('Bid Counter Offer Sent', { variant: 'default' });
          playSound('send');
          dispatch(closePopup(POPUP_COUNTER_OFFER_BID));
        } else {
          enqueueSnackbar('Error Sending Counter Offer', { variant: 'error' });
          playSound('error');
        }
      });
    };

    if (counterAmount !== null) {
      handleCounterOffer(contract.id, bid.id, counterAmount);
    } else {
      handleAcceptOffer(contract.id, bid.id);
    }
  }, [counterAmount, contract.id, bid.id]);

  const handleRejectOffer = () => {
    const updatedBid = { status: 'REJECTED' as const };
    dispatch(
      updateBid({ contractId: contract.id, bidId: bid.id, bidData: updatedBid }),
    ).then((res) => {
      if (updateBid.fulfilled.match(res)) {
        enqueueSnackbar('Bid Rejected', { variant: 'warning' });
        playSound('warning');
        dispatch(closePopup(POPUP_COUNTER_OFFER_BID));
      } else {
        enqueueSnackbar('Error Rejecting Bid', { variant: 'error' });
        playSound('error');
      }
    });
  };

  const submitText = counterAmount !== null ? 'Send Counter' : 'Accept Offer';
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
          <UserDisplay data-testid="CounterOffer__User" userid={bid.user_id} />
          <DigiDisplay sx={{ p: '.5em' }}>
            <Typography>Counter Offer</Typography>
            <Box sx={{ display: 'flex', mt: '.5em', alignItems: 'center', gap: '.5em' }}>
              <PayDisplay
                label="Bid Offer"
                pay={bid.amount}
                sx={{ maxWidth: '120px', minWidth: '100px' }}
              />
              <PayField
                label="Counter Offer"
                value={counterAmount?.toLocaleString() ?? null}
                onChange={handlePayChange}
                onClear={handlePayClear}
                sx={{ maxWidth: '160px' }}
              />
            </Box>
          </DigiDisplay>
          <Box sx={{ mx: 'auto' }}>
            <Typography variant="tip" sx={{ px: '.5em' }}>
              This User has Submitted a Counter Proposal.
            </Typography>
          </Box>
        </DigiBox>
      </Box>
    </VLPopup>
  );
};
