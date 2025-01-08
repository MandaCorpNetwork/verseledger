import { useSoundEffect } from '@Audio/AudioManager';
import { ContractorList } from '@CommonLegacy/Components/Contracts/ContractorList';
import TabListHolo from '@CommonLegacy/Components/Tabs/TabListHolo';
import { Tab } from '@mui/material';
import React from 'react';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

type PanelProps = {
  contract: IContract;
};

type ContractManagerTab = 'contractors' | 'ships' | 'payroll';

export const ContractManagementPanel: React.FC<PanelProps> = ({ contract }) => {
  const [contractManagerTab, setContractManagerTab] =
    React.useState<ContractManagerTab>('contractors');
  const sound = useSoundEffect();

  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: ContractManagerTab) => {
      sound.playSound('clickMain');
      setContractManagerTab(newValue);
    },
    [sound],
  );
  const renderContractManagerTab = React.useCallback(() => {
    switch (contractManagerTab) {
      case 'contractors':
        return <ContractorList contract={contract} />;
      case 'ships':
      case 'payroll':
      default:
        return;
    }
  }, [contractManagerTab, contract]);
  return (
    <div
      data-testid="SelectedContract-ContractManagementPanel__Container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '.5em',
        flexGrow: 1,
        maxWidth: '650px',
      }}
    >
      <TabListHolo
        data-testid="SelectedContract-ContractManagement__TabList"
        value={contractManagerTab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        sx={{
          px: '1em',
          py: '.2em',
        }}
      >
        <Tab
          data-testid="SelectedContract-ContractManagement-TabList__Contractors_Tab"
          label="Contractors"
          value="contractors"
        />
        <Tab
          data-testid="SelectedContract-ContractManagement-TabList__Ships_Tab"
          disabled
          label="Ships"
          value="ships"
        />
        <Tab
          data-testid="SelectedContract-ContractManagement-TabList__CPayroll_Tab"
          disabled
          label="Payroll"
          value="payroll"
        />
      </TabListHolo>
      <div
        data-testid="SelectedContract-ContractManagementPanel__Panel_Wrapper"
        style={{ maxHeight: '85%' }}
      >
        {renderContractManagerTab()}
      </div>
    </div>
  );
};
