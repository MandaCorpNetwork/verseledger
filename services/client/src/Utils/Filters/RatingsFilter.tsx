import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import StarIcon from '@mui/icons-material/Star';
import { Box, Slider, Typography } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import React from 'react';

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

export const RatingsFilter: React.FC<unknown> = () => {
  const { searchParams, setFilters } = useURLQuery();

  const currentFilterValue = React.useMemo(() => {
    return (queryName: QueryNames): number | null => {
      const value = searchParams.get(queryName);
      return value ? parseInt(value, 10) : null;
    };
  }, [searchParams]);

  const handleFilterSlide = React.useCallback(
    (newValue: number | number[], field: QueryNames) => {
      setFilters(field, newValue.toString());
    },
    [setFilters],
  );

  return (
    <Box
      id="PlayerRating-Filter-Box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '.5em',
        gap: '1em',
      }}
    >
      <ComponentDisplay
        data-testid="ContractorRating__Wrapper"
        sx={{
          pl: '.5em',
          pr: '2em',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Contractor Rating Limit
        </Typography>
        <Slider
          value={currentFilterValue(QueryNames.ContractorRating) ?? 1}
          min={1}
          max={5}
          onChange={(_e, newValue) =>
            handleFilterSlide(newValue, QueryNames.ContractorRating)
          }
          valueLabelDisplay="auto"
          marks={RatingSliderMarks}
          size="small"
          sx={{
            width: '15em',
            marginTop: '.5em',
            mx: '1em',
          }}
        />
      </ComponentDisplay>
      <ComponentDisplay
        data-testid="EmployerRating__Wrapper"
        sx={{
          pl: '.5em',
          pr: '2em',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'text.disabled' }}>
          Employer Rating
        </Typography>
        <Slider
          value={0}
          min={1}
          max={5}
          size="small"
          onChange={() => {}}
          valueLabelDisplay="auto"
          marks={DisabledRatingSliderMarks}
          disabled
          sx={{
            width: '15em',
            marginTop: '.5em',
            mx: '1em',
          }}
        />
      </ComponentDisplay>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Typography variant="tip" sx={{ px: '1em', fontSize: '.75em' }}>
          Sets the Max Rating allowed.
        </Typography>
      </Box>
    </Box>
  );
};
