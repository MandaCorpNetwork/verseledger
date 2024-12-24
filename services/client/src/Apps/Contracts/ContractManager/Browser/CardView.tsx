import { List, ListItem } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContracts } from '@Redux/Slices/Contracts/contracts.selectors';
import { useVirtualizer } from '@tanstack/react-virtual';
import type React from 'react';

type CardViewProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
};

/**
 * Virtualized List of Contract Cards for the Contract Manager
 */
export const CardView: React.FC<CardViewProps> = ({ scrollRef }) => {
  const contracts = useAppSelector(selectContracts);

  const virtualizer = useVirtualizer({
    count: contracts.length,
    estimateSize: () => 120,
    getScrollElement: () => scrollRef.current,
    overscan: 3,
  });

  return (
    <List
      sx={{
        position: 'relative',
        height: virtualizer.getTotalSize(),
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const contract = contracts[virtualRow.index];
        return (
          <ListItem
            key={contract.id}
            sx={{
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {contract.title}
          </ListItem>
        );
      })}
    </List>
  );
};
