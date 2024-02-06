import {
  AccessTime,
  AutoAwesomeMotion,
  Group,
  SatelliteAlt,
  StarBorder,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export const ContractLedgerTableTools: React.FC<unknown> = () => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  //Sort By Dropdown

  const AccessTimeFilterMenuItems = [
    { title: 'All' },
    { title: '>10 Minutes' },
    { title: '10-30 Minutes' },
    { title: '30-60 Minutes' },
    { title: '1-5 Hours' },
    { title: '5-12 Hours' },
    { title: '12-24 Hours' },
    { title: '24+ Hours' },
  ];
  const [anchorE1, setAnchorE1] = useState(null);
  const [checked, setChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const handleClick = (e: { currentTarget: React.SetStateAction<null> }) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nativeOnChange = (e: {
    target: {
      selectedIndex: number;
      dispatchEvent: (arg0: CustomEvent<{ selectedIndex: unknown }>) => void;
    };
  }) => {
    const detail = {
      selectedIndex: e.target.selectedIndex,
    };
    e.target.selectedIndex = 0;

    e.target.dispatchEvent(new CustomEvent('itemClick', { detail }));
  };

  const handleItemClick = (title: string) => {
    const updatedChecked = toggleItem(title);
    setChecked(updatedChecked);
  };

  const toggleItem = (title: string) => {
    const currentIndex = checked.indexOf(title);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(title);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(checked);
  };

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);

    if (selectAll) {
      setChecked(allTitles);
    } else {
      setChecked([]);
    }
  };

  return (
    <Box>
      <Box>
        <h4>SearchBar</h4>

        <TextField
          id="Contract-Table-SearchBar"
          label="Search Contracts"
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginTop: '1.5em' }}>
        <h4>Filter Buttons</h4>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <AutoAwesomeMotion sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
        <IconButton sx={{ color: 'text.primary' }}>
          <AccessTime
            onClick={handleClick}
            sx={{ color: 'secondary.main', width: '55px' }}
          />
          <Menu
            id="test-menu"
            anchorE1={anchorE1}
            keepMounted
            open={Boolean(anchorE1)}
            onClose={handleClose}
            MenuListProps={{
              sx: { backgroundColor: 'primary.main' },
            }}
          >
            {AccessTimeFilterMenuItems.map((item) => (
              <MenuItem
                key={item.title}
                value={item.title}
                onClick={() => handleItemClick(item.title)}
              >
                <Checkbox />
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <Group sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <Typography sx={{ color: 'secondary.main', fontSize: '1.5em' }}>¤</Typography>
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <SatelliteAlt sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <StarBorder sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: '1.5em' }}>
        <h4>SortBy Drop Down</h4>
        <FormControl>
          <InputLabel id="Contract-Table-Sort-By">Sort By</InputLabel>
          <Select
            label="Sort By"
            variant="outlined"
            value={sortBy}
            onChange={handleSort}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: { backgroundColor: 'primary.main' },
                },
              },
            }}
            sx={{ color: 'text.secondary', width: '15em' }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="pay">Pay</MenuItem>
            <MenuItem value="contract-title">Contract Title</MenuItem>
            <MenuItem value="bid-status">Bid Status</MenuItem>
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="time-left">Time Left</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
