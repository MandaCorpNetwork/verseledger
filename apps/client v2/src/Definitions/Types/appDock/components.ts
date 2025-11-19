import type { SvgIconProps } from '@mui/material';
import type { ThemeVariant } from '../themes/themeTypes';
import type { AppListing } from '@Types/apps';

export type AppButtonProps = {
  app: AppListing;
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
};