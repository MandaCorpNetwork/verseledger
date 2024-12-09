import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { ArchetypeChip } from '@CommonLegacy/Components/Chips/ArchetypeChip';
import { ContractStatusChip } from '@CommonLegacy/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@CommonLegacy/Components/Chips/SubtypeChip';
import { DigiField } from '@CommonLegacy/Components/Custom/DigiField/DigiField';
import { UserDisplay } from '@CommonLegacy/Components/Users/UserDisplay';
import { Box, Typography } from '@mui/material';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

type MobileInfoProps = {
  /** The contract to display information for */
  contract: IContractWithOwner;
  /** The archetype of the contract */
  archetype: string;
};

/**
 * ### MobileInfo
 * @description
 * Displays Overview information for a Contract on a Mobile Screen.
 * @memberof {@link TitleBox}
 * @param contract - The contract to display information for
 * @param archetype - The archetype of the contract
 * #### Functional Components
 * @component {@link SubTypeChip}
 * @component {@link ContractStatusChip}
 * @component {@link ArchetypeChip}
 * @component {@link UserDisplay}
 * #### Styled Components
 * @component {@link DigiField}
 * @component {@link ComponentDisplay}
 */
export const MobileInfo: React.FC<MobileInfoProps> = ({ contract, archetype }) => {
  return (
    <Box
      data-testid="ContractPage-Info-ContractInfo__Mobile_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '.5em',
      }}
    >
      <Box
        data-testid="ContractPage-Info-ContractInfo-Mobile__Status&Type_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <DigiField
          data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Field"
          label="Contract Subtype"
        >
          {contract && (
            <SubtypeChip
              data-testid="ContractPage-Info-ContractInfo-Mobile__Subtype_Chip"
              subtype={contract.subtype}
              iconSize="small"
            />
          )}
        </DigiField>
        <DigiField
          data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Field"
          label="Contract Archetype"
        >
          {archetype && <ArchetypeChip archetype={archetype as ContractArchetype} />}
        </DigiField>
      </Box>
      <Box
        data-testid="ContractPage-Info-ContractInfo-Mobile__UserDisplay_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <ComponentDisplay
          data-testid="ContractPage-Info-ContractInfo__Status_Wrapper"
          sx={{ px: '.5em' }}
        >
          <Typography
            data-testid="ContractPage-Info-ContractInfo__Status_Title"
            align="center"
            variant="body2"
            sx={{ fontWeight: 'bold' }}
          >
            Status
          </Typography>
          {contract && (
            <ContractStatusChip
              data-testid="ContractPage-Info-ContractInfo__Status_Chip"
              status={contract.status}
              sx={{ my: 'auto' }}
            />
          )}
        </ComponentDisplay>
        <UserDisplay user={contract.Owner} />
      </Box>
    </Box>
  );
};
