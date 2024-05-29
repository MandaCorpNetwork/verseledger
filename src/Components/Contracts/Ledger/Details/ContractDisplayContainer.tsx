import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { ContractBriefingSkelton } from '@/Components/Contracts/Ledger/Details/ContractBriefingSkelton';
import { ContractBriefingViewer } from '@/Components/Contracts/Ledger/Details/ContractBriefingViewer';
import { useAppSelector } from '@/Redux/hooks';
import { pickContract } from '@/Redux/Slices/Contracts/contractSelectors';

type ContractDisplayContainer = {
  selectedId: string | null;
};

export const ContractDisplayContainer: React.FC<ContractDisplayContainer> = ({
  selectedId,
}) => {
  const pickedContract = useAppSelector((root) =>
    pickContract(root, selectedId as string),
  );
  useEffect(() => {
    console.log(`ContractBriefingDisplay: ${selectedId}`);
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
        <ContractBriefingViewer contract={pickedContract} />
      ) : (
        <ContractBriefingSkelton />
      )}
    </Box>
  );
};
