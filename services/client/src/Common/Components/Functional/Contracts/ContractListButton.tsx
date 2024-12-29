import { Box, ListItemButton, ListItemText } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useNav } from '@Utils/Hooks/useNav';
import { useIsMobile } from '@Utils/isMobile';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { UserChip } from '../Applcation/Chips/UserChip';
import { PayDisplay } from '../Applcation/Displays/PayDisplay';
import { SubtypeChip } from './SubtypeChip';

type ListButtonProps = {
  contract: IContractWithOwner;
  'data-testid'?: string;
  'aria-label'?: string;
};

/**
 * ListItemButton for Contracts in a List Format
 * ___
 * TODO:
 * - Refine Styles for Verse OS
 * - Start Styles for Pirate OS
 */
export const ContractListButton: React.FC<ListButtonProps> = ({
  contract,
  'data-testid': testId = 'ContractList__ContractButton',
  'aria-label':
    ariaLabel = 'Button to select a Contract in a List to view the Contract Info',
}) => {
  const { selectedContractId } = useParams();
  const extendTheme = useDynamicTheme();
  const nav = useNav();
  const isMobile = useIsMobile();

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) {
        nav(`/contracts/${contract.id}`, 'internal', true).onClick(e);
      } else {
        const { search } = window.location;
        nav(`/apps/contracts/${contract.id}${search}`, 'internal', false).onClick(e);
      }
    },
    [contract.id, isMobile, nav],
  );

  const handleAuxSelect = useCallback(
    (e: React.MouseEvent) => {
      nav(`/contracts/${contract.id}`).onAuxClick(e);
    },
    [contract.id, nav],
  );

  const layout = useMemo(() => {
    const button = extendTheme.layout('Contracts.ContractListButton');
    const left = extendTheme.layout('Contracts.ContractListButton.LeftBox');
    const right = extendTheme.layout('Contracts.ContractListButton.RightBox');
    const title = extendTheme.layout('Contracts.ContractListButton.Title');

    return { button, left, right, title };
  }, [extendTheme]);

  return (
    <ListItemButton
      data-testid={testId}
      aria-label={ariaLabel}
      selected={selectedContractId === contract.id}
      onClick={handleSelect}
      onAuxClick={handleAuxSelect}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mx: '5%',
        ...layout.button,
      }}
    >
      <Box
        data-testid={`${testId}__Left_Container`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5em',
          ...layout.left,
        }}
      >
        <ListItemText
          data-testid={`${testId}__Title`}
          primary={contract.title}
          slotProps={{
            primary: {
              variant: 'h6',
              sx: {
                ...layout.title,
              },
            },
          }}
        />
        <SubtypeChip
          data-testid={`${testId}__${contract.subtype}_SubtypeChip`}
          aria-label={`Clickable ${contract.subtype} Contract Subtype Chip to Display details on ${contract.subtype}`}
          value={contract.subtype}
        />
      </Box>
      <Box
        data-testid={`${testId}__Right_Container`}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5em',
          ...layout.right,
        }}
      >
        <UserChip
          data-testid={`${testId}__UserChip`}
          aria-label="Clickable User Chip for the Contract Owner"
          size="small"
          user={contract.Owner}
        />
        <PayDisplay
          data-testid={`${testId}__DefaultPay_Display`}
          aria-label="Display of Default Pay for the Contract"
          structure={contract.payStructure}
          value={contract.defaultPay}
        />
      </Box>
    </ListItemButton>
  );
};
