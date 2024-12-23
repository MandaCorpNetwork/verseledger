import { useSoundEffect } from '@Audio/AudioManager';
import { ControlPanelBox } from '@Common/Components/Core/Boxes/ControlPanelBox';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Tab, Tabs, useTheme } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

export const BrowserTabs: React.FC = () => {
  const theme = useTheme();
  const { selectedContractId } = useParams();
  const navigate = useNavigate();
  const sound = useSoundEffect();
  const { overwriteURLQuery, searchParams } = useURLQuery();

  const tab = useMemo(() => {
    const tab = searchParams.get(QueryNames.ContractManagerTab);

    if (!tab) {
      if (selectedContractId) {
        navigate('/apps/contracts?cmTab=employed');
        return 'employed';
      } else {
        overwriteURLQuery({ [QueryNames.ContractManagerTab]: 'employed' });
        return 'employed';
      }
    }
    return tab;
  }, [navigate, overwriteURLQuery, searchParams, selectedContractId]);

  /** Handles Tab Changes */
  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      sound.playSound('loading');

      // Navigate directly to tab if there is a selectedContract to clear it out
      if (selectedContractId) {
        navigate(`/apps/contracts?cmTab=${newValue}`);
      } else {
        overwriteURLQuery({ [QueryNames.ContractManagerTab]: newValue });
      }
    },
    [sound, navigate, overwriteURLQuery, selectedContractId],
  );

  /** Decides whether or not to display ScrollButtons for the Tabs Component */
  const displayScrollButtons = !!theme.breakpoints.down('lg');

  return (
    <ControlPanelBox
      aria-label="Contract List Tabs"
      id="ContractManagerTabsContainer"
      data-testid="ContractManager__TabContainer"
      sx={{
        my: '1em',
        px: { xs: '.5em', md: '.8em' },
        py: '.2em',
        mx: { xs: '0', md: '1em' },
        alignSelf: 'center',
        width: `100%`,
      }}
    >
      <Tabs
        aria-labelledby="ContractManagerTabsContainer"
        data-testid="ContractManager__TabList"
        component="header"
        variant={theme.breakpoints.down('lg') ? 'scrollable' : 'fullWidth'}
        textColor="secondary"
        indicatorColor="secondary"
        onChange={handleTabChange}
        scrollButtons={displayScrollButtons}
        allowScrollButtonsMobile
        value={tab}
      >
        <Tab
          data-testid="ContractManager__AcceptedTab"
          label="Employed"
          value="employed"
        />
        <Tab data-testid="ContractManger__OwnedTab" label="Owned" value="owned" />
        <Tab data-testid="ContractManager__PendingTab" label="Pending" value="pending" />
        <Tab data-testid="ContractManager__OffersTab" label="Invites" value="offers" />
        <Tab
          data-testid="ContractManager__CompletedTab"
          label="Completed"
          value="completed"
        />
        <Tab data-testid="ContractManager__HistoryTab" label="History" value="closed" />
      </Tabs>
    </ControlPanelBox>
  );
};
