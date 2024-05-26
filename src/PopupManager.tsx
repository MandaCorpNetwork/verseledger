import {
  CreateContractPopup,
  POPUP_CREATE_CONTRACT,
} from '@Popups/CreateContract/CreateContract';
import { FeedbackPopup, POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import {
  PlayerCardPopup,
  PlayerCardPopupProps,
  POPUP_PLAYER_CARD,
} from '@Popups/PlayerCard/PlayerCard';
import { POPUP_USER_INVITE, UserInvitePopup } from '@Popups/UserInvite/UserInvite';
import { useAppSelector } from '@Redux/hooks';
import { selectPopup } from '@Redux/Slices/Popups/popups.selectors';
import React from 'react';

export const PopupManager: React.FC = () => {
  const feedbackPopup = useAppSelector((state) => selectPopup(state, POPUP_FEEDBACK));
  const createContractPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_CREATE_CONTRACT),
  );
  const playerCardPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_PLAYER_CARD),
  );
  const userInvitePopup = useAppSelector((state) =>
    selectPopup(state, POPUP_USER_INVITE),
  );
  return (
    <>
      {feedbackPopup.open && <FeedbackPopup />}
      {createContractPopup.open && <CreateContractPopup />}
      {playerCardPopup.open && (
        <PlayerCardPopup {...(playerCardPopup.props as PlayerCardPopupProps)} />
      )}
      {userInvitePopup.open && <UserInvitePopup />}
    </>
  );
};
