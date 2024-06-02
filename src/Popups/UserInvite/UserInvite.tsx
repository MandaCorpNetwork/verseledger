import { UserSearch } from '@Common/Components/Users/UserSearch';
import { Box, Chip } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

export const POPUP_USER_INVITE = 'userInvite';

export const UserInvitePopup: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const dispatch = useAppDispatch();

  const handleAddUser = (selectedUser: string) => {
    setSelectedUsers((selectedUsers) => ({ ...selectedUsers, selectedUser }));
    console.log(selectedUsers);
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
        {selectedUsers.map((user) => (
          <Chip key={user} />
        ))}
      </Box>
    </VLPopup>
  );
};
