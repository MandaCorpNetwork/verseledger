import { AddBox } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { PayrollItem } from '@/Components/Personal/Contracts/payrollItem';
import React from 'react';

export const PayrollCostTool: React.FC<unknown> = () => {
  const contractorPay = Object.values(testContractorPay);
  const purchases = Object.values(testPurchases);
  return (
    <Box sx={{ height: '100%' }}>
      <IconButton>
        <AddBox />
      </IconButton>
      <Box sx={{}}>
        <Typography>Contractor Pay</Typography>
        {contractorPay.map((contractor) => (
          <PayrollItem
            key={contractor.id}
            title={contractor.name}
            value={contractor.pay}
          />
        ))}
      </Box>
      <Box>
        <Typography>Purchases</Typography>
        {purchases.map((purchase) => (
          <PayrollItem key={purchase.id} title={purchase.name} value={purchase.amount} />
        ))}
      </Box>
    </Box>
  );
};

const testContractorPay = {
  contractor1: {
    id: 1,
    name: 'Contractor 1',
    pay: 100000,
  },
  contractor2: {
    id: 2,
    name: 'Contractor 2',
    pay: 100000,
  },
  contractor3: {
    id: 3,
    name: 'Contractor 3',
    pay: 100000,
  },
};

const testPurchases = {
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
