import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ItemTypes } from '@Common/Definitions/Orders/ItemTypes';
import { Grid, IconButton, Tooltip } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

/**
 * ### ItemTypeFilters
 * @description
 * This is the Type Filters Component for the VerseMarket. It is used to filter the items within the ItemBrowser.
 * @version 0.1.0
 * @returns {React.FC}
 * #### Functional Components
 * #### Styled Components
 * @component {@link DigiBox}
 * @author ThreeCrown - Aug 2024
 */
export const ItemTypeFilters: React.FC<unknown> = () => {
  // LOCAL STATES
  const [filter, setFilter] = useURLQuery();

  // HOOKS
  const { playSound } = useSoundEffect();

  // LOGIC
  /** @var {ItemTypeFilters} - An array of ItemType Objects */
  const ItemTypeFilters = ItemTypes('inherit', 'large');

  /**
   * @function handleFilterSelect - This function is used to handle the selection of a filter.
   */
  const handleFilterSelect = React.useCallback(
    (type: string) => {
      playSound('clickMain');
      setFilter(QueryNames.ItemType, type);
    },
    [setFilter],
  );

  /** @var {currentFilter} - The current filter */
  const currentFilter = filter.get(QueryNames.ItemType);
  return (
    <DigiBox
      data-testid="VerseMarket-Marketplace-Browser__TypeFilterWrapper"
      sx={{
        display: 'flex',
        p: '1em',
        maxWidth: '400px',
        my: '1em',
      }}
    >
      <Grid2
        data-testid="VerseMarket-Marketplace-Browser-TypeFilter__Grid"
        container
        spacing={2}
        justifyContent="center"
      >
        {ItemTypeFilters.map((item) => (
          <Grid key={item.value} item>
            <Tooltip
              title={item.type}
              placement="bottom"
              disableInteractive
              enterDelay={400}
            >
              <IconButton
                data-testid={`VerseMarket-Marketplace-Browser-TypeFilter__${item.value}`}
                onClick={() => handleFilterSelect(item.value)}
                color={currentFilter === item.value ? 'secondary' : 'primary'}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid2>
    </DigiBox>
  );
};
