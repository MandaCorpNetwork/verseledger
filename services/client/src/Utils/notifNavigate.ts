import { POPUP_SUBMIT_RATING } from '@Popups/Ratings/SubmitRating';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useNavigate } from 'react-router-dom';

export const notifNavigate = (
  feature: string,
  id: string,
  type: string,
  argument: string,
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (feature === 'contracts') {
    navigate(`contract?contractID=${id}`);
    const contract = useAppSelector((root) => selectContract(root, id));
    if (type === 'status') {
      if (argument === 'rate') {
        const contractUsers = contract.Bids?.filter(
          (bid) => bid.status === 'ACCEPTED',
        ).map((bid) => bid.User);
        dispatch(openPopup(POPUP_SUBMIT_RATING, { users: contractUsers, contract }));
      }
    }
  }
  return null;
};
