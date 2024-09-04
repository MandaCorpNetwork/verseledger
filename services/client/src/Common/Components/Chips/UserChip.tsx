import { MiniPlayerCard } from '@Common/Components/App/MiniPlayerCard';
import { Avatar, Chip } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { Logger } from '@Utils/Logger';
import { IUser, IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';

type UserChipProps = {
  user?: IUser;
  user_id?: string;
  size: 'small' | 'medium';
  onDelete?: () => void;
  sx?: object;
  color?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
};

export const UserChip: React.FC<UserChipProps> = (props) => {
  const { user, size, onDelete, user_id, color = 'secondary', sx } = props;
  const { playSound } = useSoundEffect();
  const dispatch = useAppDispatch();

  const pullPlayer = useAppSelector((state) =>
    user_id ? selectUserById(state, user_id) : undefined,
  );

  const player = user || pullPlayer;

  const handlePlayerCardOpen = () => {
    playSound('open');
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid: player?.id }));
  };

  const handleDeleteUser = () => {
    if (onDelete) {
      playSound('toggleOff');
      onDelete();
    }
  };

  Logger.info(`UserChip Recieved ID: ${player?.id}`);

  return (
    <MiniPlayerCard user={player as IUserWithSettings}>
      <Chip
        color={color}
        variant="outlined"
        size={size}
        onClick={handlePlayerCardOpen}
        label={player?.displayName}
        avatar={<Avatar src={player?.pfp} />}
        onDelete={onDelete ? handleDeleteUser : undefined}
        sx={{
          maxWidth: '150px',
          ...sx,
        }}
      />
    </MiniPlayerCard>
  );
};
