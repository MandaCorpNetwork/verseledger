import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { pickContract } from '@Redux/Slices/Contracts/contractSelectors';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

export const POPUP_SUBMIT_CONTRACT_BID = 'submitContractBid';

export type ContractBidProps = {
  contract: IContract;
};

export const SubmitContractBid: React.FC<ContractBidProps> = ({ contract }) => {
  const dispatch = useAppDispatch();

  return (
    <VLPopup name={POPUP_SUBMIT_CONTRACT_BID} title="Submit Bid">
      {contract.isBargaining ? (
        <Box>
          <Box>
            <UserDisplay userid={contract.owner_id} />
          </Box>
          <Box>
            <Typography>Contract Details</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Typography>Contract Type</Typography>
              <Typography>Briefing</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </VLPopup>
  );
};
