import { Box } from '@mui/material';

export const OverviewPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ul>
        <li>Bugs</li>
        <ul>
          <li>Recent & Unviewed</li>
          <li>Confirmed Bugs</li>
          <li>Bugs Assigned to User</li>
          <li>Completed Bugs</li>
        </ul>
        <li>Same for the Remaining Pages</li>
      </ul>
    </Box>
  );
};
