import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { ArchetypeChip } from '@Common/Components/Chips/ArchetypeChip';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { DesktopPayInfo } from './DesktopPayInfo';

type InfoNonMobileProps = {
  contract: IContract;
  archetype: string;
  tablet: boolean;
};

export const InfoNonMobile: React.FC<InfoNonMobileProps> = ({
  contract,
  archetype,
  tablet,
}) => {
  return (
    <>
      <DigiDisplay
        data-testid="ContractPage-Info-ContractInfo__Status_Wrapper"
        sx={{
          py: { s: '.8em' },
          px: { s: '1em', md: '1.5em' },
        }}
      >
        <Typography
          data-testid="ContractPage-Info-ContractInfo__Status_Title"
          sx={{
            fontWeight: 'bold',
            cursor: 'default',
          }}
        >
          Status
        </Typography>
        {contract && (
          <ContractStatusChip
            data-testid="ContractPage-Info-ContractInfo__Status_Chip"
            status={contract.status}
            sx={{ my: 'auto' }}
            size="medium"
          />
        )}
      </DigiDisplay>
      <DigiDisplay
        data-testid="ContractPage-Info-ContractInfo__Type_Container"
        sx={{
          flexDirection: 'row',
          gap: { s: '1em', md: '2em', lg: '3em', xl: '4em' },
          px: { s: '1em', md: '1.5em' },
        }}
      >
        <DigiField
          data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Field"
          label="Contract Subtype"
          sx={{ py: '.5em' }}
          slots={{
            label: {
              sx: {
                fontSize: { s: '.7em', md: '.8em', lg: '.9em', xl: '1em' },
                mb: { s: '.5em', md: '.6em' },
              },
            },
          }}
        >
          {contract && (
            <SubtypeChip
              data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Chip"
              subtype={contract.subtype}
              size="medium"
            />
          )}
        </DigiField>
        <DigiField
          data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Field"
          label="Contract Archetype"
          sx={{ py: '.5em' }}
          slots={{
            label: {
              sx: {
                fontSize: { s: '.7em', md: '.8em', lg: '.9em', xl: '1em' },
                mb: { s: '.5em', md: '.6em' },
              },
            },
          }}
        >
          {archetype && (
            <ArchetypeChip
              data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Chip"
              archetype={archetype}
              size="medium"
              iconSize="medium"
            />
          )}
        </DigiField>
      </DigiDisplay>
      {!tablet && <DesktopPayInfo contract={contract} />}
      <UserDisplay userid={contract.owner_id} />
    </>
  );
};
