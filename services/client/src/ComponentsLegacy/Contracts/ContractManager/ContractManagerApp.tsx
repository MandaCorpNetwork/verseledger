import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import { Box, useMediaQuery } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React, { Suspense } from 'react';
import { useParams } from 'react-router';

import { ContractManagerBrowser } from './Browser/ContractManagerBrowser';
import { ContractorInfo } from './ContractDisplay/tools/ContractorInfo';
const SelectedContract = React.lazy(async () => {
  const module = await import('./ContractDisplay/SelectedContract');
  return { default: module.SelectedContract };
});

/**
 * ### Contract Manager App
 * @description
 * The Contract Manager App for managing Contracts owned or connected to.
 */
export const ContractManagerApp: React.FC<unknown> = () => {
  /** Currently Selected ID of a Contract */
  const { selectedContractId } = useParams();

  const mobile = useIsMobile();

  // LOGIC
  /**
   * Creates Custom Breakpoint @ `1400px` to Stop Rendering of the Selected Contract Display.
   * If 1400px or less, only the Contractor Info will render
   */
  const hideContracts = useMediaQuery('(max-width: 1400px)');

  return (
    <Box
      component="section"
      aria-label="Contracts Manager Application"
      id="ContractsManager__AppContainer"
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
      {!mobile && (
        <FeatureContainer
          data-testid="ContractManagerContainer"
          sx={{
            width: '65%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {!hideContracts && selectedContractId ? (
            <Suspense fallback={<LoadingWheel />}>
              <SelectedContract />
            </Suspense>
          ) : (
            <ContractorInfo willChange={hideContracts} />
          )}
        </FeatureContainer>
      )}
    </Box>
  );
};
