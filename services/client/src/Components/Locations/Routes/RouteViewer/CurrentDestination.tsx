import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Float3, MathX } from 'vl-shared/src/math';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { Objective } from './Objective';

type CurrentDestinationProps = {
  destination: IDestination;
  nextDestination: IDestination | undefined;
};

export const CurrentDestination: React.FC<CurrentDestinationProps> = ({
  destination,
  nextDestination,
}) => {
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
    <DigiBox
      data-testid="RouteTool-RouteViewer__CurrentDestination_Container"
      sx={{ p: '.5em', gap: '.5em' }}
    >
      <DigiDisplay
        data-testid="RouteTool-RouteViewer-CurrentDestination__Title_Wrapper"
        sx={{
          flexDirection: 'row',
          py: '.2em',
          justifyContent: 'flex-start',
          px: '1em',
        }}
      >
        <Typography variant="body2" color="info">
          {destination.reason}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '.5em', mx: 'auto' }}>
          <Typography data-testid="RouteTool-RouteViewer-CurrentDestination_Title">
            Current Destination:
          </Typography>
          <LocationChip locationId={destination.location.id} sx={{ minWidth: '120px' }} />
        </Box>
      </DigiDisplay>
      <DigiDisplay
        data-testid="RouteTool-RouteViewer-CurrentDestination__Information_Container"
        sx={{ flexDirection: 'row' }}
      >
        <ReadOnlyField label="Local Time" />
        <ReadOnlyField label="Distance" value={formattedDistance} />
        <ReadOnlyField label="Est. Travel Time" />
      </DigiDisplay>
      <Box
        data-testid="RouteTool-RouteViewer-CurrentDestination__ObjectiveList_Wrapper"
        sx={{
          p: '.5em',
          flexDirection: 'column',
          display: 'flex',
          gap: '.5em',
        }}
      >
        {destination.objectives?.map((objective) => (
          <Objective
            key={objective.packageId}
            active
            objective={objective}
            destination={destination}
          />
        ))}
      </Box>
    </DigiBox>
  );
};
