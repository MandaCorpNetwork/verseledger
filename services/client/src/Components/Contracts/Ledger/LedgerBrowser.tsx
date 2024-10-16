import GlassBox from '@Common/Components/Boxes/GlassBox';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import React from 'react';

import { ContractsBrowser } from './List/ContractBrowser';
import { ContractTableTools } from './List/ContractTableTools';
import { SmallSearchTools } from './List/SmallSearchTools';

type LedgerBrowserProps = {
  mobileSearchOpen: boolean;
};

export const LedgerBrowser: React.FC<LedgerBrowserProps> = ({ mobileSearchOpen }) => {
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  return (
    <GlassBox
      data-testid="ContractLedger__ColumnTwo"
      sx={{
        minWidth: '50%',
        height: '100%',
        flex: '1',
        p: '1em',
        gap: '1em',
        position: 'relative',
      }}
    >
      <SmallSearchTools isOpen={mobileSearchOpen} />
      {!mobile && !tablet && <ContractTableTools />}
      <ContractsBrowser />
    </GlassBox>
  );
};
