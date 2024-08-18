import {
  AddCircle,
  History,
  KeyboardDoubleArrowRight,
  RequestQuote,
  Store,
} from '@mui/icons-material';
import { Collapse, IconButton, List, ListItemButton, ListItemText } from '@mui/material';

type CollapseMenuProps = {
  isExpanded: boolean;
  handleDrawerOpen: () => void;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  selectedTab: string;
};

export const CollapseMenu: React.FC<CollapseMenuProps> = ({
  isExpanded,
  handleDrawerOpen,
  handleTabChange,
  selectedTab,
}) => {
  return (
    <Collapse
      data-testid="VerseMarket__Sidebar"
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
      <IconButton
        data-testid="VerseMarket-Sidebar__Expansion_Button"
        onClick={handleDrawerOpen}
      >
        <KeyboardDoubleArrowRight fontSize="large" />
      </IconButton>
      <List>
        {[
          {
            label: 'Marketplace',
            icon: <Store color="inherit" fontSize="large" />,
            value: 'market',
          },
          {
            label: 'Open Orders',
            icon: <RequestQuote color="inherit" fontSize="large" />,
            value: 'orders',
          },
          {
            label: 'Order History',
            icon: <History color="inherit" fontSize="large" />,
            value: 'history',
          },
        ].map((item) => (
          <ListItemButton
            key={item.value}
            selected={selectedTab === item.value}
            onClick={(e) => handleTabChange(e, item.value)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {item.icon}
            {isExpanded && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
      <IconButton>
        <AddCircle fontSize="large" />
      </IconButton>
    </Collapse>
  );
};
