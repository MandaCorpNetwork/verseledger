import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import { Box, Typography } from '@mui/material';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { DesktopController } from './DesktopController';

type DesktopBodyProps = {
  contract: IContract;
  timeTab: string;
  handleTimeTab: (event: React.SyntheticEvent, newValue: string) => void;
  timePanel: (panel: string) => React.ReactNode;
  activeDataTab: string;
  handleActiveTab: (event: React.SyntheticEvent, newValue: string) => void;
  activeDataPanel: (panel: string) => React.ReactNode;
  startLocation: string;
  endLocation: string;
  otherLocations: string[];
  isOwned: boolean;
  userBid?: IContractBid | null;
};

export const DesktopContractBody: React.FC<DesktopBodyProps> = ({
  contract,
  timeTab,
  handleTimeTab,
  timePanel,
  activeDataTab,
  handleActiveTab,
  activeDataPanel,
  startLocation,
  endLocation,
  otherLocations,
  isOwned,
  userBid,
}) => {
  const scrollRef = useHorizontalAdvancedScroll();
  return (
    <Box
      data-testid="ContractPage__Bottom_Container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'space-around',
        my: { lg: '1em', xl: '2em' },
      }}
    >
      <Box
        data-testid="ContractPage-Bottom__Left_Container"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <GlassDisplay
          data-testid="ContractPage-Bottom-Left__Time_Container"
          sx={{ width: '50%', mb: 'auto', p: '1em' }}
        >
          <ControlPanelBox
            data-testid="ContractPage-Time__TabList_Wrapper"
            sx={{ display: 'block', px: '.5em', py: '.5em', mb: '1em' }}
          >
            <SmallTabsHolo
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
          <DigiDisplay data-testid="ContractPage-Time__Panel_Wrapper" sx={{ py: '1em' }}>
            {timePanel(timeTab)}
          </DigiDisplay>
        </GlassDisplay>
        <GlassDisplay
          data-testid="ContractPage-Bottom-Left__ActiveData_Container"
          sx={{ width: '80%', mb: 'auto', p: '1em' }}
        >
          <ControlPanelBox
            data-testid="ContractPage-"
            sx={{ display: 'block', px: '.5em', py: '.5em', mb: '1em' }}
          >
            <SmallTabsHolo
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
          <DigiDisplay
            data-testid="ContractPage-ActiveData__Panel_Wrapper"
            sx={{ minHeight: '100px', maxHeight: { lg: '200px', xl: '' } }}
          >
            {activeDataPanel(activeDataTab)}
          </DigiDisplay>
        </GlassDisplay>
      </Box>
      <Box
        data-testid="ContractPage-Bottom__Right_Container"
        sx={{
          width: '35%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          mr: '3em',
        }}
      >
        <DigiBox
          data-testid="ContractPage-Bottom-Right__Location_Container"
          sx={{ mb: 'auto', p: '.5em', alignItems: 'center' }}
        >
          <DigiDisplay
            data-testid="ContractPage-Location__Title_Wrapper"
            sx={{ width: '70%' }}
          >
            <Typography>Locations</Typography>
          </DigiDisplay>
          <Box
            data-testid="ContractPage-Location-Mobile__LocationList_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: '.5em',
              my: '.5em',
            }}
          >
            <DigiField
              data-testid="ContractPage-Location-Mobile-LocationList__StartLocation_Wrapper"
              label="Start Location"
              sx={{
                width: '60%',
                px: '.5em',
              }}
              slots={{
                content: {
                  sx: {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: '.2em',
                  },
                },
                typography: {
                  sx: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
                label: {
                  sx: {
                    fontSize: '.8em',
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              <LocationChip locationId={startLocation ?? ''} />
            </DigiField>
            <DigiField
              data-testid="ContractPage-Location-Mobile-LocationList__EndLocation_Wrapper"
              label="End Location"
              sx={{
                width: '60%',
                px: '.5em',
              }}
              slots={{
                content: {
                  sx: {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: '.2em',
                  },
                },
                typography: {
                  sx: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
                label: {
                  sx: {
                    fontSize: '.8em',
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              {endLocation ? (
                <LocationChip locationId={endLocation ?? ''} />
              ) : (
                <Typography
                  data-testid="ContractPage-Location-Mobile-LocationList-EndLocation__Missing_Text"
                  variant="body2"
                  sx={{ color: 'info.main' }}
                >
                  No End Location
                </Typography>
              )}
            </DigiField>
            <PopupFormSelection
              data-testid="ContractPage-Location-Mobile-LocationList__OtherLocations_Wrapper"
              sx={{
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'hidden',
                p: '.5em',
                width: '60%',
                alignItems: 'space-around',
              }}
            >
              <Typography
                data-testid="ContractPage-Location-Mobile-LocationList-OtherLocations__Title"
                variant="body2"
                sx={{ fontWeight: 'bold', mb: '.2em' }}
              >
                Other Locations
              </Typography>
              <Box
                data-testid="ContractPage-Location-Mobile-LocationList-OtherLocaions__List_Wrapper"
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  gap: '.5em',
                  py: '.5em',
                  width: '100%',
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,73,130,.8)',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '20px',
                    background: 'rgb(24,252,252)',
                  },
                }}
              >
                {otherLocations && otherLocations.length > 0 ? (
                  <>
                    {otherLocations.map((loc) => (
                      <LocationChip key={loc} locationId={loc} />
                    ))}
                  </>
                ) : (
                  <Typography variant="body2">No Other Locations</Typography>
                )}
              </Box>
            </PopupFormSelection>
          </Box>
          {contract && (!contract.Locations || contract.Locations.length === 0) && (
            <Typography variant="error">
              Contract Missing Start Location. Please report error.
            </Typography>
          )}
        </DigiBox>
        <DesktopController isOwned={isOwned} userBid={userBid} contract={contract} />
      </Box>
    </Box>
  );
};
