import { StarBorder } from '@mui/icons-material';
import { Button, Popover, Typography, Slider } from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export const EmployerRatingFilterMenuDropdown: React.FC<unknown> = () => {
  const [anchorE1, setAnchorE1] = useState(null);

  const handleClick: MouseEventHandler<SVGSVGElement> = (e: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  const [rating, setRating] = useState<number[]>([1, 10]);

  const handleSlide = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
    console.log('Rating Slider Range: ', newValue);
  };

  return (
    <Button sx={{ color: 'text.primary' }}>
      <StarBorder onClick={handleClick} sx={{ color: 'secondary.main', width: '55px' }} />
      <Popover
        id="test-menu"
        keepMounted
        open={Boolean(anchorE1)}
        anchorEl={anchorE1}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>Rating</Typography>
        <div style={{ padding: '1em' }}>
          <Slider
            value={rating}
            step={1}
            min={1}
            max={10}
            onChange={handleSlide}
            valueLabelDisplay="auto"
            sx={{
              width: '12em',
              padding: '1em',
              marginLeft: '1em',
              marginRight: '1em',
            }}
          />
        </div>
      </Popover>
    </Button>
  );
};
