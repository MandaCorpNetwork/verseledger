import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { ArchetypeChip } from '@Common/Components/Chips/ArchetypeChip';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { Box, Typography } from '@mui/material';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { DesktopPayInfo } from './DesktopPayInfo';

type InfoNonMobileProps = {
  /** The contract to display information for */
  contract: IContractWithOwner;
  /** The archetype of the contract */
  archetype: string;
  /** Whether the screen is tablet or not */
  tablet: boolean;
};

/**
 * ### InfoNonMobile
 * @description
 * Displays Overview information for a Contract on a Non-Mobile Screen.
 * @memberof {@link TitleBox}
 * @param contract - The contract to display information for
 * @param archetype - The archetype of the contract
 * @param tablet - Whether the screen is tablet or not
 * #### Functional Components
 * @component {@link SubTypeChip}
 * @component {@link ContractStatusChip}
 * @component {@link ArchetypeChip}
 * @component {@link UserDisplay}
 * @component {@link DesktopPayInfo}
 * #### Styled Components
 * @component {@link DigiDisplay}
 * @component {@link DigiField}
 */
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
          <Box
            data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Wrapper"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {contract && (
              <SubtypeChip
                data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Chip"
                subtype={contract.subtype}
                size="medium"
              />
            )}
          </Box>
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
          <Box
            data-testid="ContractPage-Info-ContractInfo-Type__ArchetypeChip_Wrapper"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {archetype && (
              <ArchetypeChip
                data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Chip"
                archetype={archetype as ContractArchetype}
                size="medium"
                iconSize="medium"
              />
            )}
          </Box>
        </DigiField>
      </DigiDisplay>
      {!tablet && <DesktopPayInfo contract={contract} />}
      <UserDisplay user={contract.Owner} />
    </>
  );
};
