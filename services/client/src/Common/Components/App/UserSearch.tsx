import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import { Autocomplete, Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
//import { useAnimatedLoadingText } from '@Utils/Hooks/animatedLoadingText';
import React from 'react';

interface User {
  name: string;
  avatar: string;
}

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

  // UserList Test Fetcher for Component Build
  React.useEffect(() => {
    setLoading(true);

    if (inputValue.trim().length > 0) {
      const filteredOptions = setOptions(filteredOptions);
    } else {
      setOptions([]);
    }

    setLoading(false);
  }, [inputValue]);

  const handleInputFocus = () => {
    setInputValue(''); // Clear input value
  };

  //const loadingText = useAnimatedLoadingText();

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
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
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
                  {loading ? <LoadingWheel /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} sx={{ display: 'flex' }}>
            {option.name}
          </MenuItem>
        )}
        sx={{
          width: { width },
        }}
      />
    </Box>
  );
};
