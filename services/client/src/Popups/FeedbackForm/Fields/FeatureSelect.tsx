import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const features = [
  'Verse Ledger',
  'Contract Ledger',
  'Contract Page',
  'Personal Ledger',
  'Verse News',
  'Verse Market',
  'Org Ledger',
  'Popups',
  'Widgets',
  'User Settings',
  'App Bar',
];

type FeatureSelectProps = {
  required: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | undefined;
};

export const FeatureSelect: React.FC<FeatureSelectProps> = ({
  required,
  onChange,
  value,
}) => {
  return (
    <FormControl color="info" required={required}>
      <InputLabel>Feature</InputLabel>
      <Select
        size="small"
        label="Feature"
        color="info"
        required={required}
        onChange={onChange}
        value={value}
      >
        {features.map((f) => (
          <MenuItem value={f} key={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
