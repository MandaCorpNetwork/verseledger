import { Box, Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import About from './Pages/About/About.mdx';
import AccountSetup from './Pages/AccountSetup/AccountSetup.mdx';
import NewSettings from './Pages/AccountSetup/NewSettings.mdx';
import SignUp from './Pages/AccountSetup/SignUp.mdx';
import Verification from './Pages/AccountSetup/Verification.mdx';

export const WikiDisplay: React.FC = () => {
  const { page, subpage } = useParams();
  const fileRender = React.useMemo(() => {
    if (!subpage && page) {
      switch (page) {
        case 'about':
          return <About />;
        case 'accSetup':
        default:
          return <AccountSetup />;
      }
    } else {
      switch (subpage) {
        case 'signUp':
          return <SignUp />;
        case 'verification':
          return <Verification />;
        case 'newSettings':
          return <NewSettings />;
        default:
          return;
      }
    }
  }, [page, subpage]);
  return (
    <Box
      data-testid="WikiPage__Display"
      sx={{
        height: '90%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        m: 'auto',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderRadius: '10px',
        borderColor: 'secondary.main',
        borderLeft: '1px solid rgba(14,49,141,0.5)',
        borderRight: '1px solid rgba(14,49,141,0.5)',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(14,49,141,.8)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(0,30,100,0.2)',
        padding: '1em',
        '&::-webkit-scrollbar': {
          width: '5px',
          height: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgb(0,73,130)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          background: 'rgb(24,252,252)',
        },
      }}
    >
      <Breadcrumbs>
        <Link>{page}</Link>
        <Link>{subpage}</Link>
      </Breadcrumbs>
      {fileRender}
    </Box>
  );
};
