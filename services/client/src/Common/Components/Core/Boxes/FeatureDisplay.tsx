import { Box, styled, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyle: SxProps<Theme> = {} as SxProps<Theme>;

export const FeatureDisplay = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyle, 'FeatureDisplay'),
}));
