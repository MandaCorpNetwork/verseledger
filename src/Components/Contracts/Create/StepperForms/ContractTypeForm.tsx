import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';

type ContractTypeFormProps = {
  typeSelect: (type: string) => void;
};
export const ContractTypeForm: React.FC<ContractTypeFormProps> = ({ typeSelect }) => {
  const options = [
    {
      label: 'Logistics',
      value: 'Logistics',
    },
    {
      label: 'Medical',
      value: 'Medical',
    },
    {
      label: 'Security',
      value: 'Security',
    },
    {
      label: 'Salvage',
      value: 'Salvage',
    },
    {
      label: 'Industry',
      value: 'Industry',
    },
    {
      label: 'Rearm Refuel Repair',
      value: 'RRR',
    },
    {
      label: 'Fleet',
      value: 'Fleet',
    },
    {
      label: 'Exploration',
      value: 'Exploration',
    },
    {
      label: 'Proxy',
      value: 'Proxy',
    },
  ];

  const [selectedType, setSelectedType] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
    typeSelect(event.target.value);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Contract Type</FormLabel>
        <RadioGroup value={selectedType} onChange={handleSelect}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
