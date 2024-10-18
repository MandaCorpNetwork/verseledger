import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Typography } from '@mui/material';

export const EmptyDisplay: React.FC = () => {
  return (
    <GlassBox
      data-testid="VerseMarket-Marketplace__EmptyDisplayContainer"
      sx={{
        height: '100%',
        p: '.5em',
        display: 'flex',
        flexDirection: 'column',
        mx: '.5em',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Typography variant="h4">No Selected Item</Typography>
    </GlassBox>
  );
};
