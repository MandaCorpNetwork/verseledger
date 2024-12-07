import DigiDisplay from '@CommonLegacy/Components/Boxes/DigiDisplay';
import { Box, Button, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts';
import React from 'react';

import { PatchBreakdown } from './BugCharts';

type BugStatsProps = {
  tab: string;
  count: number;
};

export const BugStatsBar: React.FC<BugStatsProps> = ({ tab, count }) => {
  const [chartTab, setChartTab] = React.useState<string>('patch');

  const handleChangeChart = React.useCallback((chart: string) => {
    setChartTab(chart);
  }, []);
  const getCountLabel = React.useCallback(() => {
    switch (tab) {
      case 'unread':
        return 'Unread Reports';
      case 'confirmed':
        return 'Confirmed Reports';
      case 'assigned':
        return 'Assigned Reports';
      case 'completed':
        return 'Completed Bugs';
      case 'ignored':
        return 'Ignored Reports';
      default:
        return;
    }
  }, [tab]);
  const countLabel = getCountLabel();
  return (
    <Box
      data-testid="AdminPage-Content-BugsPage-Stats__Wrapper"
      sx={{ p: '.5em', display: 'flex', flexDirection: 'column' }}
    >
      <Typography
        data-testid="AdminPage-Content-BugsPage-Stats__Title"
        variant="h6"
        sx={{
          pl: '.5em',
        }}
      >
        Stats
      </Typography>
      <Box
        data-testid="AdminPage-Content-BugsPage-Stats__Content_Container"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <DigiDisplay
          data-testid="AdminPage-Content-BugsPage-Stats__Content_Wrapper"
          sx={{ p: '.5em' }}
        >
          <Typography
            data-testid={`AdminPage-Content-BugPage-Stats__${tab}_countTitle`}
            sx={{ textShadow: '0 3px 6px rgb(0,0,0)', color: 'text.primary' }}
          >
            {countLabel}: {count}
          </Typography>
        </DigiDisplay>

        <DigiDisplay
          data-testid="AdminPage-Content-BugPage-Stats__ActivityGraph_Wrapper"
          sx={{ display: 'flex', height: '100%', flexDirection: 'column', px: '.5em' }}
        >
          <Typography variant="overline">Weekly Activity</Typography>
          <SparkLineChart
            data-testid="AdminPage-Content-BugPage-Stats__ActivityGraph"
            height={80}
            width={200}
            data={[1, 3, 2, 5, 8]}
            showHighlight
          />
        </DigiDisplay>
        <DigiDisplay
          data-testid="AdminPage-Content-BugPage-Stats__Version_Wrapper"
          sx={{
            px: '1em',
            height: '100%',
          }}
        >
          <Typography data-testid="AdminPage-Content-BugPage-Stats__Version_Title">
            Version: 0.1.3
          </Typography>
          <Typography data-testid="AdminPage-Content-BugPage-Stats__UpdateDate_Title">
            Last Update: 09/01/2024
          </Typography>
          <Typography data-testid="AdminPage-Content-BugPage-Stats__TotalBugCount_Title">
            Bugs Found: XXX
          </Typography>
        </DigiDisplay>
        <DigiDisplay
          data-testid="AdminPage-Content-BugPage-Stats__ActiveGraph_Container"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            height: '100%',
            px: '.5em',
          }}
        >
          <Box
            data-testid="AdminPage-Content-BugPage-Stats-ActiveGraph__Buttons_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: '100%',
            }}
          >
            <Button
              data-testid="AdminPage-Content-BugPage-Stats-ActiveGraph__PatchButton"
              variant="contained"
              size="small"
              onClick={() => handleChangeChart('patch')}
            >
              Patch View
            </Button>
            <Button
              data-testid="AdminPage-Content-BugPage-Stats-ActiveGraph__PatchButton"
              variant="contained"
              size="small"
              disabled
            >
              Assignments
            </Button>
          </Box>
          <Box
            data-testid="AdminPage-Content-BugPage-Stats-ActiveGraph__Graph_Wrapper"
            sx={{
              bgcolor: 'rgba(0,0,0,.4)',
              borderRadius: '10px',
            }}
          >
            {chartTab === 'patch' && <PatchBreakdown />}
          </Box>
        </DigiDisplay>
      </Box>
    </Box>
  );
};

// const bugReportHeartbeatData = [
//   {
//     label: 'New Reports',
//     values: [3, 5, 8, 10, 15, 4],
//   },
//   {
//     label: 'Confirmed Reports',
//     values: [1, 3, 7, 5, 3, 9],
//   },
//   {
//     label: 'Personal Assignments',
//     values: [1, 1, 3, 3, 1, 5],
//   },
//   {
//     label: 'Completed Bugs',
//     values: [0, 2, 2, 6, 3, 8],
//   },
// ];
