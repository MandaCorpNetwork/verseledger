import {
  CreateContractPopup,
  POPUP_CREATE_CONTRACT,
} from '@Popups/CreateContract/CreateContract';
import { FeedbackPopup, POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import { useAppSelector } from '@Redux/hooks';
import { selectPopup } from '@Redux/Slices/Popups/popups.selectors';
import React from 'react';

export const PopupManager: React.FC = () => {
  const feedbackPopup = useAppSelector((state) => selectPopup(state, POPUP_FEEDBACK));
  const createContractPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_CREATE_CONTRACT),
  );
  return (
    <>
      {feedbackPopup.open && <FeedbackPopup />}
      {createContractPopup.open && <CreateContractPopup />}
    </>
  );
};
