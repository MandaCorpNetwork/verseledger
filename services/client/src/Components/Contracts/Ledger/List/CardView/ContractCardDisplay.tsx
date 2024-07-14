import { Box, TablePagination } from '@mui/material';
import React from 'react';

import { ContractCard } from '@/Components/Contracts/Ledger/List/CardView/ContractCard';

type ContractCardDisplayProps = {
  onPick: (id: string | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contracts: any[];
  isSelected: string | null;
};

export const ContractCardDisplay: React.FC<ContractCardDisplayProps> = ({
  onPick,
  contracts,
  isSelected,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box
      data-testid="Contract-Card__DisplayContainer"
      sx={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Box
        data-testid="Contract-Card-Display__CardContainer"
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexWrap: 'wrap',
          gap: '1.5em',
          justifyContent: 'space-around',
          position: 'relative',
          minWidth: '100%',
        }}
      >
        {contracts.map((contract) => {
          return (
            <ContractCard
              contract={contract}
              key={contract.id}
              onClick={() => onPick(contract.id)}
              isSelected={isSelected === contract.id}
            />
          );
        })}
      </Box>
      <Box
        data-testid="Contract-Card-Display__PaginationContainer"
        sx={{
          width: '100%',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'primary.dark',
        }}
      >
        <TablePagination
          rowsPerPageOptions={[50, 100, 200]}
          component={Box}
          count={contracts.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Cards per page"
          sx={{
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            boxShadow: '0 0 8px 5px rgba(14,49,252,.4)',
            backgroundColor: 'rgba(0,1,19,.5)',
            width: '100%',
          }}
          slotProps={{
            select: {
              'aria-label': 'Cards per page',
              sx: {
                '& .MuiSelect-icon': {
                  color: 'secondary.main',
                },
              },
            },
            actions: {
              firstButtonIcon: {
                sx: {
                  color: 'secondary.main',
                },
              },
              nextButtonIcon: {
                sx: {
                  color: 'secondary.main',
                },
              },
              previousButtonIcon: {
                sx: {
                  color: 'secondary.main',
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
