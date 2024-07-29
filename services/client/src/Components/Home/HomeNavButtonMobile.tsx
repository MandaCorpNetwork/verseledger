import { UnderConstruction } from '@Common/Components/App/UnderContruction';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type HomeNavButtonMobileProps = {
  title: string;
  to?: string;
  inDev?: boolean;
};

export const HomeNavButtonMobile: React.FC<HomeNavButtonMobileProps> = ({
  title,
  to,
  inDev,
}) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (inDev) {
      setDialogOpen(true);
    }
    if (to) {
      navigate(to);
    }
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Button
        data-testid="Home__HomeNavButtonMobile"
        onClick={handleClick}
        variant="contained"
        sx={{
          py: '10px',
          boxShadow:
            '0 4px 8px rgba(0,1,19,.7), 0 6px 12px rgba(0,1,19,.6), inset 0 4px 8px rgba(0,1,19,.8), inset 0 -4px 8px rgba(0,1,19,.4)',
          border: '2px solid rgba(8,22,80,.8)',
          borderRadius: '10px',
          transition: 'all .2s ease-in-out',
          '&:active': {
            transform: 'translateY(2px)',
            boxShadow:
              'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 1, 19, 0.2)',
          },
        }}
      >
        {title}
      </Button>
      <UnderConstruction isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </>
  );
};
