import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { CardorTableViewToggle } from '@CommonLegacy/Components/Buttons/TorCToggle';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContracts } from '@Redux/Slices/Contracts/contracts.selectors';
import { useNav } from '@Utils/Hooks/useNav';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useParams } from 'react-router-dom';

import { LedgerCardDisplay } from './Card/LedgerCardDisplay';
import { PaginationAnchor } from './PaginationAnchor';

export const LedgerListContainer: React.FC = () => {
  const { selectedContractId } = useParams();
  const [view, setView] = React.useState<'card' | 'table'>('card');
  const isMobile = useIsMobile();
  const nav = useNav();

  const handleClose = React.useCallback(
    (e: React.MouseEvent) => {
      const { search } = window.location;
      const url = `/apps/ledger/${search}`;
      nav(url, 'internal', false).onClick(e);
    },
    [nav],
  );

  const contracts = useAppSelector(selectContracts);
  return (
    <FeatureDisplay
      data-testid="ContractLedger-ColumnTwo__ContractBrowserContainer"
      sx={{
        height: '100%',
        width: '100%',
        '&:before': {
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      {!isMobile && (
        <div
          data-testid="ContractLedger-ContractBrowser__ContractListToolsWrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
            alignItems: 'center',
          }}
        >
          {selectedContractId && (
            <Button
              onClick={handleClose}
              variant="text"
              endIcon={<Close />}
              color="secondary"
              sx={{
                textShadow: '1px 1px 5px rgba(24,252,252,0.3)',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              Close
            </Button>
          )}
          <div style={{ marginLeft: 'auto' }}>
            <CardorTableViewToggle onChange={setView} view={view} />
          </div>
        </div>
      )}
      <div
        id="Contract-Display-Box"
        style={{
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        {view === 'card' && <LedgerCardDisplay contracts={contracts} />}
        <PaginationAnchor isMobile={isMobile} />
      </div>
    </FeatureDisplay>
  );
};
