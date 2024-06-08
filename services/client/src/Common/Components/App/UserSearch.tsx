import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import { Autocomplete, Box, debounce, MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchSearchUsers } from '@Redux/Slices/Users/Actions/fetchSearchUsers';
import React from 'react';

interface UserSearchProps extends Pick<TextFieldProps, 'color' | 'size' | 'variant'> {
  width?: string;
  onUserSelect: (selectedUser: User | null) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({
  color,
  size,
  variant,
  width,
  onUserSelect,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  // UserList Test Fetcher for Component Build
  const handleSearch = React.useCallback(
    debounce(async (searchTerm: string) => {
      setLoading(true);
      try {
        const searchResults = await dispatch(fetchSearchUsers(searchTerm)).unwrap;
        setOptions(searchResults);
      } catch (error) {
        console.error('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    }, 100),
    [dispatch],
  );

  React.useEffect(() => {
    if (inputValue.trim().length > 0) {
      handleSearch(inputValue);
      console.log(inputValue);
    } else {
      setOptions([]);
      setLoading(false);
    }
  }, [inputValue, handleSearch]);

  const handleInputFocus = () => {
    setInputValue(''); // Clear input value
    setLoading(false);
  };

  return (
    <Box>
      <Autocomplete
        data-testid="UserSearch__invite-user-autocomplete"
        onChange={(_, newValue) => {
          onUserSelect(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        noOptionsText={
          loading ? (
            <LoadingWheel />
          ) : inputValue.trim().length > 0 ? (
            'No Users found'
          ) : (
            'Enter User'
          )
        }
        autoHighlight
        getOptionLabel={(option) => option.handle}
        isOptionEqualToValue={(option, value) => option.handle === value.handle}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Users"
            variant={variant}
            size={size}
            color={color}
            onFocus={handleInputFocus}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <LoadingWheel
                      logoSize={18}
                      wheelSize={33}
                      boxSX={{ marginRight: '.5em' }}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} sx={{ display: 'flex' }}>
            {option.handle}
          </MenuItem>
        )}
        sx={{
          width: { width },
        }}
      />
    </Box>
  );
};
