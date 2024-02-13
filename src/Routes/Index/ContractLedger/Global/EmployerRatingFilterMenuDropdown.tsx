import { Box, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

export const EmployerRatingFilterMenuDropdown: React.FC<unknown> = () => {
  const [rating, setRating] = useState<number[]>([1, 10]);

  const handleSlide = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
    console.log('Rating Slider Range: ', newValue);
  };
  //Current Slide Handler - needs updated to setSearchPerams

  return (
    <Box>
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
    </Box>
  );
};
