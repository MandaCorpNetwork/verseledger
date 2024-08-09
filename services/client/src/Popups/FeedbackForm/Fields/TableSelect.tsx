import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const tables = ['Contracts', 'Users', 'Locations', 'Notifications', 'Organizations'];

type TableSelectProps = {
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | undefined;
};

export const TableSelect: React.FC<TableSelectProps> = ({ onChange, value }) => {
  return (
    <FormControl color="info">
      <InputLabel>Table</InputLabel>
      <Select
        size="small"
        label="Table"
        color="info"
        required
        onChange={onChange}
        value={value}
      >
        {tables.map((f) => (
          <MenuItem value={f} key={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
