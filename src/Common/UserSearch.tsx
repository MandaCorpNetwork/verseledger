import { Autocomplete, Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
//import { useAnimatedLoadingText } from '@Utils/Hooks/animatedLoadingText';
import React from 'react';

interface User {
  name: string;
  avatar: string;
}

interface UserSearchProps extends Pick<TextFieldProps, 'color' | 'size' | 'variant'> {
  width: string;
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

  // User Query Result Fetcher
  /*React.useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      // API Call
      //const data = await response.json();
      setOptions(data);
      setLoading(false);
    };

    // Debounce input and reduce number of calls
    const timer = setTimeout(() => {
      if (inputValue.trim() !== '') {
        fetchOptions();
      } else {
        setOptions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);
*/
  // UserList Test Fetcher for Component Build
  React.useEffect(() => {
    setLoading(true);

    if (inputValue.trim().length > 0) {
      const filteredOptions = userList.filter((user) =>
        user.name.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setOptions(filteredOptions);
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
          //loading
          //  ? loadingText :
          inputValue.trim().length > 0 ? 'No Users found' : 'Enter User'
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
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
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

const userList: User[] = [
  { name: 'Abb', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Tooba', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Net', avatar: '/static/images/avatar/3.jpg' },
  { name: 'Feul', avatar: '/static/images/avatar/4.jpg' },
  { name: 'Kool', avatar: '/static/images/avatar/5.jpg' },
  { name: 'Nrum', avatar: '/static/images/avatar/6.jpg' },
  { name: 'Trum', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Lioo', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Uii', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Ioo', avatar: '/static/images/avatar/2.jpg' },
  { name: 'ThreeCrown', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Skippa', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Snow_E', avatar: '/static/images/avatar/2.jpg' },
];
