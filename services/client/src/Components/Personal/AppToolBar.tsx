import { Apps, Explore, TextSnippet } from '@mui/icons-material';
import { Box, ButtonGroup, Divider, IconButton, Tooltip } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import React from 'react';

interface IconButtonWithDividerProps extends IconButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
}

const IconButtonWithDivider: React.FC<IconButtonWithDividerProps> = ({
  children,
  isSelected,
  ...props
}) => (
  <>
    <IconButton
      {...props}
      data-testid="PersonalLedger-AppToolBar__IconButtonWithDivider"
      sx={{
        color: isSelected ? 'secondary.main' : 'secondary.dark',
        '&:hover': { color: 'secondary.light', transform: 'scale(1.2)' },
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
  </>
);

type AppToolBarProps = {
  selectedApp: string;
  setSelectedApp: React.Dispatch<React.SetStateAction<string>>;
};

export const AppToolBar: React.FC<AppToolBarProps> = ({
  selectedApp,
  setSelectedApp,
}) => {
  const icons = [
    { key: 'Overview', icon: <Apps key="apps" fontSize="large" /> },
    { key: 'Contracts', icon: <TextSnippet key="text-snippet" fontSize="large" /> },
    { key: 'Explore', icon: <Explore key="explore" fontSize="large" /> },
  ];

  const handleAppChange = (iconKey: string) => {
    if (selectedApp === iconKey) return;
    setSelectedApp(iconKey);
  };

  return (
    <Box
      data-testid="PersonalLedger-AppToolBar__Wrapper"
      sx={{
        position: 'relative',
        display: 'inline-block',
        borderRadius: '5px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px 4px rgba(24,252,252, 0.25)',
        '&:hover': {
          boxShadow: '0 2px 10px 4px rgba(14,49,243,0.45)',
        },
        transition: 'box-shadow 0.3s',
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
          borderLeft: '2px solid',
          borderRight: '2px solid',
          borderRadius: '5px',
          borderColor: 'secondary.main',
          px: '1em',
          backgroundImage:
            'linear-gradient(135deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',

          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '5px 5px',
            opacity: 0.5,
          },
          '&:hover': {
            backgroundImage:
              'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
            borderColor: 'secondary.light',
          },
          transition: 'background-image 0.3s, border-color 0.3s',
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
                color="secondary"
                key={item.key}
                isSelected={selectedApp === item.key}
                onClick={() => handleAppChange(item.key)}
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
                key={item.key}
                sx={{
                  color: selectedApp === item.key ? 'secondary.main' : 'secondary.dark',
                  '&:hover': { color: 'secondary.light', transform: 'scale(1.2)' },
                  transition: 'color 0.3s, transform 0.3s',
                }}
                onClick={() => handleAppChange(item.key)}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ),
        )}
      </ButtonGroup>
    </Box>
  );
};
