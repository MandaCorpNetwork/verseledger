import StarIcon from '@mui/icons-material/Star';
import { Box, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from '../../Utils/QueryNames';

const RatingSliderMarks = [
  { value: 1, label: <StarIcon sx={{ fontSize: '1.2em' }} /> },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  {
    value: 5,
    label: (
      <>
        <StarIcon sx={{ fontSize: '1.2em' }} />
        <StarIcon sx={{ fontSize: '1.2em' }} />
        <StarIcon sx={{ fontSize: '1.2em' }} />
        <StarIcon sx={{ fontSize: '1.2em' }} />
        <StarIcon sx={{ fontSize: '1.2em' }} />
      </>
    ),
  },
];

export const EmployerRatingSliderFilter: React.FC<unknown> = () => {
  const [rating, setRating] = useState<number[]>([1, 5]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filters, setFilters] = useURLQuery();

  const handleSlide = (_event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
    // @ts-expect-error TS2322: Type 'number[]' is not assignable to type 'string | undefined',
    setFilters(QueryNames.EmployerRating, newValue as number[]);
  };
  //Current Slide Handler - needs updated to setSearchPerams

  return (
    <Box
      id="PlayerRating-Filter-Box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: '10%',
        padding: '.5em',
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>Employer Rating</Typography>
      <Slider
        value={rating}
        min={1}
        max={5}
        onChange={handleSlide}
        valueLabelDisplay="auto"
        marks={RatingSliderMarks}
        sx={{
          width: '15em',
          marginTop: '.5em',
        }}
      />
    </Box>
  );
};
