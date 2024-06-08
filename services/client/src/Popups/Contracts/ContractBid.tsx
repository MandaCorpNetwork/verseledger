import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

export const POPUP_SUBMIT_CONTRACT_BID = 'submitContractBid';

export type ContractBidProps = {
  contract: IContract;
};

export const SubmitContractBid: React.FC<ContractBidProps> = (props) => {
  const { contract } = props;

  return (
    <VLPopup name={POPUP_SUBMIT_CONTRACT_BID} title="Submit Bid">
      Pass in Contract && Check if Bargaining == true && Pass in Details w/ submit || pass
      in details with store formData to pass back to negotiate
    </VLPopup>
  );
};
