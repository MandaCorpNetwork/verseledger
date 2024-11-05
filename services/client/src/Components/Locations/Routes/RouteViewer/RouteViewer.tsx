import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Button, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { currentRouteStop } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { formatDistance, getMappedLocation, MappedLocation } from '../RouteUtilities';
import { CheckpointDestination } from './CheckpointDestination';
import { CurrentDestination } from './CurrentDestination';

type RouteViewerProps = {
  destinations: IDestination[];
  locationTree: Map<string, MappedLocation>;
};

export const RouteViewer: React.FC<RouteViewerProps> = ({
  destinations,
  locationTree,
}) => {
  const currentDestination = useAppSelector(currentRouteStop);
  const currentDestinationIndex = destinations.findIndex(
    (dest) => dest.id == currentDestination.id,
  );
  const nextDestination = destinations[currentDestinationIndex + 1];
  const nextIsCheckpoint = nextDestination.tasks.some(
    (task) => task.type === 'checkpoint',
  );
  const followingStop = destinations[currentDestinationIndex + 2];

  const getDistance = React.useCallback(
    (idA: string, idB: string) => {
      const locA = getMappedLocation(locationTree, idA);
      const locB = getMappedLocation(locationTree, idB);
      if (locA == null) return `Err«`;
      if (locB == null) return `Err»`;
      return formatDistance(locA, locB);
    },
    [locationTree],
  );

  const nextDistance = getDistance(
    currentDestination.location.id,
    nextDestination.location.id,
  );

  const followingDistance = getDistance(
    nextDestination.location.id,
    followingStop.location.id,
  );
  return (
    <GlassBox
      data-testid="RouteTool__RouteViewer_Container"
      sx={{ p: '1em', gap: '1em', height: '100%', overflow: 'hidden' }}
    >
      <div
        data-testid="RouteTool-RouteViewer__Title_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        <Typography data-testid="RouteTool-RouteViewer__Title" variant="h4">
          Route Viewer
        </Typography>
        <div>
          <Button variant="contained">Open Widget</Button>
          <Button variant="contained">Next Stop</Button>
          <Button variant="contained">Add Stop</Button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <GlassDisplay sx={{ p: '1em', height: '100%', gap: '1em' }}>
          <CurrentDestination destination={currentDestination} />
          {nextIsCheckpoint && nextDestination.tasks.length <= 1 && (
            <CheckpointDestination
              destination={nextDestination}
              distance={nextDistance}
            />
          )}
        </GlassDisplay>
        <GlassDisplay></GlassDisplay>
      </div>
    </GlassBox>
  );
};

// export const RouteViewer: React.FC<RouteViewerProps> = ({ destinations }) => {
//   return (
//     <GlassBox
//       data-testid="RouteTool__RouteViewer_Container"
//       sx={{ p: '1em', gap: '1em', height: '100%', overflow: 'hidden' }}
//     >
//       <Box
//         data-testid="RouteTool-RouteViewer__Title_Wrapper"
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           gap: '1em',
//         }}
//       >
//         <Typography data-testid="RouteTool-RouteViewer__Title" variant="h5">
//           Route Viewer
//         </Typography>
//         <Button
//           data-testid="RouteTool-RouteViewer__OpenWidget__Button"
//           variant="popupButton"
//           onClick={handleOpenRouteWidget}
//         >
//           Open Widget
//         </Button>
//         <Button
//           data-testid="RouteTool-RouteViewer__AddStop__Button"
//           variant="popupButton"
//         >
//           Add Stop
//         </Button>
//       </Box>
//       {destinations && destinations.length > 0 && (
//         <GlassBox
//           data-testid="RouteTool-RouteViewer__DestinationViewer_Container"
//           sx={{
//             flexGrow: 1,
//             overflow: 'auto',
//             p: '.5em',
//             gap: '1em',
//           }}
//         >
//           {destinations[0].reason === 'Mission' ? (
//             <CurrentDestination
//               destination={destinations[0]}
//               nextDestination={destinations[1] ?? undefined}
//             />
//           ) : (
//             <OtherStop
//               destination={destinations[0]}
//               nextDestination={destinations[1] ?? undefined}
//             />
//           )}
//           {destinations.slice(1).map((dest, index) => {
//             const originalIndex = index + 1; // Adjust for the slice
//             const nextDestination = destinations[originalIndex + 1] ?? undefined;
//             return dest.reason === 'Mission' ? (
//               <NextDestination
//                 key={dest.id}
//                 destination={dest}
//                 nextDestination={nextDestination}
//               />
//             ) : (
//               <OtherStop
//                 key={dest.id}
//                 destination={dest}
//                 nextDestination={nextDestination}
//               />
//             );
//           })}
//           <Button
//             data-testid="RouteTool-RouteViewer-DestinationViewer__NextStop_Button"
//             variant="contained"
//             color="success"
//             endIcon={<DoubleArrow />}
//             disabled={!allowNextStop}
//             onClick={() => handleDeleteDestination(destinations[0].id)}
//             sx={{
//               position: 'sticky',
//               bottom: 0,
//               mb: '5px',
//               mr: '5px',
//               ml: 'auto',
//               width: '200px',
//             }}
//           >
//             Next Stop
//           </Button>
//         </GlassBox>
//       )}
//       {(destinations.length === 0 || destinations == null) && (
//         <Typography
//           variant="h4"
//           sx={{
//             textAlign: 'center',
//             width: '100%',
//             color: 'grey',
//             textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
//             mt: '5em',
//           }}
//         >
//           No Routes
//         </Typography>
//       )}
//     </GlassBox>
//   );
// };
