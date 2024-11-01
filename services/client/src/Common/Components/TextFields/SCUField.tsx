import { useSoundEffect } from '@Audio/AudioManager';
import { Popper, TextField } from '@mui/material';
import { numericalFilter } from '@Utils/numericFilter';
import React from 'react';

import { SCUQuickSelect } from '../App/SCUQuickSelect';

type SCUFieldProps = {
  onChange: (value: number) => void;
  onBlur: () => void;
  value: number;
};

export const SCUField: React.FC<SCUFieldProps> = (props) => {
  const { onChange, onBlur, value } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const sound = useSoundEffect();

  const handlePopOpen = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClosePop = React.useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleChange = React.useCallback(
    (value: string | number) => {
      if (typeof value === 'number') {
        sound.playSound('clickMain');
        handleClosePop();
        return onChange(value);
      }
      const filteredValue = numericalFilter(value) ?? 0;
      handleClosePop();
      return onChange(filteredValue);
    },
    [onChange, sound, handleClosePop],
  );

  const handleBlur = React.useCallback(() => {
    handleClosePop();
    onBlur();
  }, [handleClosePop, onBlur]);

  return (
    <>
      <TextField
        data-testid="CreateMission-Form-Objective__SCU_Field"
        label="SCU"
        size="small"
        color="secondary"
        autoComplete="off"
        required
        onBlur={handleBlur}
        onMouseEnter={(e) => handlePopOpen(e)}
        // onMouseLeave={handleClosePop}
        onChange={(e) => handleChange(e.target.value)}
        value={value != 0 ? value.toLocaleString() : ''}
      />
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onMouseLeave={handleClosePop}
        placement={'bottom-end'}
        sx={{
          zIndex: 'tooltip',
          p: '.3em',
          mt: '0.2em',
          background: 'linear-gradient(135deg, rgba(14,35,141,0.3), rgba(6,86,145,0.8))',
          borderRadius: '10px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgb(6,86,145)',
        }}
      >
        <SCUQuickSelect onClick={(e) => handleChange(e)} value={value} />
      </Popper>
    </>
  );
};
