import { UserChip } from '@Common/Components/Chips/UserChip';
import { PayInput } from '@Common/Components/Custom/PayInput';
import { Industry } from '@Common/Definitions/CustomIcons';
import { Box, ButtonBase, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type ContractManagerCardProps = {
  /** @prop {IContract} - The Contract Being Rendered */
  contract: IContract;
  /** @prop {string | null} - The selected Contract Id, so component knows if it is selected */
  selectedId: string | null;
  /** @prop {(string | null) => void} - Function to run when clicked and passing in the Contract Id of the component */
  setSelectedId: (id: string | null) => void;
};

/**
 * ### Contract Manager Card
 * @description
 * Displays a Button for selecting a contract to expand details. Shows a small amount of details of the Contract
 * @version 0.1.3 - Sept 2024
 * #### Functional Components:
 * - {@link UserChip}
 * - {@link PayInput}
 * @author ThreeCrown - May 2024
 */
export const ContractManagerCard: React.FC<ContractManagerCardProps> = ({
  contract,
  selectedId,
  setSelectedId,
}) => {
  // HOOKS
  const theme = useTheme();

  // LOGIC

  /** Handles the click on a button. Passes contractId to the setSelectedId function */
  const handleClick = () => {
    setSelectedId(contract.id);
  };

  /** Boolean to decide if this contract is selected */
  const isSelected = selectedId === contract.id;

  return (
    <ButtonBase
      data-testid="ContractManager-ContractList_CardContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: { xs: '250px', md: '80%' },
        px: { xs: '.5em', md: '1em' },
        py: '.5em',
        borderLeft: '3px solid',
        borderRight: '3px solid',
        borderRadius: '10px',
        borderColor: isSelected ? 'success.main' : 'action.disabled',
        background: isSelected
          ? 'linear-gradient(135deg, rgba(8,201,11,.4), rgba(14,100,8,.4))'
          : 'linear-gradient(135deg, rgba(14,35,141,.5), rgba(8,22,80,.5))',
        cursor: 'pointer',
        transition: 'background-color 300ms',
        color: isSelected ? 'secondary.main' : 'text.secondary',
        textShadow: isSelected ? '0 1px 8px rgba(0,0,0)' : '',
        '&:hover': {
          background: isSelected
            ? 'linear-gradient(135deg, rgba(8,201,11,.2), rgba(14,100,8,.2))'
            : 'linear-gradient(135deg, rgba(33,150,243,.2), rgba(8,22,80,.2))',
          borderColor: isSelected ? 'success.dark' : 'primary.light',
          color: isSelected ? 'grey' : 'secondary.light',
        },
        '&:active': {
          borderColor: 'secondary.main',
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
          gap: '1em',
        }}
      >
        <Typography
          variant={theme.breakpoints.down('md') ? 'body2' : 'h6'}
          noWrap
          sx={{
            color: 'inherit',
            textShadow: 'inherit',
            fontWeight: 'bold',
          }}
        >
          {contract.title}
        </Typography>
        <Box sx={{ alignSelf: 'center' }}>
          <Tooltip title={`${contract.subtype}`} arrow>
            <Industry fontSize="large" />
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
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        <UserChip
          user_id={contract.owner_id}
          size="small"
          sx={{ mx: 'auto', maxWidth: { xs: '100px', md: '150px' } }}
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
