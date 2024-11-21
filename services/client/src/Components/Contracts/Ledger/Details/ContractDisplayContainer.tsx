import { ContractDisplay } from '@Components/Contracts/Ledger/Details/ContractDisplay';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContract } from '@Redux/Slices/Contracts/contracts.selectors';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

export const ContractDisplayContainer: React.FC = () => {
  const { selectedContractId } = useParams();
  const pickedContract = useAppSelector((root) =>
    selectContract(root, selectedContractId as string),
  );
  return (
    <Box
      sx={{
        borderTop: '3px solid',
        borderBottom: '3px solid',
        borderColor: 'secondary.main',
        borderRadius: '10px',
        padding: '1em',
        height: '100%',
        marginBottom: '1em',
        display: 'flex',
        overflow: 'hidden',
        flexWrap: 'wrap',
        minimumWidth: '500px',
      }}
    >
      {pickedContract ? (
        <ContractDisplay contract={pickedContract as IContractWithOwner} />
      ) : (
        <Box
          data-testid="ContractLedger-ContractDisplayContainer__EmptyContract"
          sx={{ my: 'auto', mx: 'auto' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Select Contract
          </Typography>
        </Box>
      )}
    </Box>
  );
};
