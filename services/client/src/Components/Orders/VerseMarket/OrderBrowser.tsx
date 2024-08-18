import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { FilterAlt } from '@mui/icons-material';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';

export const OrderBrowser: React.FC<unknown> = () => {
  return (
    <GlassBox
      data-testid="VerseMarket-Marketplace-Browser"
      sx={{
        height: '100%',
        p: '.5em',
      }}
    >
      <Box
        data-testid="VerseMarket-Marketplace-Browser__SearchToolsWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <IconButton>
          <FilterAlt fontSize="medium" />
        </IconButton>
        <Autocomplete
          renderInput={(params) => <TextField {...params} label="Search" />}
          options={testOptions}
          size="small"
          sx={{
            minWidth: '200px',
          }}
        />
      </Box>
      <DigiBox
        data-testid="VerseMarket-Marketplace-Browser__TypeFilterWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          p: '.5em',
          my: '.5em',
        }}
      >
        Insert Type Filter Buttons
      </DigiBox>
      <GlassDisplay
        data-testid="VerseMarket-Marketplace-Browser__List_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '.5em',
          my: '.5em',
        }}
      >
        <DigiDisplay>Column Bar for Marketplace</DigiDisplay>
      </GlassDisplay>
    </GlassBox>
  );
};

const testOptions = ['gold', 'platinum', 'diamond', 'ruby', 'emerald', 'topaz'];
