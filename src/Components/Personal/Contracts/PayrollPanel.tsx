import { Box, Button, ButtonGroup } from '@mui/material';
import React from 'react';

import { PayrollCostTool } from '@/Components/Personal/Contracts/PayrollCostTool';
import { PayrollOverviewTool } from '@/Components/Personal/Contracts/PayrollOverviewTool';
import { PayrollProfitTool } from '@/Components/Personal/Contracts/PayrollProfitTool';

export const PayrollPanel: React.FC<unknown> = () => {
  const [selectedPayrollTool, setSelectedPayrollTool] =
    React.useState<string>('Overview');

  const handleToolSwitch = (event: React.SyntheticEvent) => {
    const toolName = event.target.value;
    setSelectedPayrollTool(toolName);
    console.log(toolName);
  };

  const renderSelectedTool = () => {
    switch (selectedPayrollTool) {
      case 'Overview':
        return <PayrollOverviewTool />;
      case 'Cost':
        return <PayrollCostTool />;
      case 'Profit':
        return <PayrollProfitTool />;
      default:
        return <PayrollOverviewTool />;
    }
  };

  return (
    <Box sx={{ height: '100%' }}>
      <ButtonGroup variant="contained" size="small">
        <Button onClick={handleToolSwitch} value="Overview">
          Overview
        </Button>
        <Button onClick={handleToolSwitch} value="Cost">
          Cost
        </Button>
        <Button onClick={handleToolSwitch} value="Profit">
          Profit
        </Button>
      </ButtonGroup>
      <Box
        sx={{
          height: '95%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
            borderRadius: '15px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '15px',
            background: 'rgb(121, 192, 244, .5)',
          },
        }}
      >
        {renderSelectedTool()}
      </Box>
    </Box>
  );
};
