import { AdminSideBar } from '@/Components/Admin/SideBar';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';

export const AdminPage: React.FC = () => {
  return (
    <VLViewport data-testid="AdminPage__PageContainer" sx={{ py: '1em' }}>
      <Box
        data-testid="AdminPage__Sidebar_Wrapper"
        sx={{
          py: '1em',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <AdminSideBar />
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
