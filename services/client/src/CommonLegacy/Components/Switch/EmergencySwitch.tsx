import { useSoundEffect } from '@Audio/AudioManager';
import { EmergencyShare, ShareLocation } from '@mui/icons-material';
import { styled, Switch, Tooltip } from '@mui/material';
import React from 'react';

/**
 * @component
 * Custom Styled Switch Component for the Emergency Switch
 */
const ThemedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: theme.palette.warning.main,
    '&.Mui-checked': {
      color: theme.palette.error.main,
      '& + .MuiSwitch-track': {
        bgcolor: theme.palette.error.main,
      },
    },
    '& + .MuiSwitch-track': {
      bgcolor: theme.palette.warning.dark,
    },
  },
  '& .MuiSwitch-thumb': {
    color: 'theme.palette.warning.main',
    '&.Mui-checked': {
      color: theme.palette.error.main,
    },
  },
}));
/** Fixes Alignment for the Emergency Switch Icons */
const iconStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-10%)',
};

type EmergencySwitchProps = {
  /** The current Boolean Value of the Toggle */
  isEmergency: boolean;
  /** The function to be called when the toggle is clicked. */
  onToggle: () => void;
  /** Whether the toggle is disabled. */
  disabled?: boolean;
  /** The DataTestId of the Toggle */
  ['data-testid']?: string;
  /** The Size of the Toggle */
  size?: 'small' | 'medium';
};

/**
 * @name EmergencyToggle - A Custom Toggle for Filtering Emergency States
 * The current Boolean Value of the Toggle
 * The function to be called when the toggle is clicked.
 * Whether the toggle is disabled.
 * data-testid - The DataTestId of the Toggle
 * The Size of the Toggle. Default `medium`.
 * @example
 * <<EmergencyToggle isEmergency={true} onToggle={() => {}} />
 */
export const EmergencySwitch: React.FC<EmergencySwitchProps> = ({
  isEmergency,
  onToggle,
  disabled,
  'data-testid': testid = 'emergencyToggle',
  size = 'medium',
}) => {
  // HOOKS
  const sound = useSoundEffect();
  // LOGIC
  /** Handles the clickEvent that toggles the Emergency Switch */
  const handleToggle = React.useCallback(() => {
    sound.playSound('generalNotify');
    onToggle();
  }, [sound, onToggle]);
  return (
    <Tooltip
      title="Emergency Mode"
      disableInteractive
      enterDelay={500}
      enterNextDelay={2000}
      leaveDelay={300}
    >
      <ThemedSwitch
        data-testid={`EmergencySwitch__${testid}`}
        onChange={handleToggle}
        checked={isEmergency}
        disabled={disabled}
        checkedIcon={<EmergencyShare sx={iconStyle} />}
        icon={<ShareLocation sx={iconStyle} />}
        size={size}
        color="default"
      />
    </Tooltip>
  );
};
