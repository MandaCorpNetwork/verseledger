import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { Box, Typography } from '@mui/material';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type MobilePayBriefProps = {
  /** @prop {IContract} contract - The contract to display information for */
  contract: IContract;
};
/**
 * ### MobilePayBrief
 * @description
 * Displays Pay information for a Contract on a Mobile Screen.
 * @version 0.1.2
 * @memberof {@link ContractPage}
 * @param {IContract} contract - The contract to display information for
 * @returns {React.FC}
 * #### Functional Components
 * @component {@link PayDisplay}
 * @component {@link PayStructure}
 * #### Styled Components
 * @component {@link DigiBox}
 * @component {@link DigiDisplay}
 * @author ThreeCrown
 */
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
              structure={contract.payStructure as ContractPayStructure}
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
