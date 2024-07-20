import { Chip, ChipProps, styled } from '@mui/material';

interface StyledChipProps extends ChipProps {
  isSelected?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ArchetypeListChip = styled(({ isSelected, ...props }: StyledChipProps) => (
  <Chip {...props} />
))(({ isSelected }) => ({
  transition:
    'transform 0.2s ease-in-out, backgroundImage 0.3s ease-in-out, boxShadow 0.3s ease, borderColor 0.3s ease',
  transformStyle: 'preserve-3d',
  transform: 'rotateY(0deg) scale(1)',
  flexShrink: '0',
  backgroundImage: isSelected
    ? 'linear-gradient(145deg, rgba(0,120,235,0.8), rgba(0,100,220,1))'
    : 'linear-gradient(145deg, rgba(8,22,120,0.3), rgba(0,30,100,0.5))',
  color: isSelected ? 'rgba(24,252,252,.75)' : 'rgba(33,150,243,.5)',
  border: '1px solid',
  borderColor: isSelected ? 'rgba(25,150,200)' : 'rgba(8,22,130,1)',
  boxShadow: isSelected ? '0 2px 5px 3px rgba(0,30,140)' : '0 2px 4px rgba(0,0,0,0.2)',
  '&:hover': {
    backgroundImage: isSelected
      ? 'linear-gradient(145deg, rgba(0,120,235,0.6), rgba(0,100,220,.8))'
      : 'linear-gradient(145deg, rgba(8,22,120,0.6), rgba(0,30,100,0.9))',
    boxShadow: isSelected
      ? '0 4px 8px 4px rgba(0,30,140)'
      : '0 4px 8px rgba(0, 0, 0, 0.3)',
    color: isSelected ? 'rgba(24,252,252,.88)' : 'rgba(33,150,243)',
  },
  '&:active': {
    backgroundImage: isSelected
      ? 'linear-gradient(145deg, rgba(0,75,185,0.4), rgba(0,45,145,.5))'
      : 'linear-gradient(145deg, rgba(8,22,120,0.7), rgba(0,30,100,1))',
    boxShadow: isSelected
      ? '0 4px 12px 8px rgba(0,30,140)'
      : '0 6px 12px rgba(0, 0, 0, 0.4)',
    color: isSelected ? 'rgba(24,252,252)' : undefined,
    textShadow: isSelected ? '0 0px 5px rgba(145,250,255)' : undefined,
    transform: 'translateY(2px)',
  },
  '& .MuiTouchRipple-child': {
    backgroundColor: isSelected ? 'rgba(25,150,200)' : 'rgba(6,86,145,0.8)',
  },
}));

export default ArchetypeListChip;
