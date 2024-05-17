import { Avatar, Box, ButtonBase, Divider, Rating, Typography } from '@mui/material';

type PlayerDisplayProps = {
  userid: string;
};

export const UserDisplay: React.FC<PlayerDisplayProps> = () => {
  //const avatarPhoto = 123;
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
          srcSet="https://images.unsplash.com/photo-1502685104226-ee32"
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
            UserName
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
