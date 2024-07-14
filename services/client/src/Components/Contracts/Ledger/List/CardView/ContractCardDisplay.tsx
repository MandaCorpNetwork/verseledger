import { Box, TablePagination } from '@mui/material';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractCard } from '@/Components/Contracts/Ledger/List/CardView/ContractCard';

type ContractCardDisplayProps = {
  onPick: (id: string | null) => void;
  contracts: IContract[];
  isSelected: string | null;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalContracts: number;
};

export const ContractCardDisplay: React.FC<ContractCardDisplayProps> = ({
  onPick,
  contracts,
  isSelected,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  totalContracts,
}) => {
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
          rowsPerPageOptions={[25, 50, 100]}
          component={Box}
          count={totalContracts}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
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
