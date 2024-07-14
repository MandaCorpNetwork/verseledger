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
        minHeight: '70%',
        position: 'relative',
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
          p: '.2em',
          borderRadius: '5px',
          borderLeft: '2px solid',
          borderRight: '2px solid',
          borderColor: 'secondary.main',
          boxShadow: '0 0px 10px 5px rgba(24,252,252,0.25)',
          backgroundImage:
            'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
        }}
      >
        <Pagination
          page={page}
          onChange={setPage}
          count={pageCount}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
  );
};
