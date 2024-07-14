import { Box, Pagination } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractManagerContractCard } from './ContractManagerContractCard';

type ContractManagerListProps = {
  contracts: IContract[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  page: number;
  setPage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  pageCount: number;
};

export const ContractManagerContractList: React.FC<ContractManagerListProps> = ({
  contracts,
  selectedId,
  setSelectedId,
  page,
  setPage,
  pageCount,
}) => {
  return (
    <Box
      data-testid="ContractManager__ContractListWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        alignItems: 'center',
        mb: '5%',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgb(8, 29, 68)',
          borderRadius: '20px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          background: 'rgb(121, 192, 244, .5)',
        },
      }}
    >
      {contracts.map((contract) => (
        <ContractManagerContractCard
          contract={contract}
          key={contract.id}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
      ))}
      <Box
        sx={{
          position: 'sticky',
          bottom: '0',
        }}
      >
        <Pagination page={page} onChange={setPage} count={pageCount} variant="outlined" />
      </Box>
    </Box>
  );
};
