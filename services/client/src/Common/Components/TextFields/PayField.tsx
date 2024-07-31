import { Clear } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

type ContractDefaultPayLabelProps = {
  label: string;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  sx?: object;
};

export const PayField: React.FC<ContractDefaultPayLabelProps> = ({
  label,
  value,
  onChange,
  onClear,
  sx,
}) => {
  return (
    <Tooltip title={value} arrow>
      <TextField
        size="small"
        label={label}
        color={value === '0' ? 'error' : 'secondary'}
        value={value}
        onChange={onChange}
        sx={{
          '.MuiInputBase-root': {
            paddingRight: '0px', // Adjust the right padding of the root
          },
          ...sx,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography color="secondary" sx={{ fontSize: '1em' }}>
                ¤
              </Typography>
            </InputAdornment>
          ),
          endAdornment: onClear && (
            <InputAdornment position="end">
              <IconButton onClick={onClear} size="small">
                <Clear color="secondary" fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};
