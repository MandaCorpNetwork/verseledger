import { useSoundEffect } from '@Audio/AudioManager';
import {
  AddCircle,
  History,
  KeyboardDoubleArrowRight,
  RequestQuote,
  Store,
} from '@mui/icons-material';
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const marketPages = [
  {
    label: 'Marketplace',
    icon: <Store color="inherit" fontSize="large" />,
    value: '/verse-market/marketplace',
  },
  {
    label: 'Open Orders',
    icon: <RequestQuote color="inherit" fontSize="large" />,
    value: '/verse-market/open-orders',
  },
  {
    label: 'Order History',
    icon: <History color="inherit" fontSize="large" />,
    value: '/verse-market/order-history',
  },
];

/**
 * ### CollapseMenu
 * @description
 * This is the menu that appears on the left side of the VerseMarket page. It contains buttons for navigating to different sections of the page.
 * #### Functional Components
 * #### Styled Components
 */
export const CollapseMenu: React.FC<unknown> = () => {
  // LOCAL STATES
  /** State that controls the expanded state of the menu. */
  const [isExpanded, setIsExpanded] = React.useState(false);

  // HOOKS
  const sound = useSoundEffect();
  const mobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // LOGIC
  /**
   *  Callback function to handle menu drawer open/close
   */
  const handleDrawerOpen = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  /**
   * Callback function to handle tab change
   * @param event - The event object
   * @param newValue - The new value of the tab

   * overwrites the URL query with the new tab value
   */
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      const currentPath = location.pathname;
      if (currentPath === newValue) {
        sound.playSound('denied');
        return;
      }
      sound.playSound('clickMain');
      navigate(newValue);
    },
    [sound, navigate, location],
  );

  const currentTab = location.pathname ?? '/verse-market/marketplace';
  return (
    <Collapse
      data-testid="VerseMarket__Sidebar"
      in={isExpanded}
      collapsedSize="50px"
      orientation="horizontal"
      sx={{
        height: '100%',
        bgcolor: 'primary.dark',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        mr: '1em',
        px: isExpanded ? '0.5em' : '0',
        position: 'relative',
        transition: 'all .3s ease-in-out',
      }}
    >
      {!mobile && (
        <IconButton
          data-testid="VerseMarket-Sidebar__Expansion_Button"
          onClick={handleDrawerOpen}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: `rotate(${isExpanded ? '180deg' : '0'})`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <KeyboardDoubleArrowRight fontSize="large" />
        </IconButton>
      )}
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: '40px',
          alignItems: isExpanded ? 'flex-start' : 'center',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {marketPages.map((item) => (
          <ListItemButton
            data-testid={`VerseMarket-Sidebar__${item.label}_Button`}
            key={item.value}
            selected={currentTab === item.value}
            onClick={(e) => handleTabChange(e, item.value)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              textAlign: 'center',
              px: '0',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <Tooltip title={item.label} placement="right">
              {item.icon}
            </Tooltip>
            {isExpanded && (
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
      {!isExpanded ? (
        <Tooltip title="Create Order" placement="right">
          <IconButton
            data-testid="VerseMarket-Sidebar__CreateOrder_Button"
            sx={{
              mx: 'auto',
              mt: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 0 : 1,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <AddCircle fontSize="large" />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          sx={{
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(0,0,0,.8)',
            opacity: isExpanded ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Create Order
        </Button>
      )}
    </Collapse>
  );
};
