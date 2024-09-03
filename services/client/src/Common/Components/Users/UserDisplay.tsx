import { Avatar, Box, ButtonBase, Rating, Tooltip, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { memo } from 'react';

import { useSoundEffect } from '@/AudioManager';

import { MiniPlayerCard } from '../App/MiniPlayercard';

type UserDisplayProps = {
  userid: string;
  sx?: object;
};

const UserDisplayComponent: React.FC<UserDisplayProps> = ({ userid, sx }) => {
  const { playSound } = useSoundEffect();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectUserById(state, userid));

  const handlePlayerCardOpen = () => {
    playSound('open');
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid }));
  };

  return (
    <Box
      data-id="UserDisplayContainer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        ...sx,
      }}
    >
      <MiniPlayerCard user={user ?? undefined}>
        <ButtonBase
          data-testid="UserDisplay__PlayerDataButton"
          onClick={handlePlayerCardOpen}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundImage:
              'linear-gradient(135deg, rgba(14,35,141) 0%, rgba(8,22,80) 50%, rgba(0,1,19) 100%)',
            maxWidth: '100%',
            py: '.5em',
            px: '1em',
            borderLeft: '2px solid',
            borderRight: '2px solid',
            borderRadius: '5px',
            borderColor: 'secondary.main',
            boxShadow:
              '0 1px 2px rgba(0,0,0,.6), 0 2px 4px rgba(0,0,0,.5), 0 4px 8px rgba(0,0,0,.4), 0 8px 16px rgba(0,0,0,.3)',
            borderTop: '1px solid rgba(8,22,80,.6)',
            borderBottom: '1px solid rgba(8,22,80,.6)',
            position: 'relative',
            transition: 'all 100ms ease-in-out',
            '& .MuiTouchRipple-child': {
              backgroundcolor: 'secondary.dark',
            },
            '::after': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundImage: `
        linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 76%, transparent 77%, transparent)
      `,
              backgroundSize: '10px 10px',
              zIndex: '1',
              opacity: '0.2',
            },
            '::before': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              borderRadius: '5px',
              boxShadow: `inset 0 1px 2px rgba(24,252,252,.1), inset 0 -1px 2px rgba(0,1,19,0.1), inset 0 2px 4px rgba(24,252,252,0.1), inset 0 -2px 4px rgba(0,1,19,0.1)`,
              zIndex: '1',
            },
            '&:hover': {
              borderColor: 'secondary.light',
              borderTop: '1px solid rgba(8,22,80,.6)',
              borderBottom: '1px solid rgba(8,22,80,.6)',
              backgroundImage:
                'linear-gradient(135deg, rgba(14,35,161) 0%, rgba(8,22,100) 50%, rgba(0,1,39) 100%)',
              boxShadow:
                '0 1px 2px rgba(0,1,19,.8), 0 2px 4px rgba(0,0,0,.5), 0 4px 8px rgba(0,0,0,.4), 0 8px 16px rgba(0,0,0,.4), 0 16px 32px rgba(0,0,0,.2)',
            },
            '&:active': {
              borderColor: 'secondary.main',
              borderTop: '1px solid rgba(8,22,80,.6)',
              borderBottom: '1px solid rgba(8,22,80,.6)',
              backgroundImage:
                'linear-gradient(135deg, rgba(14,35,121) 0%, rgba(8,22,60) 50%, rgba(0,1,9) 100%)',
              transform: 'scale(0.98)',
            },
          }}
        >
          <Avatar
            data-testid="UserDisplay-PlayerData__Avatar"
            src={user?.pfp}
            //alt={user.userName}
            sx={{
              backgroundImage:
                'linear-gradient(135deg, rgba(8, 22, 80, 1) 0%, rgba(14, 35, 141, 0.5) 100%)',
              width: 55,
              height: 55,
              zIndex: 5,
              boxShadow:
                '0 1px 2px rgba(0,1,19,0.3), 0 2px 4px rgba(0,1,19,0.3), 0 4px 8px rgba(0,1,19,0.3), 0 8px 16px rgba(0,1,19,0.2)',
            }}
          />
          <Box
            data-testid="UserDisplay-PlayerData__InfoWrapper"
            sx={{ display: 'flex', flexDirection: 'column', ml: '.5em', width: '70%' }}
          >
            <Rating
              data-testid="UserDisplay-PlayerData__UserRating"
              name="Rating"
              size="small"
              value={3}
              readOnly
              sx={{
                ml: 'auto',
                mr: 'auto',
                mt: 'auto',
                mb: '5%',
              }}
            />
            <Typography
              data-testid="UserDisplay-PlayerData__UsernameText"
              noWrap
              sx={{ ml: 'auto', mr: 'auto', maxWidth: '100%' }}
            >
              {user?.handle}
            </Typography>
          </Box>
        </ButtonBase>
      </MiniPlayerCard>
      {/* <Divider
        variant="middle"
        color="secondary"
        sx={{ mb: '.5em', borderColor: 'text.secondary' }}
      /> */}
      {/*<Box
          id="Org-Data"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Box
            id="MainOrgLogo"
            sx={{ ml: '20%', mr: '20%', bgcolor: 'primary.dark', width: '50', height: '50' }}
          ><img /></Box>
          <Skeleton
            id="Rank"
            variant="text"
            animation="wave"
            width={60}
            height={30}
            sx={{ m: 'auto', bgcolor: 'primary.dark' }}
          />
          <Skeleton
            id="Role"
            variant="text"
            animation="wave"
            width={60}
            height={30}
            sx={{ m: 'auto', bgcolor: 'primary.dark' }}
          />
        </Box>*/}
    </Box>
  );
};

export const UserDisplay = memo(UserDisplayComponent);
