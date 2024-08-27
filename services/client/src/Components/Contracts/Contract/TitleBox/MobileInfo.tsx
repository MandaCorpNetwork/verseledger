import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { ArchetypeChip } from '@Common/Components/Chips/ArchetypeChip';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type MobileInfoProps = {
  /** @prop {IContract} contract - The contract to display information for */
  contract: IContract;
  /** @prop {string} archetype - The archetype of the contract */
  archetype: string;
};

/**
 * ### MobileInfo
 * @description
 * Displays Overview information for a Contract on a Mobile Screen.
 * @version 0.1.0
 * @memberof {@link TitleBox}
 * @param {IContract} contract - The contract to display information for
 * @param {string} archetype - The archetype of the contract
 * @returns {React.FC}
 * #### Functional Components
 * @component {@link SubTypeChip}
 * @component {@link ContractStatusChip}
 * @component {@link ArchetypeChip}
 * @component {@link UserDisplay}
 * #### Styled Components
 * @component {@link DigiField}
 * @component {@link DigiDisplay}
 * @author ThreeCrown
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
          {archetype && <ArchetypeChip archetype={archetype} />}
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
        <DigiDisplay
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
        </DigiDisplay>
        <UserDisplay userid={contract?.owner_id} />
      </Box>
    </Box>
  );
};
