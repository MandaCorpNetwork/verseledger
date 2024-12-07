import { useSoundEffect } from '@Audio/AudioManager';
import { DigiBox } from '@CommonLegacy/Components/Boxes/DigiBox';
import { ItemTypes } from '@CommonLegacy/DefinitionsLegacy/Structures/Orders/ItemTypes';
import { Grid2, IconButton, Tooltip } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

/**
 * ### ItemTypeFilters
 * @description
 * This is the Type Filters Component for the VerseMarket. It is used to filter the items within the ItemBrowser.
 * #### Functional Components
 * #### Styled Components
 * @component {@link DigiBox}
 */
export const ItemTypeFilters: React.FC<unknown> = () => {
  // LOCAL STATES
  const { searchParams, setFilters } = useURLQuery();

  // HOOKS
  const sound = useSoundEffect();

  // LOGIC
  /** @var {ItemTypeFilters} - An array of ItemType Objects */
  const ItemTypeFilters = ItemTypes('inherit', 'large');

  /**
   * This function is used to handle the selection of a filter.
   */
  const handleFilterSelect = React.useCallback(
    (type: string) => {
      sound.playSound('clickMain');
      setFilters(QueryNames.ItemType, type);
    },
    [sound, setFilters],
  );

  /** @var {currentFilter} - The current filter */
  const currentFilter = searchParams.get(QueryNames.ItemType);
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
          <Grid2 key={item.value}>
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
          </Grid2>
        ))}
      </Grid2>
    </DigiBox>
  );
};
