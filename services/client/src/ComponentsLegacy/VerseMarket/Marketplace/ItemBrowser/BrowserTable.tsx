import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { ItemTypes } from '@CommonLegacy/DefinitionsLegacy/Structures/Orders/ItemTypes';
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import React from 'react';

import { allItemsHeader } from './TableColumns';

/**
 * ### MarketBrowserTable
 * @description
 * This is the Table display of the Verse Market. Currently it changes it's header bar based on the selected filter.
 * #### Functional Components
 * #### Styled Components
 * @component {@link DigiBox}
 */
export const MarketBrowserTable: React.FC = () => {
  // LOCAL STATE
  const { searchParams } = useURLQuery();
  // HOOKS

  // LOGIC
  /** @var {currentFilter} - The current filter */
  const currentFilter = searchParams.get(QueryNames.ItemType) || 'all';

  /**
   * Fetches the current Header Object from the ItemTypes array to pass to the table depending on the selected filter.
   */
  const currentHeader = React.useMemo(() => {
    const itemTypes = ItemTypes('inherit', 'small');
    const matchingItemType = itemTypes.find((item) => item.value === currentFilter);
    return matchingItemType ? matchingItemType.header : allItemsHeader;
  }, [currentFilter]);
  return (
    <ComponentContainer>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {currentHeader.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </ComponentContainer>
  );
};
