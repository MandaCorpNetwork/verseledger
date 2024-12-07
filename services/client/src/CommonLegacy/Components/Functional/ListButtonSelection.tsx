import { Box } from '@mui/material';

import { ListSelectButton } from '../Styled/Buttons/IndicatorButton';

type ListButtonSelectionProps = {
  dense?: boolean;
  selected?: string;
  onClick: (value: string) => void;
  labels: string[];
  sx?: object;
};

export const VLOptButtonGroup: React.FC<ListButtonSelectionProps> = (props) => {
  const { dense = false, selected, onClick, labels, sx } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        p: '0.5em',
        ...sx,
      }}
    >
      {labels.map((label) => (
        <div
          key={label}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ListSelectButton
            dense={dense}
            selected={selected === label}
            onClick={() => onClick(label)}
          >
            {label}
          </ListSelectButton>
        </div>
      ))}
    </Box>
  );
};
