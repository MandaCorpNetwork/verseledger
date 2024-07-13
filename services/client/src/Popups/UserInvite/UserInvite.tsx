import { UserSearch } from '@Common/Components/App/UserSearch';
import { UserChip } from '@Common/Components/Users/UserChip';
import { Box } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const POPUP_USER_INVITE = 'userInvite';

export const UserInvitePopup: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = React.useState([]); //eslint-disable-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();

  const handleAddUser = (selectedUser: IUser | null) => {
    setSelectedUsers((selectedUsers) => ({ ...selectedUsers, selectedUser }));
    Logger.info(selectedUsers);
  };

  return (
    <VLPopup
      name={POPUP_USER_INVITE}
      title="Invite Users"
      onSubmit={() => dispatch(closePopup(POPUP_USER_INVITE))}
    >
      <Box>
        <UserSearch width="250px" onUserSelect={handleAddUser} />
      </Box>
      <Box>
        {selectedUsers !== null &&
          selectedUsers.map((user) => <UserChip key={user} user={user} size="small" />)}
      </Box>
    </VLPopup>
  );
};
