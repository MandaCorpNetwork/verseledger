import { LocationSelection } from '@Common/Components/App/LocationSelection';
import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Gauge, SparkLineChart } from '@mui/x-charts';

export const ExploreApp: React.FC<unknown> = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '35%' }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', height: '40%', width: '100%' }}
        >
          <LocationSelection />
          <Box>
            <ReadOnlyField label="Local Time" />
            <ReadOnlyField label="StarRise Time" />
            <ReadOnlyField label="StarSet Time" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              size="small"
              label="Jurisdiction"
              sx={{ width: '6em' }}
              value="UEE"
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box>
                <Typography>Safety Rating</Typography>
                <Gauge
                  value={75}
                  startAngle={-110}
                  endAngle={110}
                  text={`Dangerous`}
                  width={150}
                  height={150}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography>Population</Typography>
                <SparkLineChart
                  height={150}
                  data={[2500, 800, 1500, 900, 700, 600, 3200]}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', height: '60%', width: '100%' }}
        >
          <Box>
            <Typography>Location Descriiption & Lore</Typography>
          </Box>
          <Box>
            <ReadOnlyField label="Daily Crime" />
            <ReadOnlyField label="Surface Elevation" />
            <ReadOnlyField label="Avg. Temperature" />
            <ReadOnlyField label="Hazards" />
            <ReadOnlyField label="Gravity" />
            <ReadOnlyField label="Atmosphere" />
          </Box>
          <Box>
            <TextField
              label="Amenities"
              value="Insert Amenities Here"
              multiline
              rows={5}
            />
            <TextField label="Shops" value="Insert Shops" multiline rows={5} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '65%' }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '80%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              position: 'relative',
              zIndex: 1,
              fontSize: '14px',
            }}
          >
            Map In Construction
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20%' }}>
          <Box>
            <Button>Set Location</Button>
            <Button>View Logistics</Button>
            <Button>View Market</Button>
            <Button>Report Crime</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
