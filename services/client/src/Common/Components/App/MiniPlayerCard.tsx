import Spectrum from '@Assets/media/Spectrum.png?url';
import { useSoundEffect } from '@Audio/AudioManager';
import { RatingDisplay } from '@Common/Components/App/RatingDisplay';
import { userBackgroundOptions } from '@Common/Definitions/Structures/Users/UserBackgrounds';
import { AccountBox, Message } from '@mui/icons-material';
import { Avatar, Box, IconButton, Popper, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

type MiniPlayerCardProps = PropsWithChildren<{
  /** User Object passed to the component */
  user?: IUserWithSettings;
}>;

/**
 * ### Mini Player Card
 * @description
 * A small popper component to display Player Summary when hovering over a Child Component.
 */
export const MiniPlayerCard: React.FC<MiniPlayerCardProps> = (props) => {
  const { children, user } = props;

  // LOCAL STATES
  /** A state that determines the Anchor Element */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  /** A boolean state to determine if the Popper is open */
  const [popperOpen, setPopperOpen] = React.useState(false);

  // HOOKS
  /** A ref to timeout the Popper being open if you stop hovering over the child element. Prevents the Popper from Closing too fast if so you can move the mouse inside the popper */
  const popperTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const sound = useSoundEffect();
  const navigate = useNavigate();

  // LOGIC

  /** Handles the Mouse entering the Child Component */
  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setPopperOpen(true);
    if (popperTimeoutRef.current) {
      clearTimeout(popperTimeoutRef.current);
    }
  }, []);

  /** Handles the Mouse Leaving the Child Component */
  const handleMouseLeave = React.useCallback(() => {
    popperTimeoutRef.current = setTimeout(() => {
      setPopperOpen(false);
    }, 100);
  }, []);

  /** Handles the Mouse Entering to the Popper to prevent it from Closing */
  const handlePopperMouseEnter = React.useCallback(() => {
    if (popperTimeoutRef.current) {
      clearTimeout(popperTimeoutRef.current);
    }
    setPopperOpen(true);
  }, []);

  /** Handles the Mouse Leaving the Popper to ensure that it closes */
  const handlePopperMouseLeave = React.useCallback(() => {
    popperTimeoutRef.current = setTimeout(() => {
      setPopperOpen(false);
    }, 100);
  }, []);

  /** Boolean Value to check if the the popper is opened based on two states to ensure that it closes itself if the user is no longer hovering over the popper */
  const open = popperOpen && Boolean(anchorEl);

  /** Passes the value of the User's Profile Background for the Popper */
  const selectedUserImage = user?.Settings?.userPageImage;

  /** Fetches the URL of the user's background based on the Page Image value */
  const getUserBackground = React.useCallback(() => {
    const backgroundOption = userBackgroundOptions.find(
      (option) => option.value === selectedUserImage,
    );
    return backgroundOption ? backgroundOption.url : userBackgroundOptions[0].url;
  }, [selectedUserImage]);

  /** Handles the Click of the User Profile Button to navigate to the UserPage */
  const onProfileClick = React.useCallback(
    (_event: React.SyntheticEvent) => {
      navigate(`/user/${user?.id}`);
    },
    [navigate, user?.id],
  );

  return (
    <>
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        onMouseEnter={handlePopperMouseEnter}
        onMouseLeave={handlePopperMouseLeave}
        sx={{ zIndex: 'tooltip' }}
      >
        <Box
          sx={{
            background:
              'linear-gradient(135deg, rgba(0,1,19), rgba(8,22,80), rgba(14,35,141))',
            m: '.5em',
            zIndex: 'tooltip',
            transition: 'opacity 0.3s ease-in-out',
            opacity: open ? 1 : 0,
            borderRadius: '5px',
            border: '1px solid',
            borderColor: 'primary.main',
            boxShadow:
              '0 6px 12px rgba(0,0,0,.4), 0 12px 24px rgba(0,0,0,.5), inset 0 1px 2px rgba(14,35,141,.3), inset 0 -1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <Box
            sx={{
              background: `url(${getUserBackground()}) center/cover no-repeat`,
              minWidth: '300px',
              minHeight: '100px',
              display: 'flex',
              p: '.5em',
              borderRadius: '5px',
              gap: '1em',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '.5em',
                alignItems: 'center',
                background: 'rgba(0,0,0,.5)',
                p: '.5em',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0,0,0,.5), 0 8px 16px rgba(0,0,0,.6)',
              }}
            >
              <Avatar
                src={user?.pfp}
                sx={{
                  height: '55px',
                  width: '55px',
                  border: '1px solid',
                  borderColor: 'rgba(24,252,252,.4)',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body2">{user?.displayName}</Typography>
                <Typography
                  variant="body2"
                  color="grey"
                  sx={{ textShadow: '0 3px 5px rgba(0,0,0)' }}
                >
                  @{user?.handle}
                </Typography>
                <RatingDisplay
                  value={user?.display_rating ?? -1}
                  variant="defined"
                  size="small"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  borderRadius: '5px',
                  p: '.5em',
                  boxShadow: '0 4px 8px rgba(0,0,0,.5)',
                  gap: '.5em',
                }}
              >
                <IconButton
                  component="a"
                  href={`https://robertsspaceindustries.com/citizens/${user?.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSound('navigate')}
                >
                  <img src={Spectrum} alt="Spectrum" width="24px" height="24px" />
                </IconButton>
                <IconButton disabled>
                  <Message />
                </IconButton>
                <IconButton onClick={onProfileClick}>
                  <AccountBox />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popper>
    </>
  );
};
