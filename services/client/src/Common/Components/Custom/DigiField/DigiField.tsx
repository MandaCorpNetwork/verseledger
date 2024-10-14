import { Box, Tooltip, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type DigiFieldProps = PropsWithChildren<{
  /** The test id for the component */
  ['data-testid']?: string;
  /** The label for the field */
  label: string;
  /** Tooltip Text */
  tooltip?: string;
  /** The start adornment for the field */
  startAdornment?: React.ReactNode;
  /** The end adornment for the field */
  endAdornment?: React.ReactNode;
  /** The children for the field wrapped in a Typography component */
  children?: unknown;
  /** The sx props for the field @see https://mui.com/system/the-sx-prop/ */
  sx?: object;
  /** The slots for the field */
  slots?: {
    /** The label slot for the field, allows for custom sx props */
    label?: {
      sx?: object;
    };
    /** The content slot for the field, allows for custom sx props */
    content?: {
      sx?: object;
    };
    /** The typography slot for the field, allows for custom sx props and the typography variant */
    typography?: {
      sx?: object;
      variant?: 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption' | 'button';
    };
  };
}>;
// Gap in the Content Slot controls the spacing between adornments & Children
// The Content Slot is the bottom Row of the DigiField
/**
 * ### DigiField
 * @description
 * A custom Box component that displays a label, adornments and Children content contained in a Typography component. This is meant to be used in lieu of Outlined Inputs where we want a more stylized Data Point Display.
 * @param props - The props for the component
 */
const DigiFieldComponent: React.FC<DigiFieldProps> = (props) => {
  const {
    label,
    startAdornment,
    endAdornment,
    children,
    sx,
    slots,
    'data-testid': testid = 'infoField',
    tooltip,
  } = props;
  return (
    <Box
      data-testid={`DigiField-${testid}-root`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundImage:
          'linear-gradient(135deg, rgba(8,22,80,.8) 50%, rgba(0,1,19,.8) 100%)',
        py: '2px',
        px: '5px',
        borderRadius: '5px',
        color: 'text.secondary',
        boxShadow: '0 2px 5px rgba(0,0,0,.3), 0 4px 10px rgba(0,0,0,.2)',
        border: '1px solid',
        borderColor: 'primary.dark',
        overflow: 'hidden',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 10px rgba(0,0,0,.3), 0 12px 20px rgba(0,0,0,.3)',
          backdropFilter: 'blur(10px)',
          color: 'secondary.main',
        },
        ...sx,
      }}
    >
      <Typography
        data-testid={`DigiField-${testid}-label`}
        sx={{
          fontSize: '.7em',
          color: 'inherit',
          transition: 'all 0.1s ease-in-out',
          cursor: 'default',
          ...slots?.label?.sx,
        }}
      >
        {label}
      </Typography>
      <Box
        data-testid={`DigiField-${testid}-content`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-between',
          gap: '5px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          ...slots?.content?.sx,
        }}
      >
        <div
          data-testid={`DigiField-${testid}-startAdornment`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {startAdornment}
        </div>
        <Tooltip title={tooltip} arrow placement="bottom">
          <Typography
            data-testid={`DigiField-${testid}-children`}
            variant={slots?.typography?.variant ?? 'body1'}
            sx={{
              color: 'text.primary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: '1',
              ...slots?.typography?.sx,
            }}
          >
            {children}
          </Typography>
        </Tooltip>
        <div
          data-testid={`DigiField-${testid}-endAdornment`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {endAdornment}
        </div>
      </Box>
    </Box>
  );
};

export const DigiField = React.memo(DigiFieldComponent);
