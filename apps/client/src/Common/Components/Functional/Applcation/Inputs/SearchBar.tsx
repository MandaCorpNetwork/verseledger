import { useSoundEffect } from '@Audio/AudioManager';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Clear, type SvgIconComponent } from '@mui/icons-material';
import { debounce, IconButton, SvgIcon, type SxProps, TextField } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

type SearchBarProps = {
  /** Label of the TextField */
  label?: string;
  /** Placeholder String */
  placeholder?: string;
  /** Overwrite Function for Overwrite */
  onChange?: (value: string) => void;
  disabled?: boolean;
  /** Textfield Style Overwrite */
  sx?: SxProps<Theme>;
  'data-testid'?: string;
  /** Slot Props Overwrite of component */
  slotProps?: {
    clear?: {
      button?: {
        sx?: SxProps<Theme>;
      };
      icon?: {
        svg?: SvgIconComponent;
        sx?: SxProps<Theme>;
      };
    };
  };
};

/**
 * @description Modular Search Bar.
 * The OnChange will set the SearchQuery Filter searchParams but can be overwritten.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  label = 'Search Bar',
  placeholder,
  onChange,
  disabled,
  sx,
  slotProps,
  'data-testid': testid = 'Filter',
}) => {
  const [value, setValue] = useState<string>('');
  const { setFilters } = useURLQuery();
  const sound = useSoundEffect();
  const themeExtend = useDynamicTheme();

  const layout = useMemo(() => {
    const searchBar = themeExtend.layout('Global.SearchBar');
    const clearButton = themeExtend.layout('Global.SearchClearButton');
    const clearIcon = themeExtend.layout('Global.SearchClearIcon');

    return { searchBar, clearButton, clearIcon };
  }, [themeExtend]);

  const ClearIcon = useMemo(() => {
    return slotProps?.clear?.icon?.svg ?? Clear;
  }, [slotProps?.clear?.icon?.svg]);

  const handleFilters = useCallback(
    (value: string) => {
      setFilters(QueryNames.SearchQuery, value);
    },
    [setFilters],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debounce(() => {
        if (onChange) {
          onChange(value);
        } else {
          handleFilters(value);
        }
      }, 300);
    },
    [handleFilters, onChange, value],
  );

  const handleClear = useCallback(() => {
    sound.playSound('warning');
    setValue('');
  }, [sound]);

  const styleOverride = {
    ...layout.searchBar,
    ...sx,
  };

  const clearButtonStyleOverride = {
    ...layout.clearButton,
    ...slotProps?.clear?.button?.sx,
  };

  const clearIconStyleOverride = {
    ...layout.clearIcon,
    ...slotProps?.clear?.icon?.sx,
  };

  return (
    <TextField
      aria-label={label}
      data-testid={`${testid}__SearchBar`}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      label={label}
      slotProps={{
        input: {
          endAdornment: value && (
            <IconButton
              aria-label={`${label} Clear Button`}
              data-testid={`${testid}-SearchBar__Clear_Button`}
              onClick={handleClear}
              disabled={disabled}
              color="warning"
              sx={{
                ...clearButtonStyleOverride,
              }}
            >
              <SvgIcon
                component={ClearIcon}
                data-testid={`${testid}-SearchBar__Clear_Icon`}
                sx={{
                  color: value ? 'warning.main' : 'warning.dark',
                  ...clearIconStyleOverride,
                }}
              />
            </IconButton>
          ),
        },
      }}
      sx={{
        ...styleOverride,
      }}
    />
  );
};
