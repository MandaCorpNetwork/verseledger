import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type ContractTypeFormProps = {
  formData: {
    contractType: string;
  };
  onFormChange: (field: string, value: string) => void;
};
// formData set by ContractTypeForm = contractType

export const ContractTypeForm: React.FC<ContractTypeFormProps> = ({
  formData,
  onFormChange,
}) => {
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
  // Types of Contracts

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('contractType', event.target.value);
  };
  // Handle Select Change

  return (
    <Box>
      <FormControl>
        <FormLabel
          color="secondary"
          sx={{
            fontWeight: 'bold',
            mb: '.5em',
          }}
        >
          Contract Type
        </FormLabel>
        <RadioGroup
          value={formData.contractType}
          onChange={handleSelect}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
              control={<Radio color="secondary" />}
              sx={{
                color:
                  formData.contractType === option.value
                    ? 'secondary.main'
                    : 'text.secondary',
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
