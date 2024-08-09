import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { Box, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type TabletDetailsProps = {
  contract: IContract;
  startLocation: string;
  endLocation: string;
  otherLocations: string[];
};

export const TabletDetails: React.FC<TabletDetailsProps> = ({
  contract,
  startLocation,
  endLocation,
  otherLocations,
}) => {
  return (
    <Box
      data-testid="ContractPage__Pay&Briefing&Location_Tablet_Wrapper"
      sx={{
        mt: '1.5em',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
      }}
    >
      <DigiBox
        data-testid="ContractPage__Pay&Briefing_Tablet_Wrapper"
        sx={{ p: '2em', width: '45%' }}
      >
        <DigiDisplay
          data-testid="ContractPage-Pay&Briefing__Pay_Tablet_Wrapper"
          sx={{ px: '1em', py: '.5em' }}
        >
          <Typography
            data-testid="ContractPage-Pay&Briefing-Pay-Tablet__Title"
            sx={{ fontWeight: 'bold' }}
          >
            Pay Info
          </Typography>
          {contract && (
            <Box
              data-testid="ContractPage-Pay&Briefing-Pay-Tablet__Fields_Wrapper"
              sx={{ display: 'flex', flexDirection: 'row', gap: '2em', my: '.5em' }}
            >
              <PayStructure
                testid="ContractPage-Pay&Briefing-Pay-Tablet-Fields__PayStructure_Field"
                payStructure={contract.payStructure}
                slots={{
                  content: {
                    sx: {
                      minWidth: '90px',
                    },
                  },
                  label: {
                    sx: {
                      fontSize: '.9em',
                    },
                  },
                }}
              />
              <PayDisplay
                testid="ContractPage-Pay&Briefing-Pay-Tablet-Fields__DefaultPay_Field"
                label="Default Pay"
                pay={contract.defaultPay}
                slots={{
                  content: {
                    sx: {
                      minWidth: '90px',
                    },
                  },
                  label: {
                    sx: {
                      fontSize: '.9em',
                    },
                  },
                }}
              />
            </Box>
          )}
        </DigiDisplay>
        <DigiDisplay
          data-testid="ContractPage-Pay&Briefing__Briefing_Tablet_Wrapper"
          sx={{ mt: '2em', px: '1em', py: '.5em' }}
        >
          <Typography
            data-testid="ContractPage-Pay&Briefing-Briefing"
            sx={{ fontWeight: 'bold' }}
          >
            Briefing
          </Typography>
          {contract && (
            <Typography sx={{ color: 'text.primary' }}>{contract.briefing}</Typography>
          )}
        </DigiDisplay>
      </DigiBox>
      <DigiBox
        data-testid="ContractPage__Location_Tablet_Wrapper"
        sx={{
          p: '2em',
          maxWidth: '40%',
          justifyContent: 'flex-start',
          flexGrow: 1,
        }}
      >
        <DigiDisplay
          data-testid="ContractPage-Location-Tablet__Title_Wrapper"
          sx={{ mb: '1em' }}
        >
          <Typography
            data-testid="ContractPage-Location-Tablet__Title_Text"
            sx={{ fontWeight: 'bold' }}
          >
            Locations
          </Typography>
        </DigiDisplay>
        {contract && contract.Locations && (
          <Box
            data-testid="ContractPage-Location-Tablet__LocationList_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexGrow: 1,
              width: '100%',
              gap: '.5em',
            }}
          >
            <DigiField
              data-testid="ContractPage-Location-Tablet-LocationList__StartLocation_Wrapper"
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
              data-testid="ContractPage-Location-Tablet-LocationList__EndLocation_Wrapper"
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
                  data-testid="ContractPage-Location-Tablet-LocationList-EndLocation__Missing_Text"
                  variant="body2"
                  sx={{ color: 'info.main' }}
                >
                  No End Location
                </Typography>
              )}
            </DigiField>
            <PopupFormSelection
              data-testid="ContractPage-Location-Tablet-LocationList__OtherLocations_Wrapper"
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
                data-testid="ContractPage-Location-Tablet-LocationList-OtherLocations__Title"
                variant="body2"
                sx={{ fontWeight: 'bold', mb: '.2em' }}
              >
                Other Locations
              </Typography>
              <Box
                data-testid="ContractPage-Location-Tablet-LocationList-OtherLocaions__List_Wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  gap: '.2em',
                  width: '100%',
                  pb: '.2em',
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
                  <Typography>No Other Locations</Typography>
                )}
              </Box>
            </PopupFormSelection>
          </Box>
        )}
        {contract && (!contract.Locations || contract.Locations.length === 0) && (
          <Typography variant="error">
            Contract Missing Start Location. Please report error.
          </Typography>
        )}
      </DigiBox>
    </Box>
  );
};
