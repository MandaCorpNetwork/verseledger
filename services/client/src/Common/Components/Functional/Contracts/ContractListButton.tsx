import { ListItemButton } from '@mui/material';
import type React from 'react';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

type ListButtonProps = {
  contract: IContract;
};

export const ContractListButton: React.FC<ListButtonProps> = ({ contract }) => {
  return <ListItemButton>{contract.title}</ListItemButton>;
};
