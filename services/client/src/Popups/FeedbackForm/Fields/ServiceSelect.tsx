import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

const services = [
  'Contracts',
  'Auth',
  'Pally',
  'User',
  'RSI',
  'Stomp',
  'Resource Editor',
];

type ServiceSelectProps = {
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | undefined;
};

export const ServiceSelect: React.FC<ServiceSelectProps> = ({ onChange, value }) => {
  return (
    <FormControl color="info">
      <InputLabel>Service</InputLabel>
      <Select
        size="small"
        label="Service"
        color="info"
        required
        onChange={onChange}
        value={value}
      >
        {services.map((f) => (
          <MenuItem value={f} key={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
