import Spectrum from '@Assets/media/Spectrum.png?url';
import { userBackgroundOptions } from '@Common/Definitions/Users/UserBackgrounds';
import { AccountBox, Message } from '@mui/icons-material';
import { Avatar, Box, IconButton, Popper, Rating, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';

type MiniPlayerCardProps = PropsWithChildren<{
  user?: IUserWithSettings;
}>;
export const MiniPlayerCard: React.FC<MiniPlayerCardProps> = (props) => {
  const { children, user } = props;
  // LOCAL STATES
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [popperOpen, setPopperOpen] = React.useState(false);
  const popperTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  // HOOKS
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();
  // LOGIC
  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setPopperOpen(true);
    if (popperTimeoutRef.current) {
      clearTimeout(popperTimeoutRef.current);
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    popperTimeoutRef.current = setTimeout(() => {
      setPopperOpen(false);
    }, 100);
  }, []);

  const handlePopperMouseEnter = React.useCallback(() => {
    if (popperTimeoutRef.current) {
      clearTimeout(popperTimeoutRef.current);
    }
    setPopperOpen(true);
  }, []);

  const handlePopperMouseLeave = React.useCallback(() => {
    popperTimeoutRef.current = setTimeout(() => {
      setPopperOpen(false);
    }, 100);
  }, []);
  const open = popperOpen && Boolean(anchorEl);
  const selectedUserImage = user?.Settings?.userPageImage;
  console.log('user:', user);
  console.log('Selected User Image:', selectedUserImage);
  const getUserBackground = React.useCallback(() => {
    const backgroundOption = userBackgroundOptions.find(
      (option) => option.value === selectedUserImage,
    );
    return backgroundOption ? backgroundOption.url : userBackgroundOptions[0].url;
  }, [userBackgroundOptions, selectedUserImage]);
  const onProfileClick = React.useCallback((_event: React.SyntheticEvent) => {
    navigate(`/user/${user?.id}`);
  }, []);
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
        sx={{ zIndex: 100 }}
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
                <Rating value={4} readOnly size="small" />
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
                  onClick={() => playSound('navigate')}
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
