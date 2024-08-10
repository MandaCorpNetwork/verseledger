import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const concern = ['FrontEnd', 'BackEnd', 'Both'];

type ConcernSelectProps = {
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | undefined;
};

export const ConcernSelect: React.FC<ConcernSelectProps> = ({ onChange, value }) => {
  return (
    <FormControl color="info" required>
      <InputLabel>Concern</InputLabel>
      <Select
        size="small"
        label="Concern"
        color="info"
        required
        onChange={onChange}
        value={value}
      >
        {concern.map((f) => (
          <MenuItem value={f} key={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
