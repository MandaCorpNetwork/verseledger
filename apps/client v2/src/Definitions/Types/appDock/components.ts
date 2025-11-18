import type { SvgIconProps } from "@mui/material";
import type { ThemeVariant } from "../themes/themeTypes";

export type AppButtonV3Props = {
  label: string;
  icon: React.ComponentType<SvgIconProps>;
  path: string;
  disabled?: boolean;
  variant: ThemeVariant;
  'data-testid'?: string;
}