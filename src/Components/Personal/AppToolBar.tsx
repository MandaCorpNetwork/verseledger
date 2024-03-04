import {
  Apps,
  Diamond,
  Rocket,
  RocketLaunch,
  TextSnippet,
  Widgets,
} from '@mui/icons-material';
import { ButtonGroup, Divider, IconButton } from '@mui/material';
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
      sx={{ color: isSelected ? 'secondary.main' : 'secondary.dark' }}
    >
      {children}
    </IconButton>
    <Divider
      orientation="vertical"
      flexItem
      sx={{ height: '24px', mt: 'auto', mb: 'auto' }}
      color="#065691"
    />
  </>
);

export const AppToolBar: React.FC<unknown> = () => {
  const [selectedTool, setSelectedTool] = React.useState<string>('overview');

  const icons = [
    { key: 'overview', icon: <Apps key="apps" fontSize="large" /> },
    { key: 'contracts', icon: <TextSnippet key="text-snippet" fontSize="large" /> },
    { key: 'shipmanage', icon: <Rocket key="rocket" fontSize="large" /> },
    { key: 'fleetmanage', icon: <RocketLaunch key="rocket-launch" fontSize="large" /> },
    { key: 'logistics', icon: <Widgets key="widgets" fontSize="large" /> },
    { key: 'mining', icon: <Diamond key="diamond" fontSize="large" /> },
  ];

  const handleToolChange = (iconKey: string) => {
    if (selectedTool === iconKey) return;
    setSelectedTool(iconKey);
  };

  return (
    <ButtonGroup
      variant="text"
      color="secondary"
      size="large"
      aria-label="text button group"
      sx={{}}
    >
      {icons.map((item, index) =>
        index < icons.length - 1 ? (
          <IconButtonWithDivider
            color="secondary"
            key={item.key}
            isSelected={selectedTool === item.key}
            onClick={() => handleToolChange(item.key)}
          >
            {item.icon}
          </IconButtonWithDivider>
        ) : (
          <IconButton
            color="secondary"
            key={item.key}
            sx={{
              color: selectedTool === item.key ? 'secondary.main' : 'secondary.dark',
            }}
            onClick={() => handleToolChange(item.key)}
          >
            {item.icon}
          </IconButton>
        ),
      )}
    </ButtonGroup>
  );
};
