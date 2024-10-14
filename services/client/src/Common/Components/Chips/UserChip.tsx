import { MiniPlayerCard } from '@Common/Components/App/MiniPlayerCard';
import { Avatar, Chip } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { IUser, IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';

type UserChipProps = {
  /** User Object to pass to the Chip */
  user?: IUser;
  /** User Id to pass if no User Object to pass */
  user_id?: string;
  /** Size of the Chip Component */
  size: 'small' | 'medium';
  /** (Optional) - Function to pass on delete of chip. Will make the chip delete button render */
  onDelete?: () => void;
  /** SX Props of the Chip */
  sx?: object;
  /** Sets the color of the Chip */
  color?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
};

/**
 * ### User Chip
 * @description
 * A Chip to display a User throughout the Site.
 */
export const UserChip: React.FC<UserChipProps> = (props) => {
  const { user, size, onDelete, user_id, color = 'secondary', sx } = props;
  // HOOKS
  const { playSound } = useSoundEffect();
  const dispatch = useAppDispatch();

  // LOGIC

  /** Fetches the UserId from the State if User Object isn't Passed to the component */
  const pullPlayer = useAppSelector((state) =>
    user_id ? selectUserById(state, user_id) : undefined,
  );

  /** The user object, either the passed user object or the one pulled from the state */
  const player = user || pullPlayer;

  /** Handles the click of the Chip that opens the Player Card */
  const handlePlayerCardOpen = () => {
    playSound('open');
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid: player?.id }));
  };

  /** Runs the passed onDelete function */
  const handleDeleteUser = () => {
    if (onDelete) {
      playSound('toggleOff');
      onDelete();
    }
  };

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
