import {
  AddCircle,
  FilterAlt,
  History,
  KeyboardDoubleArrowRight,
  RequestQuote,
  Store,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import React from 'react';

export const VerseMarketPage: React.FC<unknown> = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleDrawerOpen = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedTab, setSelectedTab] = React.useState('market');
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      data-testid="VerseMarketPage"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
      }}
    >
      <Box
        data-testid="VerseMarket__Wrapper"
        sx={{
          py: '1em',
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <Collapse
          in={isExpanded}
          collapsedSize="50px"
          orientation="horizontal"
          sx={{
            height: '100%',
            backgroundColor: 'primary.dark',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            mr: '1em',
          }}
        >
          <IconButton onClick={handleDrawerOpen}>
            <KeyboardDoubleArrowRight fontSize="large" />
          </IconButton>
          <Box data-testid="VerseMarket__TabWrapper">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              orientation="vertical"
              color="secondary"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab
                value="market"
                label={isExpanded ? 'Marketplace' : null}
                icon={<Store />}
              />
              <Tab
                value="open"
                label={isExpanded ? 'Open Orders' : null}
                icon={<RequestQuote />}
              />
              <Tab
                value="history"
                label={isExpanded ? 'Order History' : null}
                icon={<History />}
              />
            </Tabs>
          </Box>
          <IconButton>
            <AddCircle fontSize="medium" />
          </IconButton>
        </Collapse>
        <Box
          data-testid="VerseMarket__MarketplaceWrapper"
          sx={{
            height: '100%',
            maxWidth: '90%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            data-testid="VerseMarket-MarketPlace__BrowserWrapper"
            sx={{
              height: '100%',
              my: '1em',
              borderTop: '3px solid',
              borderBottom: '3px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              p: '.5em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              data-testid="VerseMarket-Marketplace-Browser__SearchToolsWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              <IconButton>
                <FilterAlt fontSize="medium" />
              </IconButton>
              <Autocomplete
                renderInput={(params) => <TextField {...params} label="Search" />}
                options={testOptions}
                size="small"
                sx={{
                  minWidth: '200px',
                }}
              />
            </Box>
            <Box
              data-testid="VerseMarket-Marketplace-Browser__ItemFilterWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderRadius: '5px',
                borderColor: 'primary.main',
                mt: '1em',
                p: '1em',
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const testOptions = ['gold', 'platinum', 'diamond', 'ruby', 'emerald', 'topaz'];
