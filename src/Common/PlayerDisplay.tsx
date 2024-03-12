import { Avatar, Box, Divider, Rating, Typography } from '@mui/material';

export const PlayerDisplay: React.FC<unknown> = () => {
  return (
    <Box
      data-id="PlayerDisplayContainer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        id="Player-Data"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Avatar
          id="Profile-Picture"
          src="https://images.unsplash.com/photo-1502685104226-ee32"
          sx={{ ml: 'auto', bgcolor: 'primary.dark' }}
        />
        <Rating
          id="Rating"
          name="Rating"
          sx={{ ml: 'auto', mr: 'auto', mt: 'auto', mb: '5%' }}
        />
        <Typography id="UserName" sx={{ ml: 'auto', mr: 'auto' }}>
          UserName
        </Typography>
      </Box>
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
