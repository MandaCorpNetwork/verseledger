import { Button, Typography } from '@mui/material';
import React from 'react';

type SplashRedirectButtonProps = {
  title: string;
}
export const ContractSplashRedirectButton: React.FC<SplashRedirectButtonProps> = ({
  title,
}) => {
  return (
    <Button
      sx={{
        color: 'text.primary',
        width: '15em',
        height: '5em',
        display: 'flex',
        border: '5px ridge',
        borderColor: 'secondary.dark',
        borderRadius: '.4em',
        marginTop: '5%',
        marginBottom: '5%',
        bgcolor: 'primary.dark',
        '&:hover': {
          borderColor:'secondary.light',
        },
        '&:active': {
          color: 'text.secondary',
          borderColor:'secondary.main',
        }
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >{title}</Typography>
    </Button>
  );
};
