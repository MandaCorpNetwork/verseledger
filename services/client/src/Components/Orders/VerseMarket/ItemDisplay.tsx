import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box } from '@mui/material';

export const ItemDisplay: React.FC<unknown> = () => {
  return (
    <GlassBox
      data-testid="VerseMarket-Marketplace-ItemDisplay"
      sx={{
        height: '100%',
        p: '.5em',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        mx: '.5em',
      }}
    >
      <Box data-testid="VerseMarket-Marketplace-ItemDisplay__TopBox">
        <Box data-testid="VerseMarket-Marketplace-ItemDisplay__TopBox__Left">
          <Box>Item Image</Box>
          <Box>Item Locations</Box>
        </Box>
        <Box data-testid="VerseMarket-Marketplace-ItemDisplay__Item_Charts_Wrapper">
          Item Charts
        </Box>
      </Box>
      <Box data-testid="VerseMarket-Marketplace-ItemDisplay__BottomBox">
        <Box data-testid="VerseMarket-Marketplace-ItemDisplay-Bottom__LeftBox">
          <Box>
            <Box>Item Description</Box>
            <Box>Item Details</Box>
          </Box>
          <Box data-testid="VerseMarket-Marketplace-ItemDisplay__OrderMarket">
            Order Market
          </Box>
        </Box>
        <Box data-testid="VerseMarket-Marketplace-ItemDisplay-Bottom__RightBox">
          Market Orders
        </Box>
      </Box>
    </GlassBox>
  );
};
