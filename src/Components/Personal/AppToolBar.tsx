import {
  Apps,
  Diamond,
  Explore,
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
    { key: 'Shipmanage', icon: <Rocket key="rocket" fontSize="large" /> },
    { key: 'Fleetmanage', icon: <RocketLaunch key="rocket-launch" fontSize="large" /> },
    { key: 'Explore', icon: <Explore key="explore" fontSize="large" /> },
    { key: 'Logistics', icon: <Widgets key="widgets" fontSize="large" /> },
    { key: 'Mining', icon: <Diamond key="diamond" fontSize="large" /> },
  ];

  const handleAppChange = (iconKey: string) => {
    if (selectedApp === iconKey) return;
    setSelectedApp(iconKey);
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
            isSelected={selectedApp === item.key}
            onClick={() => handleAppChange(item.key)}
          >
            {item.icon}
          </IconButtonWithDivider>
        ) : (
          <IconButton
            color="secondary"
            key={item.key}
            sx={{
              color: selectedApp === item.key ? 'secondary.main' : 'secondary.dark',
            }}
            onClick={() => handleAppChange(item.key)}
          >
            {item.icon}
          </IconButton>
        ),
      )}
    </ButtonGroup>
  );
};
