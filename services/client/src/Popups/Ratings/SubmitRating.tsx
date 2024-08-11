import { UserRatingField } from '@Common/Components/Custom/DigiField/UserRatingForm';
import { Box, FormControl, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
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

  const popupTitle = getTitle() ?? '';
  return (
    <VLPopup name={POPUP_SUBMIT_RATING} title={popupTitle} data-testid="SubmitRating">
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
