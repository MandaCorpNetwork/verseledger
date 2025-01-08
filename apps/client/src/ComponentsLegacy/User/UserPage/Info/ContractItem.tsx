import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ContractStatusChip } from '@CommonLegacy/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@CommonLegacy/Components/Chips/SubtypeChip';
import { UserChip } from '@CommonLegacy/Components/Chips/UserChip';
import { ErrorTwoTone } from '@mui/icons-material';
import { Box, Grid2, SvgIcon, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

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
 */
export const ContractItem: React.FC<ContractProps> = ({
  contract,
  isOwner,
  isActive,
}) => {
  //LOGIC
  /** Finds the achetype the of the selected contract. */
  const selectedArchetype =
    contractArchetypes.find((option) =>
      option.subtypes.some((subType) => subType.value === contract.subtype),
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

  const ArchetypeIcon = selectedArchetype?.archetypeIcon ?? ErrorTwoTone;

  return (
    <ComponentContainer sx={{ px: '1em', my: '.5em' }} data-testid="ContractItem_DigiBox">
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
              <SvgIcon component={ArchetypeIcon} />
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
    </ComponentContainer>
  );
};
