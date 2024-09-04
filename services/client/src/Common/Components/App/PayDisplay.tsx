import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';

type PayDisplayProps = {
  value: number;
  variant: 'FLATRATE' | 'POOL' | 'HOURLY';
  testid?: string;
  tooltip?: string;
  maxWidth?: string;
  minWidth?: string;
  borderColor?: string;
  margin?: string;
  padding?: string;
  color?: string;
  fontSize?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  mb?: string;
};
/**
 * @deprecated
 * !Will be removed in the next major release.
 */
export const PayDisplay: React.FC<PayDisplayProps> = (props) => {
  const {
    value,
    variant,
    testid,
    tooltip,
    maxWidth,
    minWidth,
    borderColor,
    margin,
    padding,
    color,
    fontSize,
    ml,
    mr,
    mt,
    mb,
  } = props;

  const flatValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
    .format(value)
    .substring(1);

  const valueAdornment = () => {
    switch (variant) {
      case 'FLATRATE':
        return `¤ ${flatValue}`;
      case 'POOL':
        return `${value}%`;
      case 'HOURLY':
        return `${value}/hour`;
      default:
        return `Error`;
    }
  };

  const valueDisplayCatch = () => {
    if (value == 0) {
      return 'Error';
    }
    return valueAdornment();
  };

  const displayValue = valueDisplayCatch();

  const getToolValue = () => {
    if (value == 0) {
      return 'Amount is 0';
    } else if (tooltip == null) {
      return displayValue;
    } else {
      return tooltip;
    }
  };
  const toolValue = getToolValue();

  return (
    <Box
      data-testid={`${testid}__PayDisplayContainer`}
      sx={{
        minWidth: minWidth ? minWidth : '75px',
        maxWidth: maxWidth ? maxWidth : '125px',
        overflow: 'hidden',
        margin: margin ? margin : '',
        ml: ml ? ml : '',
        mr: mr ? mr : '',
        mb: mb ? mb : '',
        my: mt ? mt : '',
        display: 'inline-flex',
      }}
    >
      <Box
        data-testid={`${testid}__PayDisplayWrapper`}
        sx={{
          border: '1px solid',
          borderRadius: '5px',
          borderColor:
            displayValue == 'Error'
              ? 'error.main'
              : borderColor
                ? borderColor
                : 'secondary.main',
          width: '100%',
          padding: padding ? padding : '.3em',
        }}
      >
        <Tooltip data-testid={`${testid}__PayDisplayTooltip`} title={toolValue}>
          <Typography
            data-testid={`${testid}__PayDisplayText`}
            noWrap
            sx={{
              color:
                displayValue == 'Error'
                  ? 'warning.main'
                  : color
                    ? color
                    : 'text.secondary',
              mx: '.1em',
              maxWidth: '100%',
              fontSize: fontSize ? fontSize : '',
            }}
          >
            {displayValue}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};
