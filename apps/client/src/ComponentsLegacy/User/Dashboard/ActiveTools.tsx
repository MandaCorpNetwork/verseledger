import { Diamond, Storefront, TextSnippet, Widgets } from '@mui/icons-material';
import { Badge, Box, IconButton } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';
import type React from 'react';
import { useState } from 'react';

interface ActiveToolOverviewIconProps extends IconButtonProps {
  icon: React.ReactNode;
  inUse?: boolean;
  badgeContent?: number;
}

interface BadgeCounts {
  contracts: number;
  logistics: number;
  mining: number;
  marketorder: number;
}

const ActiveToolOverviewIcon: React.FC<ActiveToolOverviewIconProps> = ({
  icon,
  badgeContent,
  ...props
}) => {
  const isDisabled = badgeContent == 0;
  return (
    <Badge
      badgeContent={badgeContent}
      color="error"
      overlap="circular"
      hidden={isDisabled}
    >
      <IconButton {...props} color="secondary" size="small" disabled={isDisabled}>
        {icon}
      </IconButton>
    </Badge>
  );
};

export const ActiveToolsOverview: React.FC<unknown> = () => {
  const [badgeCounts, _setBadgeCounts] = useState<BadgeCounts>({
    contracts: 2,
    logistics: 5,
    mining: 3,
    marketorder: 0,
  });
  const icons: { id: keyof BadgeCounts; icon: React.ReactNode; label: string }[] = [
    { id: 'contracts', icon: <TextSnippet fontSize="large" />, label: 'Contracts' },
    { id: 'logistics', icon: <Widgets fontSize="large" />, label: 'Logistics' },
    { id: 'mining', icon: <Diamond fontSize="large" />, label: 'Mining' },
    { id: 'marketorder', icon: <Storefront fontSize="large" />, label: 'Market Orders' },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'rgb(6, 86, 145, .15)',
        borderRadius: '5px',
        padding: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '.5em',
      }}
    >
      {icons.map(({ id, icon }) => (
        <ActiveToolOverviewIcon key={id} icon={icon} badgeContent={badgeCounts[id]} />
      ))}
    </Box>
  );
};
