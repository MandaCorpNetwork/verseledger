import { ClearOutlined } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from './QueryNames';

type SearchBarProps = {
  size: 'small' | 'medium';
  label: string;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ size, label, placeholder }) => {
  const [filters, setFilters, overwriteURLQuery] = useURLQuery();

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(QueryNames.SearchQuery, event.target.value);
  };

  const handleClearSearch = () => {
    filters.delete(QueryNames.SearchQuery);
    overwriteURLQuery({ ...Object.fromEntries(filters.entries()) });
  };

  const ClearSearch: React.FC = () => {
    return (
      <IconButton onClick={handleClearSearch}>
        <ClearOutlined />
      </IconButton>
    );
  };

  const isSearchTrue = filters.has(QueryNames.SearchQuery);
  const currentSearchQuery = filters.get(QueryNames.SearchQuery);

  return (
    <Box>
      <TextField
        data-testid="SearchTool__SearchBar"
        size={size}
        color="secondary"
        label={label}
        placeholder={placeholder}
        onChange={handleSearchInput}
        value={isSearchTrue ? currentSearchQuery : ''}
        InputProps={{
          endAdornment: isSearchTrue !== false && <ClearSearch />,
        }}
      />
    </Box>
  );
};
