import { FormControl, InputLabel, OutlinedInput, Tooltip } from '@mui/material';

type OutlinedLabelProps = {
  size: 'small' | 'medium';
  margin: 'dense' | 'none';
  label: string;
  value: string | number;
  startAdornment?: string;
  maxWidth?: string;
};

export const OutlinedLabel: React.FC<OutlinedLabelProps> = ({
  size,
  margin,
  label,
  value,
  startAdornment,
  maxWidth,
}) => {
  const output = startAdornment ? `${startAdornment} ${value}` : `${value}`;
  return (
    <FormControl size={size}>
      <InputLabel>{label}</InputLabel>
      <Tooltip title={output} arrow>
        <OutlinedInput
          notched={true}
          label={label}
          margin={margin}
          value={output}
          readOnly
          defaultValue="None"
          inputProps={{
            sx: {
              cursor: 'default',
              width: `${String(output).length}ch`,
              maxWidth: maxWidth,
              py: '.25em',
              textAlign: 'center',
            },
          }}
        />
      </Tooltip>
    </FormControl>
  );
};
