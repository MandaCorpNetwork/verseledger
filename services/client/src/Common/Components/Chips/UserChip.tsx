import { Avatar, Chip } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { Logger } from '@Utils/Logger';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type UserChipProps = {
  user?: IUser;
  user_id?: string;
  size: 'small' | 'medium';
  onDelete?: () => void;
};

export const UserChip: React.FC<UserChipProps> = ({ user, size, onDelete, user_id }) => {
  const dispatch = useAppDispatch();

  const pullPlayer = useAppSelector((state) =>
    user_id ? selectUserById(state, user_id) : undefined,
  );

  const player = user || pullPlayer;

  const handlePlayerCardOpen = () => {
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid: player?.id }));
  };

  const handleDeleteUser = () => {
    if (onDelete) {
      onDelete();
    }
  };

  Logger.info(`UserChip Recieved ID: ${player?.id}`);

  return (
    <>
      <Chip
        color="secondary"
        variant="outlined"
        size={size}
        onClick={handlePlayerCardOpen}
        label={player?.displayName}
        avatar={<Avatar src={player?.pfp} />}
        onDelete={onDelete ? handleDeleteUser : undefined}
        sx={{
          maxWidth: '150px',
        }}
      />
    </>
  );
};
