import {
  POPUP_SUBMIT_CONTRACT_BID,
  SubmitContractBid,
} from '@Popups/Contracts/ContractBid';
import {
  CreateContractPopup,
  POPUP_CREATE_CONTRACT,
} from '@Popups/CreateContract/CreateContract';
import { FeedbackPopup, POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import {
  LocationInfoPopup,
  LocationInfoProps,
  POPUP_LOCATION_INFO,
} from '@Popups/Info/Locations';
import { PayStructuresPopup, POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import {
  PlayerCardPopup,
  PlayerCardPopupProps,
  POPUP_PLAYER_CARD,
} from '@Popups/PlayerCard/PlayerCard';
import { POPUP_USER_INVITE, UserInvitePopup } from '@Popups/UserInvite/UserInvite';
import { POPUP_VERIFY_USER, VerifyUserPopup } from '@Popups/VerifyPopup/VerifyUser';
import { useAppSelector } from '@Redux/hooks';
import { selectPopup } from '@Redux/Slices/Popups/popups.selectors';
import React from 'react';

export const PopupManager: React.FC = () => {
  const feedbackPopup = useAppSelector((state) => selectPopup(state, POPUP_FEEDBACK));
  const createContractPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_CREATE_CONTRACT),
  );
  const verifyUserPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_VERIFY_USER),
  );
  const playerCardPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_PLAYER_CARD),
  );
  const userInvitePopup = useAppSelector((state) =>
    selectPopup(state, POPUP_USER_INVITE),
  );
  const payStructuresPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_PAY_STRUCTURES),
  );
  const locationInfoPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_LOCATION_INFO),
  );
  const submitContractBidPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_SUBMIT_CONTRACT_BID),
  );
  return (
    <>
      {verifyUserPopup.open && <VerifyUserPopup />}
      {feedbackPopup.open && <FeedbackPopup />}
      {createContractPopup.open && <CreateContractPopup />}
      {playerCardPopup.open && (
        <PlayerCardPopup {...(playerCardPopup.props as PlayerCardPopupProps)} />
      )}
      {userInvitePopup.open && <UserInvitePopup />}
      {payStructuresPopup.open && <PayStructuresPopup />}
      {locationInfoPopup.open && (
        <LocationInfoPopup {...(locationInfoPopup.props as LocationInfoProps)} />
      )}
      {submitContractBidPopup.open && <SubmitContractBid />}
    </>
  );
};
