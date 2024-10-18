// Imports
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, useMediaQuery } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useParams } from 'react-router-dom';

import { ContractManagerBrowser } from './Browser/ContractManagerBrowser';
import { SelectedContract } from './ContractDisplay/SelectedContract';
import { ContractorInfo } from './ContractDisplay/tools/ContractorInfo';

/**
 * ### Contract Manager App
 * @description
 * The Contract Manager App for managing Contracts owned or connected to.
 */
export const ContractManagerApp: React.FC<unknown> = () => {
  const { selectedContractId } = useParams();
  const isMobile = useIsMobile();

  /**
   * Creates Custom Breakpoint @ `1400px` to Stop Rendering of the Selected Contract Display.
   * If 1400px or less, only the Contractor Info will render
   */
  const hideContracts = useMediaQuery('(max-width: 1400px)');
  return (
    <Box
      data-testid="ContractsManager__AppContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        padding: '1em',
      }}
    >
      <ContractManagerBrowser />
      {!isMobile && (
        <GlassBox
          data-testid="ContractManagerContainer"
          sx={{
            width: '65%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {!hideContracts && selectedContractId ? (
            <SelectedContract />
          ) : (
            <ContractorInfo willChange={hideContracts} />
          )}
        </GlassBox>
      )}
    </Box>
  );
};
