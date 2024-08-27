import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Autocomplete, Box, TextField } from '@mui/material';

import { ItemTypeFilters } from './TypeFilters';

/**
 * ### OrderBrowser
 * @description
 * This is the Browser Component for the VerseMarket. It is used to search for various items within the marketplace.
 * @version 0.1.0
 * @returns {React.FC}
 * #### Functional Components
 * #### Styled Components
 * @author ThreeCrown - Aug 2024
 */
export const ItemBrowser: React.FC<unknown> = () => {
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
          my: '1em',
        }}
      >
        <Autocomplete
          renderInput={(params) => <TextField {...params} label="Search" />}
          options={testOptions}
          size="small"
          sx={{
            minWidth: '200px',
          }}
        />
      </Box>
      <ItemTypeFilters />
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
