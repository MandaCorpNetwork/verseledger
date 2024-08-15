// import { UserRatingField } from '@Common/Components/Custom/DigiField/UserRatingForm';
import { AppbarListButton } from '@Common/Components/Lists/AppbarListButton';
import { Box, ListItemText } from '@mui/material';

export const SandboxContent: React.FC<unknown> = () => {
  // const dispatch = useAppDispatch();
  // const handleClick = () => {
  //   dispatch(openPopup(POPUP_SUBMIT_RATING));
  // };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '1em',
      }}
    >
      <Box>
        <AppbarListButton>
          <ListItemText primary={`Test Notification`} />
        </AppbarListButton>
      </Box>
    </Box>
  );
};
