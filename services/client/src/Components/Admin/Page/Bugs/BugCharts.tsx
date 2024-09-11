import { Paper } from '@mui/material';
import { BarChart, HighlightScope } from '@mui/x-charts';

export const PatchBreakdown: React.FC = () => {
  const data = [
    {
      group: 'Open Bugs',
      unread: bugReportStatus.unread,
      confirmed: bugReportStatus.confirmed,
      ignored: bugReportStatus.ignored,
      completedOpen: bugReportStatus.completed,
      totalOpen:
        bugReportStatus.unread +
        bugReportStatus.confirmed +
        bugReportStatus.ignored +
        bugReportStatus.completed,
    },
    {
      group: 'Current Confirmed',
      total: bugReportStatus.confirmed,
      completed: bugReportStatus.completed,
      assigned:
        bugReportStatus.crownAssigned +
        bugReportStatus.snowAssigned +
        bugReportStatus.retroAssigned,
      unassigned:
        bugReportStatus.confirmed +
        bugReportStatus.completed -
        (bugReportStatus.crownAssigned +
          bugReportStatus.snowAssigned +
          bugReportStatus.retroAssigned),
    },
  ];
  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'group' }]}
      series={[
        { dataKey: 'unread', stack: 'unread', label: 'Unread' },
        { dataKey: 'confirmed', stack: 'confirmed', label: 'Confirmed' },
        { dataKey: 'completedOpen', stack: 'completed', label: 'Completed' },
        { dataKey: 'ignored', stack: 'ignored', label: 'Ignored' },
        { dataKey: 'total', stack: 'completedConfirmed', label: 'Total' },
        { dataKey: 'completed', stack: 'completedConfirmed', label: 'Completed' },
        { dataKey: 'assigned', stack: 'assigned', label: 'Assigned' },
        { dataKey: 'unassigned', stack: 'assigned', label: 'Unassigned' },
      ]}
      width={400}
      height={200}
      slotProps={{
        legend: { hidden: true },
      }}
      tooltip={{
        itemContent: CustomTooltipContent,
        trigger: 'axis',
      }}
    />
  );
};

const CustomTooltipContent: React.FC = (props) => {
  const { itemData, series } = props;
  const relevantDataKeys: Record<string, string[]> = {
    'Open Bugs': ['unread', 'confirmed', 'ignored', 'completedOpen'],
    'Current Confirmed': ['total', 'completed', 'assigned', 'unassigned'],
  };
  const hoveredGroup = itemData.value;
  const keys = relevantDataKeys[hoveredGroup] || [];

  return (
    <Paper sx={{ p: '1em' }}>
      <p>Group: {hoveredGroup}</p>
      {keys.map((key, idx) => {
        const seriesItem = series.find((s) => s.label === key);
        if (seriesItem) {
          return (
            <p key={idx}>
              {key}: {seriesItem.data[itemData.dataIndex]}
            </p>
          );
        }
        return null;
      })}
    </Paper>
  );
};

const bugReportStatus = {
  unread: 6,
  confirmed: 5,
  ignored: 25,
  completed: 17,
  crownAssigned: 2,
  crownRead: 35,
  crownCompleted: 8,
  snowAssigned: 2,
  snowRead: 10,
  snowCompleted: 7,
  retroAssigned: 1,
  retroRead: 2,
  retroCompleted: 2,
};
