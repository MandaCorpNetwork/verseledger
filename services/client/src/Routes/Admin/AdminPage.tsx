import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { VLViewport } from '@Common/Components/Core/Boxes/VLViewport';
import { BugsPage } from '@ComponentsLegacy/Admin/Page/Bugs/BugsPage';
import { MilestonesPage } from '@ComponentsLegacy/Admin/Page/MilestonesPage';
import { OverviewPage } from '@ComponentsLegacy/Admin/Page/OverviewPage';
import { QuestionsPage } from '@ComponentsLegacy/Admin/Page/QuestionsPage';
import { ReportsPage } from '@ComponentsLegacy/Admin/Page/ReportsPage';
import { SuggestionsPage } from '@ComponentsLegacy/Admin/Page/SuggestionsPage';
import { UpdatesPage } from '@ComponentsLegacy/Admin/Page/UpdatesPage';
import { UserIssuePage } from '@ComponentsLegacy/Admin/Page/UserIssuePage';
import { AdminSideBar } from '@ComponentsLegacy/Admin/SideBar';
import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';

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
        <FeatureContainer data-testid="AdminPage__Content_Container" sx={{ flexGrow: 1 }}>
          {renderTab()}
        </FeatureContainer>
      </Box>
    </VLViewport>
  );
};
