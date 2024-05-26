import { FeedbackPopup } from '@Popups/FeedbackForm/FeedbackPopup';
import { useAppSelector } from '@Redux/hooks';
import { selectPopup } from '@Redux/Slices/Popups/popups.selectors';
import React from 'react';

export const PopupManager: React.FC = () => {
  const feedbackPopup = useAppSelector((state) => selectPopup(state, 'feedback'));
  return <>{feedbackPopup.open && <FeedbackPopup />}</>;
};
