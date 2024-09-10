import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { BugsPage } from '@/Components/Admin/Page/BugsPage';
import { MilestonesPage } from '@/Components/Admin/Page/MilestonesPage';
import { OverviewPage } from '@/Components/Admin/Page/OverviewPage';
import { QuestionsPage } from '@/Components/Admin/Page/QuestionsPage';
import { ReportsPage } from '@/Components/Admin/Page/ReportsPage';
import { SuggestionsPage } from '@/Components/Admin/Page/SuggestionsPage';
import { UpdatesPage } from '@/Components/Admin/Page/UpdatesPage';
import { UserIssuePage } from '@/Components/Admin/Page/UserIssuePage';
import { AdminSideBar } from '@/Components/Admin/SideBar';

export const AdminPage: React.FC = () => {
  const { adminTab } = useParams();
  const renderTab = React.useCallback(() => {
    switch (adminTab) {
      case 'bugs':
        return <BugsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'user-issue':
        return <UserIssuePage />;
      case 'questions':
        return <QuestionsPage />;
      case 'suggestions':
        return <SuggestionsPage />;
      case 'updates':
        return <UpdatesPage />;
      case 'milestones':
        return <MilestonesPage />;
      default:
        return <OverviewPage />;
    }
  }, [adminTab]);
  return (
    <VLViewport data-testid="AdminPage__PageContainer" sx={{ py: '1em' }}>
      <Box
        data-testid="AdminPage__PageWrapper"
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '1em',
          pr: '1em',
        }}
      >
        <Box
          data-testid="AdminPage__Sidebar_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <AdminSideBar />
        </Box>
        <GlassBox data-testid="AdminPage__Content_Container" sx={{ flexGrow: 1 }}>
          {renderTab()}
        </GlassBox>
      </Box>
    </VLViewport>
  );
};

//Bugs
//Reports
//User Issues
//Questions
//Suggestions
//Feature Updates
//Milestones
