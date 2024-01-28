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
      sx={{
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        borderRadius: '.5em',
        padding: '.5em',
        width: '16em',
        height: '6em',
        marginTop: '1em',
        marginLeft: '.5em',
        display: 'flex',
        flexGrow: 1,
        transition: 'width .4s ease-in, height.4s ease-in',
        transitionDelay: '300ms',
        '&:hover': {
          width: '20em',
          height: '10em',
        },
        '&:hover > .nav-button-text': {
          fontWeight: '800',
          color: theme.palette.text.secondary,
          fontSize: '1.2em',
        }
      }}
    >
      <Typography
        className='nav-button-text'
        variant='body1'
        sx={{
          color: theme.palette.text,
          fontWeight: '500',
          fontSize: '1em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '.8em',
          marginLeft: 'auto',
          marginTop: 'auto',
          alignSelf: 'flex-end',
          transition: 'color 300ms ease-in-quad, fontSize 300ms ease-in-quad, fontWeight 300ms ease-in-quad',
        }}
      >
        {props.title}
      </Typography>
    </Box>
  );
};
