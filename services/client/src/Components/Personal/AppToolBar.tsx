import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { Exploration } from '@Common/Definitions/CustomIcons';
import {
  Apps,
  Inventory,
  Route,
  StackedBarChart,
  TextSnippet,
} from '@mui/icons-material';
import { Box, ButtonGroup, Divider, IconButton, Tooltip } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import React, { PropsWithChildren } from 'react';

type IconButtonWithDividerProps = {
  isSelected: boolean;
  buttonProps?: IconButtonProps;
};

const IconButtonWithDivider: React.FC<PropsWithChildren<IconButtonWithDividerProps>> = ({
  children,
  isSelected,
  buttonProps,
}) => (
  <Box sx={{ display: 'flex' }}>
    <IconButton
      {...(buttonProps ?? {})}
      data-testid="PersonalLedger-AppToolBar__IconButtonWithDivider"
      sx={{
        color: isSelected ? 'secondary.main' : 'secondary.dark',
        '&:hover': { color: 'primary.light', transform: 'scale(1.2)' },
        transition: 'color 0.3s, transform 0.3s',
      }}
      size="small"
    >
      {children}
    </IconButton>
    <Divider
      orientation="vertical"
      flexItem
      sx={{ height: '24px', mt: 'auto', mb: 'auto', mx: '1em' }}
      color="#065691"
    />
  </Box>
);

type AppToolBarProps = {
  selectedApp: string;
  setSelectedApp: (iconKey: string) => void;
};

export const AppToolBar: React.FC<AppToolBarProps> = ({
  selectedApp,
  setSelectedApp,
}) => {
  const icons = [
    { key: 'Overview', icon: <Apps key="apps" fontSize="large" /> },
    { key: 'Contracts', icon: <TextSnippet key="text-snippet" fontSize="large" /> },
    { key: 'Explore', icon: <Exploration key="explore" fontSize="large" /> },
    { key: 'Tuning', icon: <StackedBarChart key="tuning" fontSize="large" /> },
    { key: 'Routes', icon: <Route key="route" fontSize="large" /> },
    { key: 'Inventory', icon: <Inventory key="inventory" fontSize="large" /> },
  ];

  return (
    <ControlPanelBox
      data-testid="PersonalLedger-AppToolBar__Wrapper"
      sx={{
        display: 'inline-block',
      }}
    >
      <ButtonGroup
        data-testid="PersonalLedger-AppToolBar__ButtonGroup"
        variant="text"
        color="secondary"
        size="large"
        aria-label="text button group"
        sx={{
          positon: 'relative',
          px: '1em',
        }}
      >
        {icons.map((item, index) =>
          index < icons.length - 1 ? (
            <Tooltip
              title={item.key}
              key={item.key}
              data-testid="PersonalLedger-AppToolBar__Tooltip"
            >
              <IconButtonWithDivider
                buttonProps={{
                  color: 'secondary',
                  onClick: () => setSelectedApp(item.key),
                }}
                isSelected={selectedApp === item.key}
              >
                {item.icon}
              </IconButtonWithDivider>
            </Tooltip>
          ) : (
            <Tooltip
              title={item.key}
              key={item.key}
              data-testid="PersonalLedger-AppToolBar__Tooltip"
            >
              <IconButton
                data-testid="PersonalLedger-AppToolBar__LastIconButton"
                color="secondary"
                sx={{
                  color: selectedApp === item.key ? 'secondary.main' : 'secondary.dark',
                  '&:hover': { color: 'primary.light', transform: 'scale(1.2)' },
                  transition: 'color 0.3s, transform 0.3s',
                }}
                onClick={() => setSelectedApp(item.key)}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ),
        )}
      </ButtonGroup>
    </ControlPanelBox>
  );
};
