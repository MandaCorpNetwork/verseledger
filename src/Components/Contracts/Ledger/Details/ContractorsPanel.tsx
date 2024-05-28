import { Box, Typography } from '@mui/material';

export const ContractorsPanel: React.FC = () => {
  return (
    <Box
      data-testid="ContractBriefing-ActiveData-ContractorPanel__Wrapper"
      sx={{
        display: 'flex',
        flexDisplay: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        data-testid="ContractBriefing-ActiveData-ContractorPanel__CountBarWrapper"
        sx={{
          backgroundColor: 'rgba(14,49,141,.25)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignContent: 'center',
        }}
      >
        <Typography
          data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ActiveContractorsCount"
          variant="body2"
          sx={{
            my: 'auto',
            fontWeigth: 'bold',
            color: 'text.secondary',
          }}
        >Active Contractors: X</Typography>
        <Typography>Contractor Limit: X</Typography>
      </Box>
    </Box>
  );
};
