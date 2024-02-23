import StarIcon from '@mui/icons-material/Star';
import { Box, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

type EmployerRatingFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

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

export const EmployerRatingSliderFilter: React.FC<EmployerRatingFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const [rating, setRating] = useState<number[]>([1, 5]);

  const min = searchParams.get('minRating');
  const max = searchParams.get('maxRating');

  const handleSlide = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
    searchParams.set('minRating', newValue.toString());
    searchParams.set('maxRating', newValue.toString());

    setSearchParams(searchParams);
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
