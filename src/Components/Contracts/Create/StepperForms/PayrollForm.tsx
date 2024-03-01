import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

import { FlatRateControl } from './PayrollFormControls/FlatRateControl';
import { ParticipationPoolControl } from './PayrollFormControls/ParticipationPoolControl';
import { PoolControl } from './PayrollFormControls/PoolControl';
import { SteppedFlatRateControl } from './PayrollFormControls/SteppedFlatRateControl';
import { TimedPayControl } from './PayrollFormControls/TimedPayControl';
import { WeightedPoolControl } from './PayrollFormControls/WeightedPoolControl';
import { WeightedTimedPayControl } from './PayrollFormControls/WeightedTimedPayControl';

const formDetails = {
  FlatRate: <FlatRateControl />,
  TimedPay: <TimedPayControl />,
  Pool: <PoolControl />,
  ParticipationPool: <ParticipationPoolControl />,
  SteppedFlatRate: <SteppedFlatRateControl />,
  WeightedPool: <WeightedPoolControl />,
  WeightedTimedPay: <WeightedTimedPayControl />,
};

export const PayrollForm: React.FC = () => {
  const [selectedPayType, setSelectedPayType] = React.useState('');

  const handlePayrollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayType(event.target.value);
  };

  return (
    <Box>
      <FormLabel>Payroll Type</FormLabel>
      <FormControl>
        <RadioGroup value={selectedPayType} onChange={handlePayrollChange}>
          <FormLabel>Simple</FormLabel>
          <FormControlLabel control={<Radio />} label="FlatRate" value="FlatRate" />
          <FormControlLabel control={<Radio />} label="TimedPay" value="TimedPay" />
          <FormControlLabel control={<Radio />} label="Pool" value="Pool" />
          <FormLabel>Complex</FormLabel>
          <FormControlLabel
            control={<Radio />}
            label="Participation Pool"
            value="ParticipationPool"
          />
          <FormControlLabel
            control={<Radio />}
            label="Stepped FlatRate"
            value="SteppedFlatRate"
          />
          <FormControlLabel
            control={<Radio />}
            label="Weighted Pool"
            value="WeightedPool"
          />
          <FormControlLabel
            control={<Radio />}
            label="Weighted TimedPay"
            value="WeightedTimedPay"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Payroll Details</FormLabel>
        {selectedPayType && formDetails[selectedPayType]}
      </FormControl>
    </Box>
  );
};

/*
  PayRoll Types:
  Simple-
    FlatRate: √
      - Default Pay 
      - Allow Bargaining 
    TimedPay:
      - Default Pay
      - Payment Rate
      - Allow Bargaining
    Pool:
      - Max Percentage Available
      - Allow Bargaining
      - Expected Pay Per Contractor
  Complex-
    Participation Pool:
      - Time based percentage decides the pool percentage taken
      - Expected Pay per Contractor at Total Duration
    Stepped FlatRate:
      - FlatRates that are increased by an assigned Pay Class
      - Add Pay Class
      - Pay Class Amount
    Weighted Pool:
      - Class Name
      - Class Percentage
      - Add Class
      - Expected Pay Per Class
    Weighted TimedPay:
      - Overall Payment Rate | Class Based Rate
      - Class Name
      - Class Pay
      - Class Pay Rate
      - Add Class
  Bonuses-
    Game Provided Bonuses:
      - Game Provided Bonuses are based on shared game contracts
    Player Provided Bonuses:
      Simple:
        - Bonuses Will Show Available
        Pool:
          - Bonus Pool from -
            - Total Pool
              - Bonus Pool Percentage
              - Expected Bonus From Total
            - Independent Pool
              - Expected Bonus From Bonus Pool
      Complex:
        Participation Pool Class:
          - Adds a class system to the participation pool that allows for a bonus taken from the top of the pay with the remainder going to everyone based on participation.
        Weighted Pool:
          - Bonus Pool From
            - Total Pool
              - Bonus Pool Percentage
            - Independent Pool
              - Class Based Bonuses or Independent Bonuses
                Classes:
                  Classes That Recieve Bonuses:
                    Even Share or Weighted Share:
                      Weighted Share:
                        Percentage of pool per Class
    Expected Pay:
      Expected Total
      Expected Bonus Pool
*/
