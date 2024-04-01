import { Box, Button, Checkbox, Chip, FormControlLabel } from '@mui/material';

export const ContractLocationCard: React.FC<unknown> = () => {
  return (
    <Box
      data-id="ContractLocationContainer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.dark',
        fontSize: '.5em',
        width: '18em',
      }}
    >
      <Box sx={{ display: 'flex', alignSelf: 'flex-start' }}>
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Start Location"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '1.5em',
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Chip label="Star" size="small" />
        <Chip label="Planet" size="small" />
        <Chip label="Moon" size="small" />
        <Chip label="Location" size="small" />
      </Box>
      <Button size="small">Contractors</Button>
    </Box>
  );
};
