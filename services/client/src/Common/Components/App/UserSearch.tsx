import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import {
  Autocomplete,
  Avatar,
  Box,
  debounce,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { useAppDispatch } from '@Redux/hooks';
import { fetchSearchUsers } from '@Redux/Slices/Users/Actions/fetchSearchUsers';
import React from 'react';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

interface UserSearchProps extends Pick<TextFieldProps, 'color' | 'size' | 'variant'> {
  width?: string;
  onUserSelect: (selectedUser: IUser | null) => void;
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
    async (searchTerm: string) => {
      setLoading(true);
      try {
        const searchResults = await dispatch(fetchSearchUsers(searchTerm)).unwrap();
        setOptions(searchResults);
      } catch (error) {
        console.error('Error fetching users', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (inputValue.trim().length > 0) {
      debounce(() => handleSearch(inputValue), 300)();
    } else {
      setOptions([]);
      setLoading(false);
    }
  }, [handleSearch, inputValue]);

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
          setLoading(true);
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
            <Avatar src={option.pfp} sx={{ width: 25, height: 25, mr: '.5em' }} />
            <Tooltip title={option.handle}>
              <Typography variant="body2" noWrap>{`@${option.handle}`}</Typography>
            </Tooltip>
          </MenuItem>
        )}
        sx={{
          width: { width },
        }}
      />
    </Box>
  );
};
