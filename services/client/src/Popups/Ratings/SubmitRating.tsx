import GlassBox from '@Common/Components/Boxes/GlassBox';
import { UserRatingField } from '@Common/Components/Custom/UserRatingField';
import { Divider, FormControl, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { postNewContractRating } from '@Redux/Slices/Users/Actions/postContractRating.action';
import { selectUserById } from '@Redux/Slices/Users/users.selectors';
import { Logger } from '@Utils/Logger';
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
  const [formData, setFormData] = React.useState<ICreateUserRatingBody[] | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();

  //const recentRatings = TODO: get the recent ratings to disabler the user from rating the same user twice

  // Retreive the Owner User to rate if the user is not the Owner
  const owner = useAppSelector((state) => {
    if (currentUser && contract && currentUser.id !== contract.owner_id) {
      return selectUserById(state, contract.owner_id);
    }
  });

  // Retreives the Users availble to bid
  const getOptions = React.useCallback(() => {
    if (users == null) return;
    const validUsers = users.filter((user) => user.id !== currentUser?.id);
    return validUsers.map((user) => user);
  }, [currentUser?.id, users]);
  const options = getOptions();

  // Handle adding or updating an option on the dataForm
  const handleFormDataChange = React.useCallback(
    (updatedData: ICreateUserRatingBody) => {
      Logger.info(`Updated Data:`, updatedData);
      Logger.info(`Current FormData:`, formData);
      setFormData((prevData) => {
        if (!prevData) {
          return [updatedData];
        }
        const existingIndex = prevData?.findIndex(
          (data) => data.reciever_id === updatedData.reciever_id,
        );
        if (existingIndex !== -1) {
          const updatedFormData = [...prevData];
          updatedFormData[existingIndex] = updatedData;
          return updatedFormData;
        } else {
          return [...prevData, updatedData];
        }
      });
    },
    [setFormData, formData],
  );

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

  // Handle Thunk Action for submitting the ratings
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
            dispatch(closePopup(POPUP_SUBMIT_RATING));
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

  const handleCancel = () => {
    if (contract) {
      dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'User Ratings',
          subjectText: 'Submit User Ratings Later',
          bodyText: `Are you sure you don't want to submit your user ratings now?`,
          acceptText: 'Later',
          clickaway: true,
          onAccept: () => handleSubmitRating(),
        }),
      );
    }
    playSound('warning');
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
        <GlassBox sx={{ overflow: 'auto', gap: '.5em' }}>
          {contract && owner && (
            <>
              <Typography>Contract Owner</Typography>
              <UserRatingField
                user={owner}
                contractId={contract && contract.id}
                formData={
                  formData?.find(
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
          {options &&
            options.map((user) => (
              <UserRatingField
                key={user.id}
                user={user}
                contractId={contract && contract.id}
                formData={
                  formData?.find(
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
