import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { Box, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type MobileLocationProps = {
  /** The contract to display information for */
  contract: IContract;
  /** The start location of the contract */
  startLocation: string;
  /** The end location of the contract */
  endLocation: string;
  /** The other locations of the contract */
  otherLocations: string[];
};
/**
 * ### MobileLocations
 * @description
 * Displays Location information for a Contract on a Mobile Screen.
 * @memberof {@link ContractPage}
 * @param props - The props for the component
 * #### Functional Components
 * @component {@link LocationChip}
 * @component {@link DigiField}
 * @component {@link PopupFormSelection}
 * #### Styled Components
 * @component {@link DigiBox}
 * @component {@link DigiDisplay}
 */
export const MobileLocations: React.FC<MobileLocationProps> = ({
  contract,
  startLocation,
  endLocation,
  otherLocations,
}) => {
  return (
    <DigiBox
      data-testid="ContractPage__Location_Mobile_Wrapper"
      sx={{
        p: '.5em',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <DigiDisplay
        data-testid="ContractPage-Location-Mobile__Title_Wrapper"
        sx={{ width: '80%', mb: '.5em' }}
      >
        <Typography
          data-testid="ContractPage-Location-Mobile__Title_Text"
          variant="body2"
          sx={{ fontWeight: 'bold' }}
        >
          Locations
        </Typography>
      </DigiDisplay>
      {contract && contract.Locations && (
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
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                gap: '.2em',
                width: '100%',
                pb: '.5em',
                '&::-webkit-scrollbar': {
                  height: '4px',
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
      )}
      {contract && (!contract.Locations || contract.Locations.length === 0) && (
        <Typography variant="error">
          Contract Missing Start Location. Please report error.
        </Typography>
      )}
    </DigiBox>
  );
};
