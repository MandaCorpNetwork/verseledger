import GlassBox from '@CommonLegacy/Components/Boxes/GlassBox';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import React from 'react';

import { LedgerListContainer } from './List/LedgerListContainer';
import { LedgerSearchTools } from './SearchBar/LedgerSearchTools';
import { SmallSearchTools } from './SearchBar/LedgerSmallSearchTools';

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
        minWidth: '400px',
        height: '100%',
        flex: '1',
        p: '1em',
        gap: '1em',
        position: 'relative',
        flexGrow: 2,
      }}
    >
      {(mobile || tablet) && <SmallSearchTools isOpen={mobileSearchOpen} />}
      {!mobile && !tablet && <LedgerSearchTools />}
      <LedgerListContainer />
    </GlassBox>
  );
};
