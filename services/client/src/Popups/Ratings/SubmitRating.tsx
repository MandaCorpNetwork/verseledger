import GlassBox from '@Common/Components/Boxes/GlassBox';
import { UserRatingField } from '@Common/Components/Custom/DigiField/UserRatingField';
import { Divider, FormControl, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { postDelayRating } from '@Redux/Slices/Notifications/actions/postDelayRating';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { postNewContractRating } from '@Redux/Slices/Users/Actions/postContractRating';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import {
  ICreateContractRatingsBody,
  ICreateUserRatingBody,
} from 'vl-shared/src/schemas/UserRatingsSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';

export const POPUP_SUBMIT_RATING = 'submitRating';

export type SubmitRatingPopupProps = {
  users: IUser[];
  contract?: IContract;
};

export const SubmitRatingPopup: React.FC<SubmitRatingPopupProps> = ({
  users,
  contract,
}) => {
  const [formData, setFormData] = React.useState<ICreateUserRatingBody[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();

  //const recentRatings = TODO: get the recent ratings to disabler the user from rating the same user twice

  React.useEffect(() => {
    const initialData = users.map((user) => ({
      reciever_id: user.id,
      rating_value: 0,
      ...(contract && { contract_id: contract.id }),
    }));
    if (owner && !initialData.find((data) => data.reciever_id === owner.id)) {
      initialData.push({
        reciever_id: owner.id,
        rating_value: 0,
        ...(contract && { contract_id: contract.id }),
      });
    }
    setFormData(initialData);
  }, [users]);

  const handleFormDataChange = (updatedData: ICreateUserRatingBody) => {
    setFormData((prevData) =>
      prevData.map((data) =>
        data.reciever_id === updatedData.reciever_id ? updatedData : data,
      ),
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

  const owner = useAppSelector((state) => {
    if (currentUser && contract && currentUser.id !== contract.owner_id) {
      return selectUserById(state, contract.owner_id);
    }
  });

  const handleSubmitRating = () => {
    if (contract && currentUser) {
      const ratingData = {
        contract_id: contract.id,
        ratings: formData as ICreateUserRatingBody[],
      };
      dispatch(postNewContractRating(ratingData as ICreateContractRatingsBody)).then(
        (res) => {
          if (postNewContractRating.fulfilled.match(res)) {
            enqueueSnackbar('Ratings Submitted', { variant: 'success' });
            playSound('send');
          } else {
            enqueueSnackbar(`Error Submitting Ratings ${res.error}`, {
              variant: 'error',
            });
            playSound('error');
          }
        },
      );
    }
  };

  const handleSubmit = () => {
    handleSubmitRating();
    dispatch(closePopup(POPUP_SUBMIT_RATING));
  };

  const popupTitle = getTitle() ?? '';

  const handleRatingDelay = () => {
    if (contract) {
      dispatch(postDelayRating(contract.id));
      dispatch(closePopup(POPUP_SUBMIT_RATING));
    }
  };

  const handleCancel = () => {
    if (contract) {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'User Ratings',
          subjectText: 'Submit User Ratings Later',
          bodyText: `Are you sure you don't want to submit your user ratings now?`,
          acceptText: 'Later',
          clickaway: true,
          onAccept: handleRatingDelay,
        }),
      );
    }
  };
  return (
    <VLPopup
      name={POPUP_SUBMIT_RATING}
      title={popupTitle}
      data-testid="SubmitRating"
      onSubmit={handleSubmit}
      cancelText="Maybe Later"
      onCancel={handleCancel}
    >
      <FormControl>
        <GlassBox sx={{ overflow: 'auto' }}>
          {contract && owner && (
            <>
              <Typography>Contract Owner</Typography>
              <UserRatingField
                user={owner}
                formData={
                  formData.find(
                    (data) => data.reciever_id === owner.id,
                  ) as ICreateUserRatingBody
                }
                setFormData={handleFormDataChange}
              />
            </>
          )}
          {owner && (
            <>
              <Divider />
            </>
          )}
          {contract && <Typography>Contractors</Typography>}
          {users.map((user) => (
            <UserRatingField
              key={user.id}
              user={user}
              formData={
                formData.find(
                  (data) => data.reciever_id === user.id,
                ) as ICreateUserRatingBody
              }
              setFormData={handleFormDataChange}
            />
          ))}
        </GlassBox>
      </FormControl>
    </VLPopup>
  );
};
