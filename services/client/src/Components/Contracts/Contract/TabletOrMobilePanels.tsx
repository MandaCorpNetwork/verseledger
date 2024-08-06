import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import { Box } from '@mui/material';

type TabletOrMobilePanelProps = {
  timeTab: string;
  handleTimeTab: (event: React.SyntheticEvent, newValue: string) => void;
  timePanel: (panel: string) => React.ReactNode;
  activeDataTab: string;
  handleActiveTab: (event: React.SyntheticEvent, newValue: string) => void;
  activeDataPanel: (panel: string) => React.ReactNode;
};

export const TabletOrMobilePanels: React.FC<TabletOrMobilePanelProps> = ({
  timeTab,
  handleTimeTab,
  timePanel,
  activeDataTab,
  handleActiveTab,
  activeDataPanel,
}) => {
  return (
    <>
      <Box
        data-testid="ContractPage__TimePanel_Small_Wrapper"
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          my: { xs: '1em', sm: '1.5em', md: '2em' },
        }}
      >
        <ControlPanelBox
          data-testid="ContractPage-TimePanel-Small__Tab_Wrapper"
          sx={{
            width: { xs: '100%', sm: '90%', md: '75%' },
            mx: 'auto',
            display: 'block',
            mb: { xs: '.5em', sm: '1em', md: '1.5em' },
          }}
        >
          <SmallTabsHolo
            data-testid="ContractPage-TimePanel-Small__Tab_List"
            variant="fullWidth"
            value={timeTab}
            onChange={handleTimeTab}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <SmallTabHolo label="Bidding Time" value="bid" />
            <SmallTabHolo label="Duration" value="start" />
          </SmallTabsHolo>
        </ControlPanelBox>
        <DigiBox
          data-testid="ContractPage-TimePanel-Small__Tab_List"
          sx={{ width: { xs: '100%', sm: '90%', md: '75%' }, mx: 'auto', py: '1em' }}
        >
          {timePanel(timeTab)}
        </DigiBox>
      </Box>
      <Box
        data-testid="ContractPage__ActiveData_Small_Wrapper"
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          my: { xs: '1em', sm: '1.5em', md: '2em' },
        }}
      >
        <ControlPanelBox
          data-testid="ContractPage-ActiveData-Small__Tab_Wrapper"
          sx={{
            width: { xs: '100%', sm: '90%', md: '75%' },
            mx: 'auto',
            display: 'block',
            mb: { xs: '.5em', sm: '1em', md: '1.5em' },
          }}
        >
          <SmallTabsHolo
            data-testid="ContractPage-ActiveData-Small__Tab_List"
            variant="fullWidth"
            value={activeDataTab}
            onChange={handleActiveTab}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <SmallTabHolo label="Contractors" value="contractors" />
            <SmallTabHolo label="Ships" value="ships" disabled />
          </SmallTabsHolo>
        </ControlPanelBox>
        <DigiBox
          data-testid="ContractPage-ActiveData-Small__Panel_Container"
          sx={{
            width: { xs: '100%', sm: '90%', md: '75%' },
            mx: 'auto',
            minHeight: '200px',
            justifyContent: 'flex-start',
          }}
        >
          {activeDataPanel(activeDataTab)}
        </DigiBox>
      </Box>
    </>
  );
};
