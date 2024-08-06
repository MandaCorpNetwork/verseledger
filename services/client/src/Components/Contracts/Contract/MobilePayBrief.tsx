import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { Box, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type MobilePayBriefProps = {
  contract: IContract;
};

export const MobilePayBrief: React.FC<MobilePayBriefProps> = ({ contract }) => {
  return (
    <DigiBox
      data-testid="ContractPage__Pay&Breifing_Mobile_Wrapper"
      sx={{ my: '1em', p: '.5em' }}
    >
      <DigiDisplay
        data-testid="ContractPage-Pay&Briefing-Mobile__Pay_Wrapper"
        sx={{ mx: 'auto', px: '5%' }}
      >
        <Typography
          data-testid="ContractPage-Pay&Briefing-Mobile__Pay_Title"
          variant="body2"
          sx={{ fontWeight: 'bold' }}
        >
          Pay Info
        </Typography>
        <Box
          daya-testid="ContractPage-Pay&Briefing-Mobile__Fields_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            mb: '.5em',
            mt: '.2em',
          }}
        >
          {contract && (
            <PayStructure
              testid="ContractPage-Pay&Briefing-Mobile__PayStructure_Field"
              payStructure={contract.payStructure}
            />
          )}
          {contract && (
            <PayDisplay
              testid="ContractPage-Pay&Briefing-Mobile__DefaultPay_Field"
              label="Default Pay"
              pay={contract.defaultPay}
              sx={{ minWidth: '90px' }}
            />
          )}
        </Box>
      </DigiDisplay>
      <DigiDisplay
        data-testid="ContractPage-Pay&Briefing-Mobile__Briefing_Wrapper"
        sx={{
          my: '.5em',
          width: '90%',
          alignSelf: 'center',
          py: '.2em',
          px: '.5em',
        }}
      >
        <Typography
          data-testid="ContractPage-PayBriefing-Mobile__Briefing_Title"
          variant="body2"
          sx={{ fontWeight: 'bold' }}
        >
          Briefing
        </Typography>
        {contract && (
          <Typography
            data-testid="ContractPage-PayBriefing-Mobile__Briefing_Content"
            variant="body2"
            sx={{ color: 'text.primary' }}
          >
            {contract.briefing}
          </Typography>
        )}
      </DigiDisplay>
    </DigiBox>
  );
};
