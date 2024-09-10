import { TextField, Tooltip } from '@mui/material';

type TimeFieldProps = {
  label: string;
  sx?: object;
};

export const ReadOnlyField: React.FC<TimeFieldProps> = ({ label, sx }) => {
  return (
    <Tooltip title={label} arrow>
      <TextField
        label={label}
        size="small"
        InputProps={{ readOnly: true }}
        value={label}
        sx={{ width: '10em', margin: '.5em', ...sx }}
      />
    </Tooltip>
  );
};
