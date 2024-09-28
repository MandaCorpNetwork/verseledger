import { Box, Tooltip } from '@mui/material';
import React from 'react';

type RatingDisplayProps = {
  variant?: 'defined' | 'submission';
  onSelect?: (newValue: number) => void;
  sx?: object;
  size?: 'small' | 'medium' | 'large';
  value: number;
};

export const RatingDisplay: React.FC<RatingDisplayProps> = (props) => {
  const { variant = 'submission', onSelect, sx, size = 'medium', value } = props;
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const ratingBackground = React.useCallback(
    (color: 'red' | 'green', filled: boolean, isHovered: boolean = false) => {
      if (isHovered && variant === 'submission') {
        return color === 'red'
          ? 'linear-gradient(135deg, rgba(255,150,150), rgba(200,0,0))'
          : 'linear-gradient(135deg, rgba(150,255,150), rgba(0,200,0))';
      }
      if (color === 'red') {
        return filled
          ? 'linear-gradient(135deg, rgba(255,100,100), rgba(144,0,0))'
          : 'linear-gradient(135deg, rgba(144,0,0,.8), rgba(40,0,0,.8))';
      }
      if (color === 'green') {
        return filled
          ? 'linear-gradient(135deg, rgba(100,255,100), rgba(0,144,0))' // Filled green
          : 'linear-gradient(135deg, rgba(0,144,0,.8), rgba(0,40,0,.8))'; // Unfilled green
      }
    },
    [variant],
  );

  const RedRating = ({ filled, index }: { filled: boolean; index: number }) => {
    const isHovered = hoveredIndex !== null && hoveredIndex <= 2 && hoveredIndex >= index;
    return (
      <Tooltip arrow title={poorText[index]} disableHoverListener={variant === 'defined'}>
        <Box
          data-testid={`RatingsDisplay-TestId__Poor`}
          onClick={() => onSelect && onSelect(-(index + 1))}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          sx={{
            ...sizeRatingStyles[size],
            borderColor: 'error.main',
            background: ratingBackground('red', filled, isHovered),
            transition: 'all 0.3s ease-in-out',
            cursor: onSelect ? 'pointer' : 'default',
            '&:hover': {
              borderColor: onSelect ? 'error.dark' : 'error.main',
            },
          }}
        />
      </Tooltip>
    );
  };

  const GreenRating = ({ filled, index }: { filled: boolean; index: number }) => {
    const isHovered =
      hoveredIndex !== null && hoveredIndex >= 3 && hoveredIndex >= index + 3;
    return (
      <Tooltip arrow title={goodText[index]} disableHoverListener={variant === 'defined'}>
        <Box
          data-testid={`RatingsDisplay-TestId__Good`}
          onClick={() => onSelect && onSelect(index + 1)}
          onMouseEnter={() => setHoveredIndex(index + 3)}
          onMouseLeave={() => setHoveredIndex(null)}
          sx={{
            ...sizeRatingStyles[size],
            borderColor: 'success.main',
            background: ratingBackground('green', filled, isHovered),
            transition: 'background 0.2s ease-in-out',
            cursor: onSelect ? 'pointer' : 'default',
            '&:hover': {
              borderColor: onSelect ? 'success.dark' : 'success.main',
            },
          }}
        />
      </Tooltip>
    );
  };

  const renderDefinedVariant = () => {
    return (
      <Box
        data-testid={`RatingsDisplay__TestId_Root`}
        sx={{ display: 'inline-flex', gap: '.2em', ...sx }}
      >
        {[...Array(5)]
          .map((_, index) => (
            <RedRating
              key={`red-${index}`}
              filled={value < 0 && Math.abs(value) > index}
              index={index}
            />
          ))
          .reverse()}
        {[...Array(5)].map((_, index) => (
          <GreenRating
            key={`green-${index}`}
            filled={value > 0 && value > index}
            index={index}
          />
        ))}
      </Box>
    );
  };

  const renderSubmissionVariant = () => {
    return (
      <Box sx={{ display: 'inline-flex', gap: '.2em', ...sx }}>
        {/* Render 3 Red and 3 Green boxes for submission variant */}
        {[...Array(3)]
          .map((_, index) => (
            <RedRating
              key={`red-${index}`}
              filled={value < 0 && Math.abs(value) > index}
              index={index}
            />
          ))
          .reverse()}
        {[...Array(3)].map((_, index) => (
          <GreenRating
            key={`green-${index}`}
            filled={value > 0 && value > index}
            index={index}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      {variant === 'defined'
        ? renderDefinedVariant()
        : variant === 'submission'
          ? renderSubmissionVariant()
          : null}
    </Box>
  );
};

const sizeRatingStyles = {
  small: {
    width: '.2em',
    height: '1em',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    border: '',
  },
  medium: {
    width: '.5em',
    height: '1.25em',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    border: '1px solid',
  },
  large: {
    width: '.5em',
    height: '1.5em',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
    border: '1px solid',
  },
};

const poorText = ['Poor Experience', 'Dogshit', '... The fuck?'];
const goodText = ['Average', 'Good Experience', `They're Jesus...`];
