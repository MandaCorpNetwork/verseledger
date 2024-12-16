import { Clear } from '@mui/icons-material';
import { InputAdornment, type SxProps, TextField, Typography } from '@mui/material';
import { type Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import React from 'react';

type CurrencyInputProps = {
  label: string;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  defaultValue?: string;
  sx?: SxProps<Theme>;
};

/**
 * @description
 * Input Field for Currency
 * ___
 * TODO:
 * - Fix Styling of the End Adornment Icon
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
  onClear,
  onBlur,
  error,
  defaultValue,
  sx,
}) => {
  const themeExtend = useDynamicTheme();

  const layout = React.useMemo(() => {
    const suffix = themeExtend.layout('CurrencyInput.Suffix');
    const input = themeExtend.layout('CurrencyInput.Input');

    return { suffix, input };
  }, [themeExtend]);

  const CurrencySuffix = React.useMemo(() => {
    return <Typography sx={{ color: 'secondary.main', ...layout.suffix }}>¤</Typography>;
  }, [layout.suffix]);

  const inputOverwrites = {
    ...layout.input,
    ...sx,
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      defaultValue={defaultValue}
      sx={{
        '.MuiInputBase-root': {
          paddingRight: '0px',
        },
        ...inputOverwrites,
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">{CurrencySuffix}</InputAdornment>
          ),
          endAdornment: onClear && (
            <InputAdornment position="end" onClick={onClear}>
              <Clear fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
