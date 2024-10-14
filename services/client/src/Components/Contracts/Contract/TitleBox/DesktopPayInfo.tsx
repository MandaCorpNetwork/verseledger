import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { Box, Typography } from '@mui/material';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type PayInfoProps = {
  /** The contract to display information for */
  contract: IContract;
};
/**
 * ### DesktopPayInfo
 * @description
 * Displays Pay information for a Contract on a Desktop Screen.
 * @memberof {@link TitleBox}
 * @param contract - The contract to display information for
 * #### Functional Components
 * @component {@link PayDisplay}
 * @component {@link PayStructure}
 * #### Styled Components
 * @component {@link DigiDisplay}
 */
export const DesktopPayInfo: React.FC<PayInfoProps> = ({ contract }) => {
  return (
    <DigiDisplay data-testid="ContractPage-Info-ContractInfo__Pay_Wrapper">
      <Typography
        sx={{
          fontWeight: 'bold',
          cursor: 'default',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Pay Info
        <Typography>
          <Typography variant="body2" sx={{ ml: '.5em', color: 'info.main' }}>
            {contract.isBargaining && 'negotiable'}
          </Typography>
        </Typography>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { lg: '3em', xl: '4em' },
          px: '1.5em',
          my: 'auto',
        }}
      >
        {contract && (
          <PayStructure
            payStructure={contract.payStructure}
            testid="ContractPage-Info-ContractInfo__PayStructure_Field"
            slots={{
              label: {
                sx: {
                  fontSize: {
                    s: '.7em',
                    md: '.8em',
                    lg: '.9em',
                    xl: '1em',
                  },
                  mb: { s: '.5em', md: '.6em' },
                },
              },
            }}
          />
        )}
        {contract && (
          <PayDisplay
            testid="ContractPage-Info-ContractInfo__DefaultPay_Field"
            label="Default Pay"
            pay={contract.defaultPay}
            structure={contract.payStructure as ContractPayStructure}
            slots={{
              label: {
                sx: {
                  fontSize: {
                    s: '.7em',
                    md: '.8em',
                    lg: '.9em',
                    xl: '1em',
                  },
                  mb: { s: '.5em', md: '.6em' },
                },
              },
            }}
          />
        )}
      </Box>
    </DigiDisplay>
  );
};
