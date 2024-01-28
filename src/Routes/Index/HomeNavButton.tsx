import { useTheme } from '@emotion/react';
import { Box, Typography, alpha } from '@mui/material';
import React from 'react';

type HomeNavButtonProps = {
  title: string;
  to: string;
};

export const HomeNavButton: React.FC<HomeNavButtonProps> = (props) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;
  return (
    <Box
      width={'15em'}
      height={'5em'}
      marginTop="1em"
      sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.5) }}
      display="flex"
    >
      <Typography
        variant="body1"
        alignSelf="flex-end"
        marginLeft="5em"
        marginBottom="1em"
      >
        {props.title}
      </Typography>
    </Box>
  );
};
