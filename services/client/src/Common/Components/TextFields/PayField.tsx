import { Clear } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

type ContractDefaultPayLabelProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: string;
  onClear?: () => void;
};

export const PayField: React.FC<ContractDefaultPayLabelProps> = ({
  value,
  onChange,
  onClear,
}) => {
  return (
    <Tooltip title={value} arrow>
      <TextField
        size="small"
        label="Pay Offer"
        color="secondary"
        value={value}
        onChange={onChange}
        sx={{
          maxWidth: '130px',
          '.MuiInputBase-root': {
            paddingRight: '0px', // Adjust the right padding of the root
          },
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
