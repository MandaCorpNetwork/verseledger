import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

export const POPUP_FEEDBACK = 'feedback';

export const FeedbackPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <VLPopup
      name={POPUP_FEEDBACK}
      title="Feedback"
      onSubmit={() => dispatch(closePopup(POPUP_FEEDBACK))}
    >
      Gib Feedback pls
    </VLPopup>
  );
};
