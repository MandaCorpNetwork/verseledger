import { Paper, Typography } from '@mui/material';
import {
  BarChart,
  ChartsAxisContentProps,
  ChartsTooltipCell,
  ChartsTooltipMark,
  ChartsTooltipRow,
} from '@mui/x-charts';
//TODO: Work on the Padding for the Band to ensure spacing is correct on smaller scale
//TODO: Work on Developer Contribution BreakdownChart
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
        {
          dataKey: 'unread',
          stack: 'unread',
          label: 'Unread',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(255,0,0)',
        },
        {
          dataKey: 'confirmed',
          stack: 'confirmed',
          label: 'Confirmed',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(255,141,15)',
        },
        {
          dataKey: 'completedOpen',
          stack: 'completed',
          label: 'Completed',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(8,201,11)',
        },
        {
          dataKey: 'ignored',
          stack: 'ignored',
          label: 'Ignored',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(100,100,100)',
        },
        {
          dataKey: 'total',
          stack: 'completedConfirmed',
          label: 'Total',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(8,125,11)',
        },
        {
          dataKey: 'completed',
          stack: 'completedConfirmed',
          label: 'Completed',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(8, 201, 11)',
        },
        {
          dataKey: 'assigned',
          stack: 'assigned',
          label: 'Assigned',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(33, 150, 243)',
        },
        {
          dataKey: 'unassigned',
          stack: 'assigned',
          label: 'Unassigned',
          highlightScope: {
            highlight: 'item',
          },
          color: 'rgb(14,49,180)',
        },
      ]}
      width={400}
      height={100}
      slotProps={{
        legend: { hidden: true },
      }}
      tooltip={{
        axisContent: CustomTooltipContent,
        trigger: 'axis',
      }}
    />
  );
};

const CustomTooltipContent: React.FC<ChartsAxisContentProps> = (props) => {
  const { axisValue, series } = props;
  const relevantDataKeys: Record<string, number[]> = {
    'Open Bugs': [0, 1, 2, 3],
    'Current Confirmed': [4, 5, 6, 7],
  };
  const relevantIndicies = relevantDataKeys[axisValue as string] || [];
  return (
    <Paper sx={{ px: '1em' }}>
      <p>{axisValue !== null ? axisValue.toString() : 'No data'}</p>
      {relevantIndicies.map((index) => {
        const item = series[index] as unknown as {
          label: string;
          getColor: () => string;
          data: number[];
        };
        return (
          // <p key={index}>{series[index].label}</p>
          <ChartsTooltipRow key={index}>
            <ChartsTooltipCell>
              <ChartsTooltipMark color={item.getColor()} />
            </ChartsTooltipCell>
            <ChartsTooltipCell>
              <Typography>{`${item.label}:`}</Typography>
            </ChartsTooltipCell>
            <ChartsTooltipCell>
              <Typography>{item.data[0]}</Typography>
            </ChartsTooltipCell>
          </ChartsTooltipRow>
        );
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
