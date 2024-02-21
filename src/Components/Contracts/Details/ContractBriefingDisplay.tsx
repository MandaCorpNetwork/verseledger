import { Box } from '@mui/material';

import { ContractBriefingSkelton } from '@/Components/Contracts/Details/ContractBriefingSkelton';
import { ContractBriefingViewer } from '@/Components/Contracts/Details/ContractBriefingViewer';

export const ContractBriefingDisplay: React.FC<unknown> = () => {

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
        <ContractBriefingViewer />
      {/* <ContractBriefingSkelton /> */}
    </Box>
  );
};
