import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Box, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type ContractProps = {
  contract: IContract;
  isOwner: boolean;
  isActive?: boolean;
};

dayjs.extend(relativeTime);

export const ContractItem: React.FC<ContractProps> = ({
  contract,
  isOwner,
  isActive,
}) => {
  const archetypes = contractArchetypes('secondary.main', 'large');

  const selectedArchetype =
    archetypes.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    ) || null;

  const endDateText = React.useCallback(() => {
    if (!contract.endDate) return;
    const endDate = dayjs(contract.endDate);
    const isAfter = dayjs().isAfter(endDate);
    if (isAfter) {
      return `Ended ${endDate.fromNow()}`;
    } else {
      return `Ends ${endDate.fromNow()}`;
    }
  }, [contract]);

  return (
    <DigiBox
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '1em',
        my: '.5em',
      }}
    >
      {!isOwner && <UserChip size={'small'} user_id={contract.owner_id} />}
      <Typography variant="subtitle1">{contract.title}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '1em',
        }}
      >
        <Tooltip title={selectedArchetype?.archetype}>
          {selectedArchetype ? selectedArchetype.archetypeIcon : <></>}
        </Tooltip>
        <SubtypeChip subtype={contract.subtype} />
      </Box>
      {isActive && <ContractStatusChip status={contract.status} />}
      <Typography variant="body2">{endDateText()}</Typography>
    </DigiBox>
  );
};
