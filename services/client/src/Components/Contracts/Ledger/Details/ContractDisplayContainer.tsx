import { ContractDisplay } from '@Components/Contracts/Ledger/Details/ContractDisplay';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContract } from '@Redux/Slices/Contracts/contracts.selectors';
import { Logger } from '@Utils/Logger';
import React, { useEffect } from 'react';
import { IContractWithOwner } from 'vl-shared/src/schemas/ContractSchema';

type ContractDisplayContainer = {
  selectedId: string | null;
};

export const ContractDisplayContainer: React.FC<ContractDisplayContainer> = ({
  selectedId,
}) => {
  const pickedContract = useAppSelector((root) =>
    selectContract(root, selectedId as string),
  );
  useEffect(() => {
    Logger.info(`ContractBriefingDisplay: ${selectedId}`);
  }, [selectedId]);
  return (
    <Box
      sx={{
        borderTop: '3px solid',
        borderBottom: '3px solid',
        borderColor: 'secondary.main',
        borderRadius: '10px',
        padding: '1em',
        height: '100%',
        width: '100%',
        marginBottom: '1em',
        display: 'flex',
        overflow: 'hidden',
        flexWrap: 'wrap',
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
