import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { Box, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type PayInfoProps = {
  contract: IContract;
};

export const DesktopPayInfo: React.FC<PayInfoProps> = ({ contract }) => {
  return (
    <DigiDisplay data-testid="ContractPage-Info-ContractInfo__Pay_Wrapper">
      <Typography
        sx={{
          fontWeight: 'bold',
          cursor: 'default',
        }}
      >
        Pay Info
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
