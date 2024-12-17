import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { Typography } from '@mui/material';
import type React from 'react';

export const EmptyDisplay: React.FC = () => {
  return (
    <FeatureContainer
      data-testid="VerseMarket-Marketplace__EmptyDisplayContainer"
      sx={{
        height: '100%',
        p: '.5em',
        display: 'flex',
        flexDirection: 'column',
        mx: '.5em',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Typography variant="h4">No Selected Item</Typography>
    </FeatureContainer>
  );
};
