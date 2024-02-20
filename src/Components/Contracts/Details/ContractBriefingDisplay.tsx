import { Box } from '@mui/material';

import type { IContract } from '@/../../verseledger-backend/src/interfaces/IContract';
import { ContractBriefingSkelton } from '@/Components/Contracts/Details/ContractBriefingSkelton';
import { ContractBriefingViewer } from '@/Components/Contracts/Details/ContractBriefingViewer';
import { useAppSelector } from '@/Redux/hooks';

type PickedContractBriefing = {
  selectedId: number | null;
  contract: IContract;
};

export const ContractBriefingDisplay: React.FC<PickedContractBriefing> = ({
  selectedId,
  contract,
}) => {
  const pickedContract = useAppSelector((root) =>
    root.contracts.find((c) => c.id === selectedId),
  );
  return (
    <Box
      sx={{
        border: '3px ridge ',
        borderColor: 'text.disabled',
        padding: '1em',
        height: '100%',
        width: '100%',
        marginBottom: '1em',
        display: 'flex',
        overflow: 'hidden',
        flexWrap: 'wrap',
      }}
    >
      {pickedContract && <ContractBriefingViewer contract={pickedContract} />}
      {/* <ContractBriefingSkelton /> */}
    </Box>
  );
};
