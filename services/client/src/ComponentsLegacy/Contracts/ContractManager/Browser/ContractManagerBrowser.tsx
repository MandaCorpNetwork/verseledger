import { BrowserTabs } from '@Apps/Contracts/ContractManager/Browser/BrowserTabs';
import { ContractList } from '@Apps/Contracts/ContractManager/Browser/ContractList';
import { SearchTools } from '@Apps/Contracts/ContractManager/Browser/SearchTools';
import { FeatureContainer } from '@Common/Components/Core/Boxes/FeatureContainer';
import React from 'react';

export const ContractManagerBrowser: React.FC = () => {
  return (
    <FeatureContainer
      aria-label="Contract Browser Container"
      id="ContractBrowseContainer"
      data-testid="ContractManager__ContractBrowserContainer"
      sx={{ width: { xs: '100%', md: '30%' } }}
    >
      <BrowserTabs />
      <div
        data-testid="ContractManager-Browser__SearchTools_Wrapper"
        style={{ height: '80px' }}
      >
        <SearchTools />
      </div>
      <ContractList />
    </FeatureContainer>
  );
};
