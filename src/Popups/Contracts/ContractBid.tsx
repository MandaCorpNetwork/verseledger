import { VLPopup } from '@Popups/PopupWrapper/Popup';

export const POPUP_SUBMIT_CONTRACT_BID = 'submitContractBid';

export const SubmitContractBid: React.FC<unknown> = () => {
  return (
    <VLPopup name={POPUP_SUBMIT_CONTRACT_BID} title="Submit Bid">
      Going to add bidding Logic
    </VLPopup>
  );
};
