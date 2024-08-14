// import { UserRatingField } from '@Common/Components/Custom/DigiField/UserRatingForm';
import { Box } from '@mui/material';

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
      {/* Work Area Below This Line */}
      {/* <Button variant="contained" onClick={handleClick}>
        Test Button
      </Button> */}
      {/* <UserRatingField /> */}
    </Box>
  );
};
