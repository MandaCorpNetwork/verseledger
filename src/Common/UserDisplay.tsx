import { Avatar, Box, ButtonBase, Divider, Rating, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/contractSelectors';

type UserDisplayProps = {
  userid: string;
};

export const UserDisplay: React.FC<UserDisplayProps> = ({ userid }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectUserById(state, userid));

  const handlePlayerCardOpen = () => {
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
      }}
    >
      <ButtonBase
        data-testid="UserDisplay__PlayerDataButton"
        onClick={handlePlayerCardOpen}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          bgcolor: 'background.default',
          py: '.5em',
          px: '1em',
          borderLeft: '2px solid',
          borderRight: '2px solid',
          borderRadius: '5px',
          borderColor: 'secondary.dark',
          transition: 'background-color 300ms',
          '&:hover': {
            borderColor: 'secondary.light',
          },
          '&:active': {
            borderColor: 'secondary.main',
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: 'secondary.dark',
          },
        }}
      >
        <Avatar
          data-testid="UserDisplay-PlayerData__Avatar"
          src={user?.pfp}
          //alt={user.userName}
          sx={{ bgcolor: 'primary.dark', width: 55, height: 55 }}
        />
        <Box
          data-testid="UserDisplay-PlayerData__InfoWrapper"
          sx={{ display: 'flex', flexDirection: 'column', ml: '.5em' }}
        >
          <Rating
            data-testid="UserDisplay-PlayerData__UserRating"
            name="Rating"
            value={3}
            readOnly
            sx={{ ml: 'auto', mr: 'auto', mt: 'auto', mb: '5%' }}
          />
          <Typography
            data-testid="UserDisplay-PlayerData__UsernameText"
            sx={{ ml: 'auto', mr: 'auto' }}
          >
            {user?.handle}
          </Typography>
        </Box>
      </ButtonBase>
      <Divider
        variant="middle"
        color="secondary"
        sx={{ mb: '.5em', borderColor: 'text.secondary' }}
      />
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
