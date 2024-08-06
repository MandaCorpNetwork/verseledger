import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import { Box, Typography } from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

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
}) => {
  const scrollRef = useHorizontalAdvancedScroll();
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  const handleSubmitBidPopup = () => {
    playSound('open');
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  };
  return (
    <Box
      data-testid="ContractPage__Bottom_Container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'space-around',
        my: { lg: '2em', xl: '3em' },
      }}
    >
      <Box
        data-testid="ContractPage-Bottom__Left_Container"
        sx={{
          width: '45%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box data-testid="ContractPage-Bottom-Left__Time_Container" sx={{ width: '50%' }}>
          <ControlPanelBox
            data-testid="ContractPage-Time__TabList_Wrapper"
            sx={{ display: 'block', px: '.5em', py: '.5em', mb: '2em' }}
          >
            <SmallTabsHolo
              variant="fullWidth"
              value={timeTab}
              onChange={handleTimeTab}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <SmallTabHolo label="Bidding Time" value="bid" />
              <SmallTabHolo label="Contract Duration" value="start" />
            </SmallTabsHolo>
          </ControlPanelBox>
          <DigiDisplay data-testid="ContractPage-Time__Panel_Wrapper">
            {timePanel(timeTab)}
          </DigiDisplay>
        </Box>
        <Box
          data-testid="ContractPage-Bottom-Left__ActiveData_Container"
          sx={{ width: '80%' }}
        >
          <ControlPanelBox
            data-testid="ContractPage-"
            sx={{ display: 'block', px: '.5em', py: '.5em', mb: '2em' }}
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
          <DigiDisplay data-testid="ContractPage-ActiveData__Panel_Wrapper">
            {activeDataPanel(activeDataTab)}
          </DigiDisplay>
        </Box>
      </Box>
      <Box
        data-testid="ContractPage-Bottom__Right_Container"
        sx={{
          width: '45%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DigiBox>
          <DigiDisplay>
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
                  gap: '.2em',
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
        <DesktopController onSubmit={handleSubmitBidPopup} />
      </Box>
    </Box>
  );
};
