import { useSoundEffect } from '@Audio/AudioManager';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Divider, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { updateBid } from '@Redux/Slices/Bids/Actions/patch/updateBid.action';
import { postContractBid } from '@Redux/Slices/Bids/Actions/post/postContractBid.action';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { fetchContractBidsOfUser } from '@Redux/Slices/Users/Actions/fetchContractBidsByUser.action';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { BidTimeRemaining } from './BidTimeRemaining';
import { NegotiateBid } from './NegotiateBid';
import { NonNegotiateBid } from './NonNegotiateBid';

// Define Popup Name
export const POPUP_SUBMIT_CONTRACT_BID = 'submitContractBid';

// Props to Pass in Contract Object
export type ContractBidProps = {
  contract: IContractWithOwner;
};

export const SubmitContractBid: React.FC<ContractBidProps> = ({ contract }) => {
  // State for the Negotiation Form
  // TODO: NEED SCHEMA FOR FORMDATA
  const sound = useSoundEffect();
  const [negotiateFormData, setNeotiateFormData] = React.useState<number>(
    contract.defaultPay,
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const acceptedContractorsCount =
    contract.Bids?.filter((bid) => bid.status === 'ACCEPTED').length ?? 0;

  const currentUser = useAppSelector(selectCurrentUser);

  const maxLimit = 100 - acceptedContractorsCount;

  //ToDo: Update this to figure out a way to navigate to pending on contract manager
  const handlePostBid = React.useCallback(
    (contractId: string) => {
      const existingBid = contract.Bids?.find((bid) => bid.user_id === currentUser?.id);
      if (existingBid) {
        const updatedBid = { status: 'PENDING' as const };
        dispatch(
          updateBid({
            contractId: contractId,
            bidId: existingBid.id,
            bidData: updatedBid,
          }),
        ).then((res) => {
          if (updateBid.fulfilled.match(res)) {
            dispatch(closePopup(POPUP_SUBMIT_CONTRACT_BID));
            enqueueSnackbar('Bid Resubmitted', { variant: 'success' });
            sound.playSound('send');
          } else {
            enqueueSnackbar('Error Submitting Bid', { variant: 'error' });
            sound.playSound('error');
          }
        });
        return;
      }
      dispatch(postContractBid(contractId)).then((res) => {
        if (postContractBid.fulfilled.match(res)) {
          if (location.pathname == '/personal/ledger/*') {
            navigate(`/personal/ledger/contracts?cmTab=pending&contractID=${contractId}`);
          }
          enqueueSnackbar('Bid Submitted', { variant: 'success' });
          dispatch(closePopup(POPUP_SUBMIT_CONTRACT_BID));
          sound.playSound('send');
        } else {
          enqueueSnackbar('Error Submitting Bid', { variant: 'error' });
          sound.playSound('error');
        }
      });
    },
    [contract.Bids, dispatch, currentUser?.id, sound, location.pathname, navigate],
  );

  const handleNegotiateBid = React.useCallback(
    (contractId: string, newPay: number) => {
      if (contract.payStructure === 'POOL') {
        if (newPay >= maxLimit) {
          sound.playSound('warning');
          enqueueSnackbar('Percentage to high, others need pay too...', {
            variant: 'error',
          });
          return;
        }
      }
      dispatch(postContractBid(contractId)).then((res) => {
        if (postContractBid.fulfilled.match(res)) {
          dispatch(
            fetchContractBidsOfUser({ contractId: [contractId], page: 0, limit: 1 }),
          ).then((fetchRes) => {
            if (fetchContractBidsOfUser.fulfilled.match(fetchRes)) {
              const dto = fetchRes.payload.data;
              const bid = dto[0];
              const bidUpdate = { amount: newPay };
              Logger.info(`Bid Update: ${JSON.stringify(bidUpdate)}`);
              dispatch(
                updateBid({
                  contractId: contractId,
                  bidId: bid.id,
                  bidData: bidUpdate,
                }),
              ).then((upRes) => {
                if (updateBid.fulfilled.match(upRes)) {
                  enqueueSnackbar('Bid Offer Submitted', { variant: 'success' });
                  sound.playSound('send');
                  dispatch(closePopup(POPUP_SUBMIT_CONTRACT_BID));
                } else {
                  enqueueSnackbar('Error Updating Bid', { variant: 'error' });
                  sound.playSound('error');
                }
              });
            } else {
              enqueueSnackbar('Error Fetching New Bid', { variant: 'error' });
              sound.playSound('error');
            }
          });
        } else {
          enqueueSnackbar('Error Submitting Bid', { variant: 'error' });
          sound.playSound('error');
        }
      });
    },
    [contract.payStructure, dispatch, maxLimit, sound],
  );

  const handleSubmitBid = React.useCallback(() => {
    if (contract.isBargaining === false) {
      handlePostBid(contract.id);
    }
    if (contract.isBargaining === true) {
      if (negotiateFormData == null || negotiateFormData === contract.defaultPay) {
        dispatch(
          openPopup(POPUP_YOU_SURE, {
            title: 'Submit Bid',
            subjectText: 'Submitting a bid for Default Pay',
            bodyText:
              'You are about to submit a bid for the default pay on a negotiable contract.',
            onAccept: () => handlePostBid(contract.id),
            clickaway: true,
            testid: 'PostContractBid__SubmitNegotiateBid_DefaultPay',
          }),
        );
      } else {
        handleNegotiateBid(contract.id, negotiateFormData);
      }
    }
  }, [
    contract.isBargaining,
    contract.id,
    contract.defaultPay,
    handlePostBid,
    negotiateFormData,
    dispatch,
    handleNegotiateBid,
  ]);

  return (
    <VLPopup
      name={POPUP_SUBMIT_CONTRACT_BID}
      title="Submit Bid"
      submitText="Submit Bid"
      onSubmit={handleSubmitBid}
      submitDisabled={acceptedContractorsCount === contract.contractorLimit}
      bottomBarComponent={<BidTimeRemaining bidDate={contract.bidDate} />}
      data-testid="ContractBid"
      sx={{
        maxWidth: { xs: '100%', md: '30%' },
        maxHeight: { md: '95%' },
        height: { xs: '100%', md: 'auto' },
      }}
    >
      <Box
        data-testid="ContractBid__Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          maxHeight: '100%',
          px: '.2em',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
        }}
      >
        <DigiBox
          data-testid="ContractBid-ContractDetails__Wrapper"
          sx={{ p: '.5em', maxHeight: '30%' }}
        >
          <Typography
            data-testid="ContractBid-ContractDetails__Title"
            sx={{
              fontSize: '1.2em',
              fontWeight: 'bold',
              color: 'secondary.main',
              cursor: 'default',
            }}
          >
            Contract Details
          </Typography>
          <Box
            data-testid="ContractBid-ContractDetails__TopContainer"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-around',
              my: '.5em',
              gap: '.5em',
            }}
          >
            <UserDisplay user={contract.Owner} sx={{ alignSelf: 'center' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '.5em',
                flexGrow: '1',
                justifyContent: 'space-around',
              }}
            >
              <DigiDisplay
                data-testid="ContractBid-ContractDetails__ContractTypeWrapper"
                sx={{
                  px: '1em',
                  pb: '.5em',
                }}
              >
                <Typography
                  data-testid="ContractBid-ContractDetails__ContractTypeTitle"
                  align="center"
                  variant="body2"
                  sx={{ fontWeight: 'bold', cursor: 'default' }}
                >
                  Contract Type
                </Typography>
                <Box
                  data-testid="ContractBid-ContractDetails-ContractType__SubtypeChipWrapper"
                  sx={{ mt: '.2em' }}
                >
                  <SubtypeChip subtype={contract.subtype} />
                </Box>
              </DigiDisplay>
              <DigiDisplay
                data-testid="ContractBid-ContractDetails__ContractStatusWrapper"
                sx={{ px: '1em', pb: '.5em' }}
              >
                <Typography
                  data-testid="ContractBid-ContractDetails__ContractStatusTitle"
                  align="center"
                  variant="body2"
                  sx={{ fontWeight: 'bold', cursor: 'default' }}
                >
                  Contract Status
                </Typography>
                <Box
                  data-testid="ContractBid-ContractDetails-ContractStatus__ChipWrapper"
                  sx={{ mx: 'auto', mt: '.2em' }}
                >
                  <ContractStatusChip status={contract.status} />
                </Box>
              </DigiDisplay>
            </Box>
          </Box>
          <DigiDisplay
            data-testid="ContractBid-ContractDetails__BriefingWrapper"
            sx={{ mt: '.5em', px: '1em' }}
          >
            <Typography
              data-testid="ContractBid-ContractDetails__BriefingTitle"
              align="left"
              variant="body2"
              sx={{ fontWeight: 'bold' }}
            >
              {contract.title}
            </Typography>
            <Box
              data-testid="ContractBid-ContractDetails-Briefing__ContentWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'inherit',
                maxHeight: '150px',
                overflow: 'auto',
                p: '.5em',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <Typography
                data-testid="ContractBid-ContractDetails-Briefing__Content"
                variant="body2"
                sx={{
                  fontSize: '.82em',
                  color: 'text.primary',
                }}
              >
                {contract.briefing}
              </Typography>
            </Box>
          </DigiDisplay>
        </DigiBox>
        <Divider
          data-testid="ContractBid-StaticVsDynamic__Divider"
          sx={{ my: '1em', width: '75%', mx: 'auto' }}
        />
        {contract.isBargaining ? (
          <NegotiateBid
            contract={contract}
            formData={negotiateFormData}
            setFormData={setNeotiateFormData}
          />
        ) : (
          <NonNegotiateBid contract={contract} />
        )}
      </Box>
    </VLPopup>
  );
};
