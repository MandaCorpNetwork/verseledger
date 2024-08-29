import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ItemTypes } from '@Common/Definitions/Orders/ItemTypes';
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { allItemsHeader } from './TableColumns';

/**
 * ### MarketBrowserTable
 * @description
 * This is the Table display of the Verse Market. Currently it changes it's header bar based on the selected filter.
 * @version 0.1.0
 * @returns {React.FC}
 * #### Functional Components
 * #### Styled Components
 * @component {@link DigiBox}
 * @author ThreeCrown - Aug 2024
 */
export const MarketBrowserTable: React.FC = () => {
  // LOCAL STATE
  const [filter] = useURLQuery();
  // HOOKS

  // LOGIC
  /** @var {currentFilter} - The current filter */
  const currentFilter = filter.get(QueryNames.ItemType) || 'all';

  /**
   * @function currentHeader - Fetches the current Header Object from the ItemTypes array to pass to the table depending on the selected filter.
   * @returns {Column[]} header object
   */
  const currentHeader = React.useMemo(() => {
    const itemTypes = ItemTypes('inherit', 'small');
    const matchingItemType = itemTypes.find((item) => item.value === currentFilter);
    return matchingItemType ? matchingItemType.header : allItemsHeader;
  }, [currentFilter]);
  return (
    <DigiBox>
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
    </DigiBox>
  );
};
