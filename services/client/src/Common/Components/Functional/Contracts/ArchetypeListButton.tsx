import { ContractArchetypeTree } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ListItemButton, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import type React from 'react';

type ListButtonProps = {
  archetype: ContractArchetypeTree;
};

export const ArchetypeListButton: React.FC<ListButtonProps> = ({ archetype }) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <SvgIcon component={archetype.archetypeIcon} />
      </ListItemIcon>
      <ListItemText primary={archetype.archetypeLabel} />
    </ListItemButton>
  );
};
