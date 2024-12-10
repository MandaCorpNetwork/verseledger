import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { BrowserTabs } from './BrowserTabs';
import { ContractList } from './ContractList';
import { SearchTools } from './SearchTools';

export const ContractManagerBrowser: React.FC = () => {
  const { searchParams, setFilters } = useURLQuery();
  /** Memo Current Tab Set from SearchParams */
  const currentTab = React.useMemo(() => {
    const tab = searchParams.get(QueryNames.ContractManagerTab);

    // If no Tab set, Defaults to Employed
    if (!tab) {
      setFilters(QueryNames.ContractManagerTab, 'employed');
      return 'employed';
    }
    return tab;
  }, [searchParams, setFilters]);
  return (
    <FeatureContainer
      data-testid="ContractManager__ContractBrowserContainer"
      sx={{ width: { xs: '100%', md: '30%' } }}
    >
      <BrowserTabs currentTab={currentTab} />
      <div
        data-testid="ContractManager-ContractList__SearchTools_Wrapper"
        style={{ height: '75px' }}
      >
        <SearchTools />
      </div>
      <ContractList currentTab={currentTab} />
    </FeatureContainer>
  );
};
