import { userBackgroundOptions } from '@Common/Definitions/Users/UserBackgrounds';
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
  const open = Boolean(anchorEl);
  const selectedUserImage = user.Settings?.userPageImage;
  const getUserBackground = React.useCallback(() => {
    const backgroundOption = userBackgroundOptions.find(
      (option) => option.value === selectedUserImage,
    );
    return backgroundOption ? backgroundOption.url : userBackgroundOptions[0].url;
  }, [userBackgroundOptions, selectedUserImage]);
  return (
    <>
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </Box>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" sx={{ zIndex: 100 }}>
        <Box
          sx={{
            background:
              'linear-gradient(135deg, rgba(0,1,19), rgba(8,22,80), rgba(14,35,141))',
            boxShadow: 3,
            borderRadius: 2,
            p: '.5em',
            m: '.5em',
            minWidght: '200px',
            zIndex: 'tooltip',
            border: '1px solid',
            borderColor: 'divider',
            transition: 'opacity 0.3s ease-in-out',
            opacity: open ? 1 : 0,
          }}
        >
          <Box
            sx={{
              background: `url(${getUserBackground()}) center/cover no-repeat`,
              minWidth: '300px',
              minHeight: '100px',
            }}
          >
            {user.displayName}
          </Box>
        </Box>
      </Popper>
    </>
  );
};
