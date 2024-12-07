import { ContractController } from '@CommonLegacy/Components/Contracts/ContractController';
import { Box } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContract } from '@Redux/Slices/Contracts/contracts.selectors';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { ILocationWithContractLocation } from 'vl-shared/src/schemas/LocationSchema';

import { BriefingCollapse } from './BreifingCollapse';
import { ContractManagementPanel } from './ContractManagementPanel';
import { DetailsDisplay } from './DetailsDisplay';
import { LocationsDisplay } from './tools/LocationsDisplay';

export const SelectedContract: React.FC = () => {
  const { selectedContractId } = useParams();
  const contract = useAppSelector((state) =>
    selectContract(state, selectedContractId as string),
  );
  const memoizedContract = React.useMemo(() => {
    return contract as IContractWithOwner;
  }, [contract]);

  const contractLocations = React.useMemo(() => {
    if (!memoizedContract.Locations) {
      return [] as ILocationWithContractLocation[];
    }
    const validLocations = memoizedContract.Locations.filter(
      (loc) => loc.ContractLocation !== undefined,
    );
    return validLocations as ILocationWithContractLocation[];
  }, [memoizedContract.Locations]);
  return (
    <Box
      data-testid="ContractsManager-SelectedContract_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: { md: '.5em', lg: '1em' },
      }}
    >
      <DetailsDisplay contract={memoizedContract} />
      <div
        data-testid="SelectedContract__BottomBox_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          padding: '1em',
          justifyContent: 'space-between',
          flexGrow: 1,
          gap: '10%',
        }}
      >
        <ContractManagementPanel contract={memoizedContract} />
        <div
          data-testid="SelectedContract-Bottom__RightBox_Wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          {memoizedContract.Locations && (
            <LocationsDisplay locations={contractLocations} />
          )}
          <BriefingCollapse briefing={memoizedContract.briefing} />
          <ContractController
            contract={memoizedContract}
            dashboard
            sx={{ mt: 'auto', width: '100%' }}
          />
        </div>
      </div>
    </Box>
  );
};
