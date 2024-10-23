import '@Assets/Css/scrollbar.css';

import { Grid2 } from '@mui/material';
// import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { LedgerCard } from './LedgerCard';

type LedgerCardDisplayProps = {
  contracts: IContract[];
};

export const LedgerCardDisplay: React.FC<LedgerCardDisplayProps> = ({ contracts }) => {
  // const mobile = useIsMobile();
  const { selectedContractId } = useParams();
  return (
    <div
      style={{ flexGrow: 1, display: 'flex', width: '100%', overflowY: 'auto' }}
      className="VerseOS-Scroll"
    >
      <Grid2
        container
        data-testid="AppList__ListContainer"
        rowGap={4}
        sx={{
          display: 'grid',
          alignContent: 'flex-start',
          px: '1em',
          pt: '1em',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          width: '100%',
          justifyItems: 'stretch',
        }}
      >
        {contracts.map((contract) => (
          <Grid2
            key={contract.id}
            data-testid={`AppList-List__${contract.id}_Wrapper`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LedgerCard
              key={contract.id}
              contract={contract}
              isSelected={selectedContractId === contract.id}
            />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};
