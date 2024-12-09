import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { InDevOverlay } from '@CommonLegacy/Components/App/InDevOverlay';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { ReadOnlyField } from '@CommonLegacy/Components/TextFields/ReadOnlyField';
import { Box, Chip, Divider, TextField, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts';
import { isDev } from '@Utils/isDev';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

type InfoDisplayProps = {
  selectedLocation: ILocation | null;
  currentLocation: ILocation | null;
};
export const InfoDisplay: React.FC<InfoDisplayProps> = ({
  selectedLocation,
  currentLocation,
}) => {
  const dev = isDev();
  return (
    <FeatureDisplay
      data-testid="ExploreApp__Information_Wrapper"
      sx={{ width: '100%', p: '1em', alignItems: 'center', gap: '.5em' }}
    >
      <ComponentDisplay
        data-testid="ExploreApp-Information__Title_Wrapper"
        sx={{ px: '1em', py: '.2em', flexDirection: 'row', gap: '1em' }}
      >
        <Typography data-testid="ExploreApp-Information__Title" variant="h6">
          {selectedLocation?.short_name}
        </Typography>
        {selectedLocation?.id == currentLocation?.id && (
          <Chip label="Current Location" variant="filled" color="info" />
        )}
      </ComponentDisplay>
      <ComponentContainer
        data-testid="ExploreApp-Information__Time_Wrapper"
        sx={{ flexDirection: 'row' }}
      >
        {!dev && <InDevOverlay />}
        <ReadOnlyField label="Local Time" />
        <ReadOnlyField label="StarRise Time" />
        <ReadOnlyField label="StarSet Time" />
      </ComponentContainer>
      <ComponentContainer
        data-testid="ExploreApp-Information__Parent&Population_Wrapper"
        sx={{
          flexDirection: 'row',
          width: '100%',
          py: '.5em',
          px: '1em',
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        {!dev && <InDevOverlay />}
        <ComponentDisplay
          data-testid="ExploreApp-Information-Parent&Population__Parents_Wrapper"
          sx={{ px: '.5em', justifyContent: 'flex-start' }}
        >
          <Typography
            data-testid="ExploreApp-Information-Parent&Population__Parents_Title"
            variant="overline"
          >
            Parent Locations
          </Typography>
          <Divider variant="fullWidth" sx={{ width: '80%' }} />
          <Box
            data-testid="ExploreApp-Information-Parent&Population-Parent__ListWrapper"
            sx={{
              width: '100%',
              flexGrow: '1',
              justifyContent: 'space-around',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              data-testid="ExploreApp-Information-Parent&Population-Parent__StarTitle"
              color="textPrimary"
            >
              Star:
            </Typography>
            <Typography
              data-testid="ExploreApp-Information-Parent&Population-Parent__PlanetTitle"
              color="textPrimary"
            >
              Planet:
            </Typography>
            <Typography
              data-testid="ExploreApp-Information-Parent&Population-Parent__MoonTitle"
              color="textPrimary"
            >
              Moon:
            </Typography>
          </Box>
        </ComponentDisplay>
        <ComponentDisplay
          data-testid="ExploreApp-Information-Parent&Population__Population_Wrapper"
          sx={{ flexGrow: 1, px: '1em' }}
        >
          <Typography
            data-testid="ExploreApp-Information-Parent&Population__Population_Title"
            variant="overline"
          >
            Population
          </Typography>
          <SparkLineChart
            data-testid="ExploreApp-Information-Parent&Population__Population_Chart"
            height={100}
            data={[2500, 800, 1500, 900, 700, 600, 3200]}
          />
        </ComponentDisplay>
      </ComponentContainer>
      <ComponentContainer
        data-testid="ExploreApp-Information__Data_Container"
        sx={{ width: '100%', px: '.5em', alignItems: 'center', py: '.5em' }}
      >
        {!dev && <InDevOverlay />}
        <Typography data-testid="ExploreApp-Information__Data_Title" variant="overline">
          Location Description & Lore
        </Typography>
        <ComponentDisplay
          data-testid="ExploreApp-Information-Data__Data_Wrapper"
          sx={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}
        >
          <ReadOnlyField label="Jurisdiction" />
          <ReadOnlyField label="Surface Elevation" />
          <ReadOnlyField label="Avg. Temperature" />
          <ReadOnlyField label="Hazards" />
          <ReadOnlyField label="Gravity" />
          <ReadOnlyField label="Atmosphere" />
        </ComponentDisplay>
        <ComponentDisplay
          data-testid="ExploreApp-Information-Data__FacilityLists_Wrapper"
          sx={{
            flexDirection: 'row',
            width: '100%',
            p: '.5em',
            my: '.5em',
            justifyContent: 'space-around',
          }}
        >
          <TextField
            label="Amenities"
            value="Insert Amenities Here"
            color="secondary"
            multiline
            rows={3}
          />
          <TextField
            label="Shops"
            color="secondary"
            value="Insert Shops"
            multiline
            rows={3}
          />
        </ComponentDisplay>
      </ComponentContainer>
    </FeatureDisplay>
  );
};
