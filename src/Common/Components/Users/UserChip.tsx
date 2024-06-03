import { Avatar, Chip } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/contractSelectors';

type UserChipProps = {
  userid: string;
  size: 'small' | 'medium';
};

export const UserChip: React.FC<UserChipProps> = ({ userid, size }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectUserById(state, userid));

  const handlePlayerCardOpen = () => {
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid }));
  };

  return (
    <>
      <Chip
        color="secondary"
        variant="outlined"
        size={size}
        onClick={handlePlayerCardOpen}
        label={user?.displayName}
        avatar={<Avatar src={user?.pfp} />}
        sx={{
          maxWidth: '150px',
        }}
      />
    </>
  );
};
