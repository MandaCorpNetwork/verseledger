import { useSoundEffect } from '@Audio/AudioManager';
import { ControlPanelBox } from '@CommonLegacy/Components/Boxes/ControlPanelBox';
import { GlassDisplay } from '@CommonLegacy/Components/Boxes/GlassDisplay';
import { SmallTabHolo, SmallTabsHolo } from '@CommonLegacy/Components/Tabs/SmallTabsHolo';
import {
  BiddingTimePanel,
  ContractDurationPanel,
} from '@ComponentsLegacy/Contracts/Ledger/Details/TimePanel';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

type ContractTimeDisplayProps = {
  ['data-testid']?: string;
  contract: IContract;
};

export const ContractTimeDisplay: React.FC<ContractTimeDisplayProps> = ({
  'data-testid': testid,
  contract,
}) => {
  const [timeTab, setTimeTab] = React.useState<'bid' | 'duration'>('bid');
  const sound = useSoundEffect();

  const handleTabChange = React.useCallback(
    (_e: React.SyntheticEvent, value: 'bid' | 'duration') => {
      sound.playSound('clickMain');
      setTimeTab(value);
    },
    [setTimeTab, sound],
  );

  const renderTimePanel = React.useCallback(() => {
    switch (timeTab) {
      case 'bid':
        return <BiddingTimePanel contract={contract} />;
      case 'duration':
        return <ContractDurationPanel contract={contract} />;
    }
  }, [timeTab, contract]);
  return (
    <div
      data-testid={`${testid + '__'}ContractTimeDisplay_Container`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '.5em',
      }}
    >
      <ControlPanelBox
        data-testid={`${testid + '__'}ContractTimeDisplay_TabList_Wrapper`}
        sx={{
          display: 'block',
          px: '.5em',
        }}
      >
        <SmallTabsHolo
          data-testid={`${testid + '__'}ContractTimeDisplay_TabList`}
          variant="fullWidth"
          value={timeTab}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <SmallTabHolo
            data-testid={`${testid + '__'}ContractTimeDisplay-TabList__Bidding_Tab`}
            label="Bidding"
            value="bid"
          />
          <SmallTabHolo
            data-testid={`${testid + '__'}ContractTimeDisplay-TabList__Duration_Tab`}
            label="Duration"
            value="duration"
          />
        </SmallTabsHolo>
      </ControlPanelBox>
      <GlassDisplay
        sx={{
          p: '.5em',
        }}
      >
        {renderTimePanel()}
      </GlassDisplay>
    </div>
  );
};
