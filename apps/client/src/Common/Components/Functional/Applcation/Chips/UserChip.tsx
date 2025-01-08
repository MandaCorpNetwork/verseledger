import { useSoundEffect } from '@Audio/AudioManager';
import { MiniPlayerCard } from '@CommonLegacy/Components/App/MiniPlayerCard';
import { Avatar, Chip, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useCallback, useMemo } from 'react';
import { IUser, IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

type UserChipProps = {
  user: IUser;
  'data-testid'?: string;
  'aria-label'?: string;
  size?: 'small' | 'medium';
  onDelete?: () => void;
  sx?: SxProps<Theme>;
  color?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
  slotProps?: {
    avatar?: {
      sx?: SxProps<Theme>;
    };
  };
};

export const UserChip: React.FC<UserChipProps> = (props) => {
  const {
    user,
    size,
    onDelete,
    sx,
    'data-testid': testId = 'UserChip',
    'aria-label': ariaLabel = 'Clickable User Chip that displays information of a User',
    color,
    slotProps,
  } = props;

  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const themeExtend = useDynamicTheme();

  /** Handle Opening the Player Card */
  const handlePlayerCardOpen = useCallback(() => {
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid: user.id }));
  }, [dispatch, user.id]);

  /** Runs the passed delete function with sound */
  const handleDeleteUser = useCallback(() => {
    if (onDelete) {
      sound.playSound('warning');
      onDelete();
    }
  }, [onDelete, sound]);

  const layout = useMemo(() => {
    const chip = themeExtend.layout('Chips.UserChip');
    const avatar = themeExtend.layout('Chips.UserChipAvatar');

    const chipOverwrite = {
      ...chip,
      ...sx,
    };
    const avatarOverwrite = {
      ...avatar,
      ...slotProps?.avatar?.sx,
    };

    return { chipOverwrite, avatarOverwrite };
  }, [slotProps?.avatar?.sx, sx, themeExtend]);

  return (
    <MiniPlayerCard user={user as IUserWithSettings}>
      <Chip
        data-testid={testId}
        aria-label={ariaLabel}
        color={color}
        size={size}
        onClick={(e) => {
          e.stopPropagation();
          handlePlayerCardOpen();
        }}
        label={user.displayName}
        avatar={<Avatar src={user.pfp} sx={{ ...layout.avatarOverwrite }} />}
        onDelete={
          onDelete
            ? (e) => {
                e.stopPropogation();
                handleDeleteUser();
              }
            : undefined
        }
        sx={{
          maxWidth: '150px',
          ...layout.chipOverwrite,
        }}
      />
    </MiniPlayerCard>
  );
};
