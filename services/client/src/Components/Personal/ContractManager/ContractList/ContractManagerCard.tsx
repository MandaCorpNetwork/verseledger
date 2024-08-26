import { UserChip } from '@Common/Components/Chips/UserChip';
import { PayInput } from '@Common/Components/Custom/DigiField/PayInput';
import { Box, ButtonBase, Tooltip, Typography, useTheme } from '@mui/material';
// import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import TestAttacheIcon from '@/Assets/media/GameplayIcons/TestAttacheIcon.svg?url';

//import type { IContract } from '@Backend/interfaces/IContract';

type ContractManagerCardProps = {
  contract: IContract;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

export const ContractManagerCard: React.FC<ContractManagerCardProps> = ({
  contract,
  selectedId,
  setSelectedId,
}) => {
  const handleClick = () => {
    setSelectedId(contract.id);
  };

  const isSelectedContract = selectedId === contract.id;
  const theme = useTheme();

  return (
    <ButtonBase
      data-testid="ContractManager-ContractList_CardContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: { xs: '250px', md: '80%' },
        my: '.5em',
        px: { xs: '.5em', md: '1em' },
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: '50%', md: '60%' },
        }}
      >
        <Typography
          variant={theme.breakpoints.down('md') ? 'body2' : 'h6'}
          color="secondary"
          noWrap
          sx={{
            textShadow: '0 0 4px rgba(255,255,255)',
            mb: '1em',
          }}
        >
          {contract.title}
        </Typography>
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
          height: '100%',
        }}
      >
        <UserChip
          user_id={contract.owner_id}
          size="small"
          sx={{ mb: 'auto', mx: 'auto', maxWidth: { xs: '100px', md: '150px' } }}
        />
        <Box sx={{ width: { xs: '120px', md: '150px' } }}>
          <PayInput
            size="small"
            margin="none"
            label="Default Pay"
            structure={contract.payStructure as ContractPayStructure}
            value={contract.defaultPay}
          />
        </Box>
      </Box>
    </ButtonBase>
  );
};
