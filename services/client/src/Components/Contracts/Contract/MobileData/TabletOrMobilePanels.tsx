import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import { Box } from '@mui/material';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';

type TabletOrMobilePanelProps = {
  /** @prop {string} timeTab - The current time tab */
  timeTab: string;
  /** @prop {function} handleTimeTab - The function to handle the time tab change */
  handleTimeTab: (event: React.SyntheticEvent, newValue: string) => void;
  /** @prop {function} timePanel - The function to render the time panel */
  timePanel: (panel: string) => React.ReactNode;
  /** @prop {string} activeDataTab - The current active data tab */
  activeDataTab: string;
  /** @prop {function} handleActiveTab - The function to handle the active data tab change */
  handleActiveTab: (event: React.SyntheticEvent, newValue: string) => void;
  /** @prop {function} activeDataPanel - The function to render the active data panel */
  activeDataPanel: (panel: string) => React.ReactNode;
  /** @prop {boolean} isOwner - Whether the user is the owner of the contract */
  isOwner: boolean;
  /** @prop {IContractBid} userBid - The user's bid on the contract if it exists */
  userBid?: IContractBid | null;
};
/**
 * ### TabletOrMobilePanels
 * @description
 * Displays the Time and Active Data Panels for a Contract on a Tablet or Mobile Screen.
 * @version 0.1.3
 * @memberof {@link ContractPage}
 * @param {TabletOrMobilePanelProps} props - The props for the component
 * @returns {React.FC}
 * @component {@link SmallTabsHolo}
 * @component {@link SmallTabHolo}
 * #### Styled Components
 * @component {@link ControlPanelBox}
 * @component {@link DigiBox}
 * @author ThreeCrown
 */
export const TabletOrMobilePanels: React.FC<TabletOrMobilePanelProps> = ({
  timeTab,
  handleTimeTab,
  timePanel,
  activeDataTab,
  handleActiveTab,
  activeDataPanel,
  isOwner,
  userBid,
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
            {(isOwner || userBid?.status === 'ACCEPTED') && (
              <SmallTabHolo label="Payroll" value="payroll" disabled />
            )}
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
