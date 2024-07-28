import DigiBox from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Divider, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { postContractBid } from '@Redux/Slices/Contracts/actions/post/postContractBid';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { BidTimeRemaining } from './BidTimeRemaining';
import { NegotiateBid } from './NegotiateBid';
import { NonNegotiateBid } from './NonNegotiateBid';

// Define Popup Name
export const POPUP_SUBMIT_CONTRACT_BID = 'submitContractBid';

// Props to Pass in Contract Object
export type ContractBidProps = {
  contract: IContract;
};

export const SubmitContractBid: React.FC<ContractBidProps> = ({ contract }) => {
  // State for the Negotiation Form
  // TODO: NEED SCHEMA FOR FORMDATA
  const [negotiateFormData, setNeotiateFormData] = React.useState<number>(
    contract.defaultPay,
  );
  const dispatch = useAppDispatch();

  const handleSubmitBid = React.useCallback(() => {
    if (negotiateFormData == null || negotiateFormData === contract.defaultPay) {
      dispatch(postContractBid(contract.id));
    }
    dispatch(closePopup(POPUP_SUBMIT_CONTRACT_BID));
    return;
  }, []);

  return (
    <VLPopup
      name={POPUP_SUBMIT_CONTRACT_BID}
      title="Submit Bid"
      submitText="Submit Bid"
      onSubmit={handleSubmitBid}
      bottomBarComponent={<BidTimeRemaining bidDate={contract.bidDate} />}
      data-testid="ContractBid"
      maxHeight="95%"
    >
      <Box
        data-testid="ContractBid__Wrapper"
        sx={{ display: 'flex', flexDirection: 'column', height: '80%' }}
      >
        <DigiBox
          data-testid="ContractBid-ContractDetails__Wrapper"
          sx={{ p: '.5em', maxHeight: '30%', overflow: 'auto' }}
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              my: '.5em',
              gap: '.5em',
            }}
          >
            <UserDisplay userid={contract.owner_id} sx={{ alignSelf: 'center' }} />
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
                sx={{ mx: 'auto', mt: '.2em' }}
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
