import StarIcon from '@mui/icons-material/Star';
import { Box, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from '../QueryNames';

// const RatingSliderMarks = [
//   { value: 1, label: <StarIcon sx={{ fontSize: '1.2em' }} /> },
//   { value: 2 },
//   { value: 3 },
//   { value: 4 },
//   {
//     value: 5,
//     label: (
//       <>
//         <StarIcon sx={{ fontSize: '1.2em' }} />
//         <StarIcon sx={{ fontSize: '1.2em' }} />
//         <StarIcon sx={{ fontSize: '1.2em' }} />
//         <StarIcon sx={{ fontSize: '1.2em' }} />
//         <StarIcon sx={{ fontSize: '1.2em' }} />
//       </>
//     ),
//   },
// ];

const DisabledRatingSliderMarks = [
  { value: 1, label: <StarIcon sx={{ fontSize: '1.2em', color: 'grey' }} /> },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  {
    value: 5,
    label: (
      <>
        <StarIcon sx={{ fontSize: '1.2em', color: 'grey' }} />
        <StarIcon sx={{ fontSize: '1.2em', color: 'grey' }} />
        <StarIcon sx={{ fontSize: '1.2em', color: 'grey' }} />
        <StarIcon sx={{ fontSize: '1.2em', color: 'grey' }} />
        <StarIcon sx={{ fontSize: '1.2em', color: 'grey' }} />
      </>
    ),
  },
];

export const EmployerRatingSliderFilter: React.FC<unknown> = () => {
  const [employerRating, setEmployerRating] = useState<number[]>([1, 5]);
  // const [contractorRating, setContractorRating] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filters, setFilters] = useURLQuery();

  const handleEmployerSlide = (_event: Event, newValue: number | number[]) => {
    setEmployerRating(newValue as number[]);
    // @ts-expect-error TS2322: Type 'number[]' is not assignable to type 'string | undefined',
    setFilters(QueryNames.EmployerRating, newValue as number[]);
  };
  //Current Slide Handler - needs updated to setSearchPerams

  // const handleContractorSlide = (
  //   _event: Event,
  //   newValue: number,
  // ) => {
  //   setContractorRating(newValue as number);
  //   // @ts-expect-error TS2322: Type 'number[]' is not assignable to type 'string | undefined',
  //   setFilters(QueryNames.ContractorRating, newValue as number);
  // };

  return (
    <Box
      id="PlayerRating-Filter-Box"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '.5em',
        gap: '5em',
      }}
    >
      <Box
        data-testid="EmployerRating__Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '.5em',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'text.disabled' }}>
          Employer Rating
        </Typography>
        <Slider
          value={employerRating}
          min={1}
          max={5}
          onChange={handleEmployerSlide}
          valueLabelDisplay="auto"
          marks={DisabledRatingSliderMarks}
          disabled
          sx={{
            width: '15em',
            marginTop: '.5em',
          }}
        />
      </Box>
      {/* <Box
        data-testid="ContractorRating__Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '.5em',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>Contractor Rating</Typography>
        <Slider
          value={contractorRating}
          min={1}
          max={5}
          onChange={handleContractorSlide}
          valueLabelDisplay="auto"
          marks={RatingSliderMarks}
          sx={{
            width: '15em',
            marginTop: '.5em',
          }}
        />
      </Box> */}
    </Box>
  );
};
