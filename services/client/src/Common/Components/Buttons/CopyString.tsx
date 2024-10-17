import { useSoundEffect } from '@Audio/AudioManager';
import { Link } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { URLUtil } from '@Utils/URLUtil';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

type CopyStringProps = {
  /** Text to Copy */
  string: string;
  /** Custom: Any String || VLurl: Internal Site Link */
  variant: 'custom' | 'VLurl';
  /** Custom Successful Alert Message. */
  successText?: string;
  /** Size of the Icon. Default "Medium" */
  size?: 'small' | 'medium' | 'large';
  /** Color of Icon */
  iconColor?:
    | 'action'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'secondary'
    | 'disabled'
    | 'inherit'
    | 'primary';
  buttonColor?:
    | 'error'
    | 'success'
    | 'warning'
    | 'default'
    | 'info'
    | 'secondary'
    | 'inherit'
    | 'primary';
  /** Slots- Root: IconButton, Icon: MUI SvgIcon */
  slotProps?: {
    root?: {
      sx?: object;
    };
    icon?: {
      sx?: object;
    };
  };
  ['data-testid']?: string;
};

/** Custom Copy String Component. Uses URLUtil.frontendHost for VLurl */
export const CopyString: React.FC<CopyStringProps> = ({
  string,
  variant,
  successText,
  size = 'medium',
  iconColor = 'secondary',
  buttonColor = 'secondary',
  slotProps,
  'data-testid': testid,
}) => {
  const { playSound } = useSoundEffect();

  const handleCopyString = React.useCallback(() => {
    //Check if Clipboard API is available
    if (!navigator.clipboard) {
      playSound('denied');
      enqueueSnackbar('Clipboard API not supported', { variant: 'warning' });
    }
    const message = successText ?? 'Added to Clipboard';
    if (variant === 'VLurl') {
      //Fetch the Prefix
      const prefix = URLUtil.frontendHost;
      navigator.clipboard
        .writeText(`${prefix}${string}`)
        .then(() => {
          playSound('success');
          enqueueSnackbar(message, { variant: 'success' });
        })
        .catch((err) => {
          playSound('error');
          enqueueSnackbar(`Copy Failed: ${err}`, { variant: 'error' });
        });
    } else {
      navigator.clipboard
        .writeText(string)
        .then(() => {
          playSound('success');
          enqueueSnackbar(message, { variant: 'success' });
        })
        .catch((err) => {
          playSound('error');
          enqueueSnackbar(`Copy Failed: ${err}`, { variant: 'error' });
        });
    }
  }, [playSound, successText, string, variant]);
  return (
    <IconButton
      data-testid={`${testid + '__'}CopyString_IconButton`}
      size="small"
      color={buttonColor}
      sx={{ ...slotProps?.root?.sx }}
      onClick={handleCopyString}
    >
      <Link
        data-testid={`${testid + '__'}CopyString_Icon`}
        fontSize={size}
        color={iconColor}
        sx={{ ...slotProps?.icon?.sx }}
      />
    </IconButton>
  );
};
