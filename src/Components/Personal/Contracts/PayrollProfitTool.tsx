import { AddBox } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

import { PayrollItem } from '@/Components/Personal/Contracts/payrollItem';

export const PayrollProfitTool: React.FC<unknown> = () => {
  const sales = Object.values(testSales);
  const payments = Object.values(testPayments);
  return (
    <Box sx={{ height: '100%' }}>
      <IconButton>
        <AddBox />
      </IconButton>
      <Box sx={{}}>
        <Typography>Sales</Typography>
        {sales.map((sale) => (
          <PayrollItem key={sale.id} title={sale.name} value={sale.pay} />
        ))}
      </Box>
      <Box>
        <Typography>Payments</Typography>
        {payments.map((payment) => (
          <PayrollItem key={payment.id} title={payment.name} value={payment.amount} />
        ))}
      </Box>
    </Box>
  );
};

const testSales = {
  contractor1: {
    id: 1,
    name: 'Sale 1',
    pay: 100000,
  },
  contractor2: {
    id: 2,
    name: 'Sale 2',
    pay: 100000,
  },
  contractor3: {
    id: 3,
    name: 'Sale 3',
    pay: 100000,
  },
};

const testPayments = {
  payment1: {
    id: 1,
    name: 'Payment 1',
    amount: 100000,
  },
  payment2: {
    id: 2,
    name: 'Payment 2',
    amount: 100000,
  },
  payment3: {
    id: 3,
    name: 'Payment 3',
    amount: 100000,
  },
};
