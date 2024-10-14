import { useSoundEffect } from '@Audio/AudioManager';
import { UserSearch } from '@Common/Components/App/UserSearch';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { Box } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { postContractInvite } from '@Redux/Slices/Contracts/actions/post/postContractInvite.action';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const POPUP_USER_INVITE = 'userInvite';

export type UserInvitePopupProps = {
  contractId: string;
};

export const UserInvitePopup: React.FC<UserInvitePopupProps> = ({ contractId }) => {
  const [selectedUsers, setSelectedUsers] = React.useState<IUser[]>([]); //eslint-disable-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();

  const handleAddUser = (selectedUser: IUser | null) => {
    if (selectedUser) {
      playSound('clickMain');
      setSelectedUsers((prev) => [...prev, selectedUser]);
    }
    Logger.info(selectedUsers);
  };

  const handleRemoveUser = (userToRemove: IUser) => {
    setSelectedUsers((selectedUsers) =>
      selectedUsers.filter((user) => user.id !== userToRemove.id),
    );
  };

  const handleFormSubmit = () => {
    selectedUsers.forEach((user) => {
      dispatch(postContractInvite({ contractId, userId: user.id }));
    });
    playSound('send');
    dispatch(closePopup(POPUP_USER_INVITE));
  };

  return (
    <VLPopup name={POPUP_USER_INVITE} title="Invite Users" onSubmit={handleFormSubmit}>
      <Box
        data-testid="UserInvitePopup__SearchBarWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          my: '1em',
        }}
      >
        <UserSearch width="250px" onUserSelect={handleAddUser} />
      </Box>
      <Box
        data-testid="UserInvitePopup__SelectedUsersWrapper"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1em',
        }}
      >
        {selectedUsers !== null &&
          selectedUsers.map((user) => (
            <UserChip
              key={user.id}
              user={user}
              size="small"
              onDelete={() => handleRemoveUser(user)}
            />
          ))}
      </Box>
    </VLPopup>
  );
};
