import { Box, Popper } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

type MiniPlayerCardProps = PropsWithChildren<{
  user: IUserWithSettings;
}>;
export const MiniPlayerCard: React.FC<MiniPlayerCardProps> = (props) => {
  const { children, user } = props;
  // LOCAL STATES
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // LOGIC
  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  }, []);
  return (
    <>
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </Box>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom"
        sx={{ zIndex: 100 }}
      >
        {user.displayName}
      </Popper>
    </>
  );
};
