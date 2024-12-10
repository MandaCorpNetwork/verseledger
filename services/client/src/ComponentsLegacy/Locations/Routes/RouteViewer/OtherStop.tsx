import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { ReadOnlyField } from '@CommonLegacy/Components/TextFields/ReadOnlyField';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Float3, MathX } from 'vl-shared/src/math';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

type OtherStopProps = {
  destination: IDestination;
  nextDestination: IDestination | undefined;
};

export const OtherStop: React.FC<OtherStopProps> = ({ destination, nextDestination }) => {
  const formatDistance = React.useCallback((distanceInKm: number) => {
    if (distanceInKm >= 1_000_000) {
      return `${(distanceInKm / 1_000_000).toFixed(2)} Gkm`;
    } else if (distanceInKm >= 1_000) {
      return `${(distanceInKm / 1_000).toFixed(2)} Mkm`;
    } else {
      return `${distanceInKm.toFixed(2)} km`;
    }
  }, []);
  const posA = new Float3(
    destination.location.x,
    destination.location.y,
    destination.location.z,
  );
  const posB = new Float3(
    nextDestination?.location.x,
    nextDestination?.location.y,
    nextDestination?.location.z,
  );
  const floatDistance = MathX.distance(posA, posB);
  const absDistance = Math.abs(floatDistance);
  const formattedDistance = formatDistance(absDistance);
  return (
    <ComponentContainer
      data-testid="RouteTool-RouteViewer__OtherStop_Container"
      sx={{ p: '.5em', gap: '.5em' }}
    >
      <ComponentDisplay
        data-testid="RouteTool-RouteViewer-NextDestination__Title_Wrapper"
        sx={{
          flexDirection: 'row',
          py: '.2em',
          justifyContent: 'flex-start',
          px: '1em',
        }}
      >
        <Typography variant="body2" color="info"></Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '.5em', mx: 'auto' }}>
          <Typography data-testid="RouteTool-RouteViewer-CurrentDestination_Title">
            Next Destination:
          </Typography>
          <LocationChip locationId={destination.location.id} sx={{ minWidth: '120px' }} />
        </Box>
      </ComponentDisplay>
      <ComponentDisplay
        data-testid="RouteTool-RouteViewer-NextDestination__Information_Container"
        sx={{ flexDirection: 'row' }}
      >
        <ReadOnlyField label="Local Time" />
        <ReadOnlyField label="Distance" value={formattedDistance} />
        <ReadOnlyField label="Est. Travel Time" />
      </ComponentDisplay>
    </ComponentContainer>
  );
};
