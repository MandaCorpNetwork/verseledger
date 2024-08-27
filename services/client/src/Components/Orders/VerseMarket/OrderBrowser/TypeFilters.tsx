import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ItemTypes } from '@Common/Definitions/Orders/ItemTypes';
import { Grid, IconButton, Tooltip } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export const ItemTypeFilters: React.FC<unknown> = () => {
  const ItemTypeFilters = ItemTypes('inherit', 'large');
  return (
    <DigiBox data-testid="VerseMarket-Marketplace-Browser__TypeFilterWrapper" sx={{}}>
      <Grid2 container spacing={2} justifyContent="center">
        {ItemTypeFilters.map((item) => (
          <Grid key={item.value} item>
            <Tooltip title={item.type} placement="bottom">
              <IconButton>{item.icon}</IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid2>
    </DigiBox>
  );
};
