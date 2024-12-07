import { AllApps, POPUP_APP_LIST } from '@CommonLegacy/AppDockV3/Tools/AllAppsModal';
import {
  AddLocationPopup,
  AddLocationProps,
  POPUP_ADD_LOCATION,
} from '@Popups/AddLocation/AddLocation';
import {
  ContractBidProps,
  POPUP_SUBMIT_CONTRACT_BID,
  SubmitContractBid,
} from '@Popups/Contracts/ContractBids/ContractBid';
import {
  CounterOfferBid,
  CounterOfferBidProps,
  POPUP_COUNTER_OFFER_BID,
} from '@Popups/Contracts/ContractBids/CounterOffer';
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
  ImportFilePopup,
  ImportFileProps,
  POPUP_IMPORT_FILE,
} from '@Popups/Import/ImportFile';
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
import { LoginPopup, POPUP_LOGIN } from '@Popups/Login/LoginPopup';
import { AddOrgPopup, POPUP_ADD_ORG } from '@Popups/Orgs/AddOrg/AddOrg';
import { CreateOrgPopup, POPUP_CREATE_ORG } from '@Popups/Orgs/CreateOrg/CreateOrg';
import {
  PlayerCardPopup,
  PlayerCardPopupProps,
  POPUP_PLAYER_CARD,
} from '@Popups/PlayerCard/PlayerCard';
import {
  POPUP_SUBMIT_RATING,
  SubmitRatingPopup,
  SubmitRatingPopupProps,
} from '@Popups/Ratings/SubmitRating';
import {
  AddMissionPopup,
  POPUP_CREATE_MISSION,
} from '@Popups/Routes/AddMission/AddMission';
import { AddTaskPopup, POPUP_ADD_TASK } from '@Popups/Routes/AddTask/AddTask';
import { POPUP_SUPPORT_DEVELOPMENT, SupportDevPopup } from '@Popups/Support/SupportDev';
import { CreateTokenPopup, POPUP_CREATE_TOKEN } from '@Popups/Tokens/CreateToken';
import {
  POPUP_SHOW_TOKEN,
  ShowTokenPopup,
  ShowTokenPopupProps,
} from '@Popups/Tokens/ShowToken';
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
  const createTokenPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_CREATE_TOKEN),
  );
  const showTokenPopup = useAppSelector((state) => selectPopup(state, POPUP_SHOW_TOKEN));
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
  const counterOfferBidPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_COUNTER_OFFER_BID),
  );
  const submitRatingPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_SUBMIT_RATING),
  );
  const supportDevPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_SUPPORT_DEVELOPMENT),
  );
  const loginPopup = useAppSelector((state) => selectPopup(state, POPUP_LOGIN));
  const createMissionPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_CREATE_MISSION),
  );
  const addLocationPopup = useAppSelector((state) =>
    selectPopup(state, POPUP_ADD_LOCATION),
  );
  const allAppsPopup = useAppSelector((state) => selectPopup(state, POPUP_APP_LIST));
  const addTaskPopup = useAppSelector((state) => selectPopup(state, POPUP_ADD_TASK));
  const importFilePopup = useAppSelector((state) =>
    selectPopup(state, POPUP_IMPORT_FILE),
  );
  const addOrgPopup = useAppSelector((state) => selectPopup(state, POPUP_ADD_ORG));
  const createOrgPopup = useAppSelector((state) => selectPopup(state, POPUP_CREATE_ORG));
  return (
    <>
      {verifyUserPopup.open && <VerifyUserPopup />}
      {youSurePopup.open && (
        <YouSurePopup {...(youSurePopup.props as YouSurePopupProps)} />
      )}
      {createTokenPopup.open && <CreateTokenPopup />}
      {showTokenPopup.open && (
        <ShowTokenPopup {...(showTokenPopup.props as ShowTokenPopupProps)} />
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
      {counterOfferBidPopup.open && (
        <CounterOfferBid {...(counterOfferBidPopup.props as CounterOfferBidProps)} />
      )}
      {submitRatingPopup.open && (
        <SubmitRatingPopup {...(submitRatingPopup.props as SubmitRatingPopupProps)} />
      )}
      {supportDevPopup.open && <SupportDevPopup />}
      {loginPopup.open && <LoginPopup />}
      {createMissionPopup.open && <AddMissionPopup />}
      {addLocationPopup.open && (
        <AddLocationPopup {...(addLocationPopup.props as AddLocationProps)} />
      )}
      {allAppsPopup.open && <AllApps />}
      {addTaskPopup.open && <AddTaskPopup />}
      {importFilePopup.open && (
        <ImportFilePopup {...(importFilePopup.props as ImportFileProps)} />
      )}
      {addOrgPopup.open && <AddOrgPopup />}
      {createOrgPopup.open && <CreateOrgPopup />}
    </>
  );
};
