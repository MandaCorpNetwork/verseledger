import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Box, Grid2, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type ContractProps = {
  /** Contract properties for data. */
  contract: IContract;
  isOwner: boolean;
  isActive?: boolean;
};
/** Global variable for finding contract end date. */
dayjs.extend(relativeTime);

/**
 * ### ContractItem
 * @description
 * The ContractItem component is a collection of contract iformation that is formated for use of different display methods (i.e. list, grid, etc.)
 * Allows the user to view both active and inactive contracts that the user either created or were employed by.
 * Includes scrollable drop down menus that display active and inactive contracts.
 * @version 0.1.0
 * @returns {React.FC}
 * @author Eugene R. Petrie - Sept 2024
 */
export const ContractItem: React.FC<ContractProps> = ({
  contract,
  isOwner,
  isActive,
}) => {
  //LOGIC
  /** Fetches the archetype option of the selected contract. */
  const archetypes = contractArchetypes('secondary.main', 'large');
  /** Finds the achetype the of the selected contract. */
  const selectedArchetype =
    archetypes.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    ) || null;
  /** Sets up the end date text string displayed on the contract information. */
  const endDateText = React.useCallback(() => {
    if (!contract.endDate) return;
    const endDate = dayjs(contract.endDate);
    const isAfter = dayjs().isAfter(endDate);
    if (isAfter) {
      if (
        contract.status === 'PENDING' ||
        contract.status === 'BIDDING' ||
        contract.status === 'INPROGRESS'
      ) {
        return `Expired ${endDate.fromNow()}`;
      }
      return `Ended ${endDate.fromNow()}`;
    } else {
      return `Ends ${endDate.fromNow()}`;
    }
  }, [contract]);

  return (
    <DigiBox sx={{ px: '1em', my: '.5em' }} data-testid="ContractItem_DigiBox">
      <Grid2
        container
        columnSpacing={2}
        data-testid="ContractItem-Digibox_ContractItemGrid_Containter."
      >
        {!isOwner && (
          <Grid2
            size={{ md: 1.8 }}
            sx={{ my: 'auto' }}
            data-testid="ContractItemGrid-Containter_UserChipGrid"
          >
            <UserChip
              size={'small'}
              user_id={contract.owner_id}
              sx={{ maxWidth: '150px' }}
            />
          </Grid2>
        )}
        <Grid2
          size={{ md: 3 }}
          sx={{ my: 'auto' }}
          data-testid="ContractItemGrid-Containter_ContractTitleGrid"
        >
          <Tooltip
            title={contract.title}
            data-testid="ContractItemGrid-Containter-TitleGrid_Tooltip"
          >
            <Typography
              variant="body1"
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
              data-testid="ContractItemGrid-Containter-TitleGrid_Typography"
            >
              {contract.title}
            </Typography>
          </Tooltip>
        </Grid2>
        <Grid2
          size={{ md: 2.5 }}
          data-testid="ContractItemGrid-Containter-ArchetypeIconGrid"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
            }}
            data-testid="ContractItemGrid-Containter-ArchetypeIconGrid_Wrapper"
          >
            <Tooltip
              title={selectedArchetype?.archetype}
              data-testid="ContractItemGrid-Containter-ArchetypeIconGrid-Icon_ToolTip"
            >
              {selectedArchetype ? selectedArchetype.archetypeIcon : <></>}
            </Tooltip>
            <SubtypeChip
              subtype={contract.subtype}
              data-testid="ContractItemGrid-Containter-ArchetypeIconGrid-Icon_SubtypeChip"
            />
          </Box>
        </Grid2>
        <Grid2
          size={{ md: 1 }}
          sx={{ my: 'auto' }}
          data-testid="ContractItemGrid-Containter-ArchetypeIconGrid"
        >
          {isActive && <ContractStatusChip status={contract.status} />}
        </Grid2>
        <Grid2 size={{ md: 3.5 }} sx={{ my: 'auto' }}>
          <Typography variant="body2" align="right">
            {endDateText()}
          </Typography>
        </Grid2>
      </Grid2>
    </DigiBox>
  );
};
