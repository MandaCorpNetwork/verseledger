import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const POPUP_SUBMIT_RATING = 'submitRating';

export type SubmitRatingPopupProps = {
  users: IUser[];
  type: 'contract' | 'order';
  contract?: IContract;
};

export const SubmitRatingPopup: React.FC<SubmitRatingPopupProps> = ({
  users,
  type,
  contract,
}) => {
  return (
    <VLPopup></VLPopup>
  )
};
