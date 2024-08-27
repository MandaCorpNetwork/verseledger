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
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { isMobile } from '@Utils/isMobile';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

/**
 * ### CollapseMenu
 * @description
 * This is the menu that appears on the left side of the VerseMarket page. It contains buttons for navigating to different sections of the page.
 * @version 0.1.0
 * @returns {React.FC}
 * #### Functional Components
 * #### Styled Components
 * @author ThreeCrown - Aug 2024
 */
export const CollapseMenu: React.FC<unknown> = () => {
  // LOCAL STATES
  /** State that controls the expanded state of the menu. */
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [filters, , overwriteFilters] = useURLQuery();

  // HOOKS
  const { playSound } = useSoundEffect();
  const mobile = isMobile();

  // LOGIC
  /**
   * @function handleDrawerOpen -  Callback function to handle menu drawer open/close
   */
  const handleDrawerOpen = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  /**
   * @function handleTabChange - Callback function to handle tab change
   * @param {React.SyntheticEvent} event - The event object
   * @param {string} newValue - The new value of the tab
   * @returns {void}
   * overwrites the URL query with the new tab value
   */
  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      if (filters.get(QueryNames.VerseMarketTab) === newValue) {
        playSound('denied');
        return;
      }
      playSound('clickMain');
      overwriteFilters({
        [QueryNames.VerseMarketTab]: newValue,
      });
    },
    [playSound, overwriteFilters],
  );

  const currentTab = filters.get(QueryNames.VerseMarketTab) ?? 'market';
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
