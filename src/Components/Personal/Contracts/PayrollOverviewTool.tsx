import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import React from 'react';

export const PayrollOverviewTool: React.FC<unknown> = () => {
  return (
    <Box>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
        series={[{ data: [1, 2, 3, 4, 5, 6] }]}
        width={300}
        height={250}
      />
    </Box>
  );
};
