import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

const tools = [
  'Contract Browser',
  'Filters',
  'Contract Display',
  'Radio Stations',
  'Notifications',
  'Location Explorer',
  'Contract Manager',
  'Player Card',
  'Nav Buttons',
  'Contract Bids',
  'Create Contract',
  'Feedback',
  'Other',
];

type ToolSelectProps = {
  required: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | undefined;
};

export const ToolSelect: React.FC<ToolSelectProps> = ({ required, onChange, value }) => {
  return (
    <FormControl color="info" required={required}>
      <InputLabel>Tool</InputLabel>
      <Select
        size="small"
        label="Tool"
        color="info"
        required={required}
        onChange={onChange}
        value={value}
      >
        {tools.map((f) => (
          <MenuItem value={f} key={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
