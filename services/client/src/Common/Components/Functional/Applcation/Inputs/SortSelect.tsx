import { useSoundEffect } from '@Audio/AudioManager';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { sortGroupMap } from '@Common/Definitions/Search/SortOptions';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  SvgIcon,
  TextField,
} from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { useCallback, useMemo } from 'react';

type Options = {
  value: string;
  label: string;
};

type SortSelectProps = {
  optionsKey?: string;
  options?: Options[];
};

/**
 * @description Modular Sorting Select Component that either utilizes the objects of SortGroupsMap or a passed Options array. Using the SortGroupMap allows the component to sync with the Modular sorting system properly.
 * ___
 * TODO:
 * Properly style the component and extend it's styles and layout
 */
export const SortSelect: React.FC<SortSelectProps> = ({ optionsKey, options }) => {
  const sound = useSoundEffect();
  const { searchParams, setFilters } = useURLQuery();

  const getOptions = useCallback(() => {
    if (optionsKey) {
      return sortGroupMap[optionsKey] ?? ([] as Options[]);
    }
    return options ?? ([] as Options[]);
  }, [options, optionsKey]);

  const optionsList = getOptions();

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      sound.playSound('clickMain');
      setFilters(QueryNames.SortBy, e.target.value);
      const hasSortFilter = searchParams.has(QueryNames.SortBy);
      if (!hasSortFilter) {
        setFilters(QueryNames.SortDirection, []);
      }
      if (!searchParams.has(QueryNames.SortDirection) && hasSortFilter) {
        setFilters(QueryNames.SortDirection, 'desc');
      }
    },
    [searchParams, setFilters, sound],
  );

  const handleSwitchDirection = useCallback(() => {
    const currentDirection = searchParams.get(QueryNames.SortDirection);
    sound.playSound('clickMain');
    if (currentDirection === 'desc') {
      setFilters(QueryNames.SortDirection, 'asc');
    } else {
      setFilters(QueryNames.SortDirection, 'desc');
    }
  }, [searchParams, setFilters, sound]);

  const DirectionButton = useMemo(() => {
    const SortIcon =
      searchParams.get(QueryNames.SortDirection) === 'desc'
        ? KeyboardDoubleArrowDown
        : KeyboardDoubleArrowUp;
    return (
      <IconButton sx={{ minHeight: '100%' }} size="small" onClick={handleSwitchDirection}>
        <SvgIcon component={SortIcon} />
      </IconButton>
    );
  }, [handleSwitchDirection, searchParams]);

  return (
    <TextField
      select
      label="Sort"
      value={searchParams.get(QueryNames.SortBy)}
      onChange={handleSelect}
      slotProps={{
        select: {
          startAdornment: searchParams.has(QueryNames.SortDirection) && (
            <InputAdornment position="start">{DirectionButton}</InputAdornment>
          ),
          sx: {
            padding: '0',
          },
        },
      }}
      sx={{
        minWidth: '100px',
      }}
    >
      <MenuItem value={[]}>
        <ListItemText primary="None" />
      </MenuItem>
      {optionsList.map((sort) => (
        <MenuItem key={sort.value} value={sort.value}>
          <ListItemText primary={sort.label} />
        </MenuItem>
      ))}
    </TextField>
  );
};
