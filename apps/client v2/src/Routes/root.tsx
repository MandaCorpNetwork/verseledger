import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box } from '@mui/material';
import type { ReactNode } from 'react';

type BaseWrapProps = {
  children: ReactNode;
};
const BaseWrap: React.FC<BaseWrapProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export const rootRoute = createRootRoute({
  component: () => <BaseWrap><Outlet /></BaseWrap>,
});
