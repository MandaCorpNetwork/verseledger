import { Box, Button, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts';
import React from 'react';

import { PatchBreakdown } from './BugCharts';

type BugStatsProps = {
  tab: string;
};

export const BugStatsBar: React.FC<BugStatsProps> = ({ tab }) => {
  const [chartTab, setChartTab] = React.useState<string>('patch');
  return (
    <Box
      data-testid="AdminPage-Content-BugsPage-Stats__Wrapper"
      sx={{ p: '.5em', display: 'flex', flexDirection: 'column' }}
    >
      <Typography
        data-testid="AdminPage-Content-BugsPage-Stats__Title"
        variant="overline"
      >
        Stats
      </Typography>
      <Box
        data-testid="AdminPagge-Content-BugsPage-Stats__Content_Wrapper"
        sx={{ display: 'flex', flexxDirection: 'row', justifyContent: 'space-around' }}
      >
        <Typography data-testid={`AdminPage-Content-BugPage-Stats__${tab}_count`}>
          Count
        </Typography>
        <Box>
          <SparkLineChart height={100} data={[1, 3, 2, 5, 8]} showHighlight />
        </Box>
        <Box>
          <Typography>Version</Typography>
          <Typography>Patch</Typography>
          <Typography>Last Update</Typography>
          <Typography>Total Current Cycle</Typography>
        </Box>
        <Box>
          <Button>Patch View</Button>
          <Button>Assignments</Button>
          <Box
            sx={{
              bgcolor: 'rgba(0,0,0,.4)',
            }}
          >
            {chartTab === 'patch' && <PatchBreakdown />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const bugReportHeartbeatData = [
  {
    label: 'New Reports',
    values: [3, 5, 8, 10, 15, 4],
  },
  {
    label: 'Confirmed Reports',
    values: [1, 3, 7, 5, 3, 9],
  },
  {
    label: 'Personal Assignments',
    values: [1, 1, 3, 3, 1, 5],
  },
  {
    label: 'Completed Bugs',
    values: [0, 2, 2, 6, 3, 8],
  },
];
