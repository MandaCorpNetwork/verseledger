import { Avatar, Chip } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type UserChipProps = {
  user: IUser;
  size: 'small' | 'medium';
};

export const UserChip: React.FC<UserChipProps> = ({ user, size }) => {
  const dispatch = useAppDispatch();

  const handlePlayerCardOpen = () => {
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid: user.id }));
  };

  Logger.info(`UserChip Recieved ID: ${user.id}`);

  return (
    <>
      <Chip
        color="secondary"
        variant="outlined"
        size={size}
        onClick={handlePlayerCardOpen}
        label={user.displayName}
        avatar={<Avatar src={user.pfp} />}
        sx={{
          maxWidth: '150px',
        }}
      />
    </>
  );
};
