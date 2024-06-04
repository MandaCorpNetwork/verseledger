import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/contractThunks';
import React, { useEffect } from 'react';

import { CardorTableViewToggle } from '@/Components/Contracts/Ledger/List/Card-TableViewToggle';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectContractsArray } from '@/Redux/Slices/Contracts/contractSelectors';

import { ContractCardDisplay } from './CardView/ContractCardDisplay';
import { ContractTableView } from './TableView/ContractTableView';

type ContractsViewerProps = {
  selectedId: string | null;
  selectedIdSetter: (id: string | null) => void;
  contractOnClose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ContractsBrowser: React.FC<ContractsViewerProps> = ({
  selectedIdSetter,
  contractOnClose,
  selectedId,
}) => {
  const dispatch = useAppDispatch();
  const [view, setView] = React.useState('ContractCardView');
  const [isSelected, setIsSelected] = React.useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setIsSelected(id);
    selectedIdSetter(id);
  };

  const handleClose = () => {
    contractOnClose();
    setIsSelected(null);
  };

  const contracts = useAppSelector((root) => selectContractsArray(root));
  useEffect(() => {
    dispatch(fetchContracts());
  }, []);

  return (
    <Box
      data-testid="ContractLedger-ColumnTwo__ContractBrowserContainer"
      sx={{
        my: '1em',
        mx: '1em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'rgba(14,49,141,.25)',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <Box
        data-testid="ContractLedger-ContractBrowser__ContractListToolsWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '1em',
          alignItems: 'center',
        }}
      >
        <Box
          data-testid="ContractLedger-ContractBrowser-ContractListTools__CloseContractWrapper"
          sx={{ mr: 'auto' }}
        >
          {selectedId && (
            <Button
              onClick={handleClose}
              variant="text"
              endIcon={<CloseIcon />}
              color="secondary"
            >
              Close
            </Button>
          )}
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
          <ContractCardDisplay
            onPick={handleSelect}
            contracts={contracts}
            isSelected={isSelected}
          />
        ) : (
          <ContractTableView
            onPick={selectedIdSetter}
            contract={contracts}
            isSelected={isSelected}
          />
        )}
      </Box>
    </Box>
  );
};
