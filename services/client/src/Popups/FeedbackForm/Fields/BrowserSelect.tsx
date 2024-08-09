import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const browsers = ['CHROME', 'FIREFOX', 'SAFARI', 'EDGE', 'OPERA'];

type BrowserSelectProps = {
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | undefined;
};

export const BrowserSelect: React.FC<BrowserSelectProps> = ({ onChange, value }) => {
  return (
    <FormControl color="info" required>
      <InputLabel>Browser</InputLabel>
      <Select
        size="small"
        label="Tool"
        color="info"
        required
        onChange={onChange}
        value={value}
      >
        {browsers.map((f) => (
          <MenuItem value={f} key={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
