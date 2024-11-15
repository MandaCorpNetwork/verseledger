import { VLPopup } from '@Popups/PopupWrapper/Popup';
import React from 'react';

export const POPUP_CREATE_ORG = 'createOrg';

export const CreateOrgPopup: React.FC = () => {
  return <VLPopup name={POPUP_CREATE_ORG} title="Create Organization"></VLPopup>;
};
