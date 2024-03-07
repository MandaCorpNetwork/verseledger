import { Box } from '@mui/material';

export const ContractsApp: React.FC<unknown> = () => {
  return (
    <Box
      data-id="ContractsApp"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        width: '100%',
        padding: '1em',
      }}
    ></Box>
  );
};
