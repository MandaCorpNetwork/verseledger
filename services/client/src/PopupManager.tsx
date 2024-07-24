import {
  ContractBidProps,
  POPUP_SUBMIT_CONTRACT_BID,
  SubmitContractBid,
} from '@Popups/Contracts/ContractBids/ContractBid';
import {
  CreateContractPopup,
  POPUP_CREATE_CONTRACT,
} from '@Popups/Contracts/CreateContract/CreateContract';
import {
  EditContractPopup,
  EditContractPopupProps,
  POPUP_EDIT_CONTRACT,
} from '@Popups/Contracts/EditContract/EditContract';
import { FeedbackPopup, POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import {
  ArchetypeInfoPopup,
  ArchetypeInfoProps,
  POPUP_ARCHETYPE_INFO,
} from '@Popups/Info/Archetypes';
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
import {
  POPUP_USER_INVITE,
  UserInvitePopup,
  UserInvitePopupProps,
} from '@Popups/UserInvite/UserInvite';
import { POPUP_VERIFY_USER, VerifyUserPopup } from '@Popups/VerifyPopup/VerifyUser';
import {
  POPUP_YOU_SURE,
  YouSurePopup,
  YouSurePopupProps,
} from '@Popups/VerifyPopup/YouSure';
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
  const youSurePopup = useAppSelector((state) => selectPopup(state, POPUP_YOU_SURE));
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
  const archetypeInfoPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_ARCHETYPE_INFO),
  );
  const submitContractBidPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_SUBMIT_CONTRACT_BID),
  );
  const editContractPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_EDIT_CONTRACT),
  );
  return (
    <>
      {verifyUserPopup.open && <VerifyUserPopup />}
      {youSurePopup.open && (
        <YouSurePopup {...(youSurePopup.props as YouSurePopupProps)} />
      )}
      {feedbackPopup.open && <FeedbackPopup />}
      {createContractPopup.open && <CreateContractPopup />}
      {playerCardPopup.open && (
        <PlayerCardPopup {...(playerCardPopup.props as PlayerCardPopupProps)} />
      )}
      {userInvitePopup.open && (
        <UserInvitePopup {...(userInvitePopup.props as UserInvitePopupProps)} />
      )}
      {payStructuresPopup.open && <PayStructuresPopup />}
      {locationInfoPopup.open && (
        <LocationInfoPopup {...(locationInfoPopup.props as LocationInfoProps)} />
      )}
      {archetypeInfoPopup.open && (
        <ArchetypeInfoPopup {...(archetypeInfoPopup.props as ArchetypeInfoProps)} />
      )}
      {submitContractBidPopup.open && (
        <SubmitContractBid {...(submitContractBidPopup.props as ContractBidProps)} />
      )}
      {editContractPopup.open && (
        <EditContractPopup {...(editContractPopup.props as EditContractPopupProps)} />
      )}
    </>
  );
};
