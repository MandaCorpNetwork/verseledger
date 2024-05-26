import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';

import { CardorTableViewToggle } from '@/Components/Contracts/Ledger/List/Card-TableViewToggle';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectContractsArray } from '@/Redux/Slices/Contracts/contractSelectors';
import { fetchContracts } from '@/Redux/Slices/Contracts/contractThunks';

import { ContractCardDisplay } from './CardView/ContractCardDisplay';
import { ContractTableView } from './TableView/ContractTableView';

type ContractsViewerProps = {
  selectedid: string | null;
  selectedIdSetter: (id: string | null) => void;
  contractOnClose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ContractsViewer: React.FC<ContractsViewerProps> = ({
  selectedIdSetter,
  contractOnClose,
}) => {
  const dispatch = useAppDispatch();
  const contracts = useAppSelector((root) => selectContractsArray(root));
  useEffect(() => {
    dispatch(fetchContracts());
  }, []);
  const [view, setView] = React.useState('ContractCardView');
  return (
    <Box
      id="Contract-Viewer-Box"
      sx={{
        height: '70vh',
        my: '1em',
        mx: '1em',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'rgba(14,49,141,.25)',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '5px',
      }}
    >
      <Box
        id="Contract-Display-View-Tools-Box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '1em',
          alignItems: 'center',
        }}
      >
        <Box data-id="Contract-Deselect-Button-Box" sx={{ mr: 'auto' }}>
          <Button
            onClick={contractOnClose}
            variant="text"
            endIcon={<CloseIcon />}
            sx={{ color: 'text.secondary' }}
          >
            Close
          </Button>
        </Box>
        <Box data-id="Contract-Display-View-Toggle-Box" sx={{ ml: 'auto' }}>
          <CardorTableViewToggle onViewChange={setView} />
        </Box>
      </Box>
      <Box
        id="Contract-Display-Box"
        sx={{
          flexGrow: 1,
          display: 'flex',
          position: 'relative',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(121, 192, 244, .5)',
          },
        }}
      >
        {view === 'ContractCardView' ? (
          <ContractCardDisplay onPick={selectedIdSetter} contracts={contracts} />
        ) : (
          <ContractTableView onPick={selectedIdSetter} contracts={contracts} />
        )}
      </Box>
    </Box>
  );
};
