import { UserRatingField } from '@Common/Components/Custom/DigiField/UserRatingForm';
import { FormControl } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { postNewContractRating } from '@Redux/Slices/Users/Actions/postContractRating';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const POPUP_SUBMIT_RATING = 'submitRating';

export type SubmitRatingPopupProps = {
  users: IUser[];
  contract?: IContract;
};

type RatingFormData = {
  user: IUser;
  rating: number;
  comment: string | null;
};

export const SubmitRatingPopup: React.FC<SubmitRatingPopupProps> = ({
  users,
  contract,
}) => {
  const [formData, setFormData] = React.useState<RatingFormData[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const initialData = users.map((user) => ({
      user,
      rating: 0,
      comment: null,
    }));
    setFormData(initialData);
  }, [users]);

  const handleFormDataChange = (updatedData: RatingFormData) => {
    setFormData((prevData) =>
      prevData.map((data) => (data.user.id === updatedData.user.id ? updatedData : data)),
    );
  };
  const getTitle = () => {
    if (currentUser) {
      if (contract) {
        if (currentUser.id === contract.owner_id) {
          return 'Rate Contractors';
        } else {
          return 'Rate Employer';
        }
      }
    }
  };

  const handleSubmitRating = () => {
    if (contract && currentUser) {
      for (const data of formData) {
        const ratingData = {
          reciever_id: data.user.id,
          contract_id: contract.id,
          rating_value: data.rating,
          comment: data.comment || undefined,
        };
        dispatch(postNewContractRating(ratingData));
      }
    }
  };

  const handleSubmit = () => {
    handleSubmitRating();
    dispatch(closePopup(POPUP_SUBMIT_RATING));
  };

  const popupTitle = getTitle() ?? '';
  return (
    <VLPopup
      name={POPUP_SUBMIT_RATING}
      title={popupTitle}
      data-testid="SubmitRating"
      onSubmit={handleSubmit}
      cancelText="Maybe Later"
      onCancel={() => {}}
    >
      <FormControl>
        {users.map((user) => (
          <UserRatingField
            key={user.id}
            user={user}
            formData={formData.find((data) => data.user.id === user.id) as RatingFormData}
            setFormData={handleFormDataChange}
          />
        ))}
      </FormControl>
    </VLPopup>
  );
};
