import { ListItemButton, ListItemText } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useNav } from '@Utils/Hooks/useNav';
import { useIsMobile } from '@Utils/isMobile';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { UserChip } from '../Applcation/Chips/UserChip';
import { SubtypeChip } from './SubtypeChip';

type ListButtonProps = {
  contract: IContractWithOwner;
  'data-testid'?: string;
  'aria-label'?: string;
};

/**
 * ListItemButton for Contracts in a List Format
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

  const layout = useMemo(() => {}, []);

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) {
        nav(`/contracts/${contract.id}`, 'internal', true).onClick(e);
      } else {
        const { search, pathname } = window.location;
        const cleanedPathname = pathname.replace(/\/[^/]+$/, '');
        nav(`${cleanedPathname}/${contract.id}${search}`, 'internal', false).onClick(e);
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

  return (
    <ListItemButton
      data-testid={testId}
      aria-label={ariaLabel}
      selected={selectedContractId === contract.id}
      onClick={handleSelect}
      onAuxClick={handleAuxSelect}
    >
      <div>
        <ListItemText primary={contract.title} />
        <SubtypeChip value={contract.subtype} />
      </div>
      <div>
        <UserChip user={contract.Owner} />
      </div>
    </ListItemButton>
  );
};
