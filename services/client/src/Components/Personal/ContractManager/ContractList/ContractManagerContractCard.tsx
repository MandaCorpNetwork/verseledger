import { OutlinedLabel } from '@Common/Components/App/OutlinedLabel';
import { Avatar, Box, ButtonBase, Chip, Tooltip, Typography } from '@mui/material';
// import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { IContract, IContractWithOwner } from 'vl-shared/src/schemas/ContractSchema';

import TestAttacheIcon from '@/Assets/media/GameplayIcons/TestAttacheIcon.svg?url';

//import type { IContract } from '@Backend/interfaces/IContract';

type ContractManagerCardProps = {
  contract: IContract;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

export const ContractManagerContractCard: React.FC<ContractManagerCardProps> = ({
  contract,
  selectedId,
  setSelectedId,
}) => {
  const handleClick = () => {
    setSelectedId(contract.id);
  };

  const isSelectedContract = selectedId === contract.id;

  return (
    <ButtonBase
      data-testid="ContractManager-ContractList_CardContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        my: '.5em',
        px: '1em',
        py: '.5em',
        borderLeft: '3px solid',
        borderRight: '3px solid',
        borderRadius: '10px',
        borderColor: isSelectedContract ? 'secondary.main' : 'primary.main',
        backgroundColor: isSelectedContract
          ? 'rgba(33,150,243,.22)'
          : 'rgba(33,150,243,.1)',
        cursor: 'pointer',
        transition: 'background-color 300ms',
        '&:hover': {
          backgroundColor: 'rgba(121,192,244,.2)',
          borderColor: 'primary.light',
        },
        '&:active': {
          backgroundColor: 'rgba(6,86,145,.4)',
          borderColor: 'secondary.light',
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: 'secondary.dark',
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">{contract.title}</Typography>
        <Box sx={{ alignSelf: 'center' }}>
          <Tooltip title={`${contract.subtype}`} arrow>
            <img src={TestAttacheIcon} alt="" width="30" />
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          ml: 'auto',
        }}
      >
        <Box sx={{ mx: '.5em', alignItems: 'flex-end' }}>
          <Tooltip title={(contract as IContractWithOwner).Owner?.displayName} arrow>
            <Chip
              label={(contract as IContractWithOwner).Owner?.displayName}
              avatar={
                <Avatar
                  alt={(contract as IContractWithOwner).Owner?.displayName as string}
                  src="../Assets/testprofile.png"
                />
              }
              size="small"
              color="primary"
              sx={{
                fontSize: '.75em',
                maxWidth: '125px',
                cursor: 'pointer',
                mb: '.9em',
              }}
            />
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mr: '1em', mb: '.6em' }}>
            <OutlinedLabel
              size="small"
              margin="none"
              label="Pay"
              value={contract.defaultPay}
              startAdornment="¤"
              maxWidth="100px"
            />
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
};
