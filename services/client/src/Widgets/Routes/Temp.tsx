// import { DigiBox } from '@CommonLegacy/Components/Boxes/DigiBox';
// import DigiDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
// import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
// import { DigiField } from '@CommonLegacy/Components/Custom/DigiField/DigiField';
// import { ReadOnlyField } from '@CommonLegacy/Components/TextFields/ReadOnlyField';
// import { DoubleArrow } from '@mui/icons-material';
// import { Box, Button, Checkbox, Typography } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '@Redux/hooks';
// import { deleteDestination } from '@Redux/Slices/Routes/actions/destination.action';
// import {
//   selectDestinations,
//   selectMissions,
// } from '@Redux/Slices/Routes/routes.selectors';
// import { closeWidget } from '@Redux/Slices/Widgets/widgets.actions';
// import { VLWidget } from '@Widgets/WidgetWrapper/WidgetWrapper';
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Float3, MathX } from 'vl-shared/src/math';
// import { IObjective } from 'vl-shared/src/schemas/RoutesSchema';

// export const WIDGET_ROUTES = 'routes';

// export const RoutesWidget: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleClose = React.useCallback(() => {
//     dispatch(closeWidget(WIDGET_ROUTES));
//   }, [dispatch]);

//   const destinations = useAppSelector(selectDestinations);

//   const currentDestination = destinations[0];

//   const nextDestination = destinations[1];

//   const destinationCount = destinations.length;

//   const missions = useAppSelector(selectMissions);

//   const findMission = React.useCallback(
//     (objectiveId: number) => {
//       return missions.find((mission) =>
//         mission.objectives.some((objective) => objective.packageId === objectiveId),
//       );
//     },
//     [missions],
//   );

//   const checkPickup = React.useCallback(
//     (pickupId: string) => {
//       if (currentDestination == null) return;
//       if (pickupId === currentDestination.location.id) {
//         return true;
//       } else {
//         return false;
//       }
//     },
//     [currentDestination],
//   );

//   const handleCheckboxChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>, objective: IObjective) => {
//       const isChecked = e.target.checked;
//       if (currentDestination == null) return;
//       const updatedObjective = checkPickup(objective.pickup.id)
//         ? { ...objective, status: 'OBTAINED' as const }
//         : { ...objective, status: 'COMPLETED' as const };
//       const undoneObjective = { ...objective, status: 'INTERUPTED' as const };
//       const mission = findMission(objective.packageId);
//       if (mission) {
//         if (isChecked) {
//           dispatch(
//             updateObjective({
//               objective: updatedObjective,
//               missionId: mission.missionId,
//               destinationId: currentDestination.id,
//             }),
//           );
//         } else {
//           dispatch(
//             updateObjective({
//               objective: undoneObjective,
//               missionId: mission.missionId,
//               destinationId: currentDestination.id,
//             }),
//           );
//         }
//       }
//     },
//     [dispatch, findMission, currentDestination, checkPickup],
//   );

//   const handleOpenRoutes = React.useCallback(() => {
//     navigate('/dashboard/routes');
//   }, [navigate]);

//   const nextStopEnabled = React.useCallback(() => {
//     if (!destinations || destinations.length === 0) return true;
//     if (destinations.length > 0) {
//       if (currentDestination.objectives) {
//         return currentDestination.objectives.some(
//           (obj) =>
//             (obj.pickup.id === currentDestination.location.id &&
//               obj.status === 'OBTAINED') ||
//             (obj.dropOff.id === currentDestination.location.id &&
//               obj.status === 'COMPLETED'),
//         );
//       } else {
//         return true;
//       }
//     }
//   }, [destinations, currentDestination]);

//   const allowNextStop = nextStopEnabled();

//   const handleDeleteDestination = React.useCallback(() => {
//     if (currentDestination == null) return;
//     dispatch(deleteDestination(currentDestination.id));
//   }, [dispatch, currentDestination]);

//   const getDistance = React.useCallback(() => {
//     if (currentDestination == null || nextDestination == null) return;
//     const posA = new Float3(
//       currentDestination.location.x,
//       currentDestination.location.y,
//       currentDestination.location.z,
//     );
//     const posB = new Float3(
//       nextDestination.location.x,
//       nextDestination.location.y,
//       nextDestination.location.z,
//     );
//     const floatDistance = MathX.distance(posA, posB);
//     const absDistance = Math.abs(floatDistance);

//     if (absDistance >= 1_000_000) {
//       return `${(absDistance / 1_000_000).toFixed(2)} Gkm`;
//     } else if (absDistance >= 1_000) {
//       return `${(absDistance / 1_000).toFixed(2)} Mkm`;
//     } else {
//       return `${absDistance.toFixed(2)} km`;
//     }
//   }, [currentDestination, nextDestination]);

//   const formattedDistance = getDistance();
//   return (
//     <VLWidget
//       name={WIDGET_ROUTES}
//       title="Route"
//       onClose={handleClose}
//       data-testid="RoutesWidget"
//     >
//       {destinations.length > 0 ? (
//         <Box
//           sx={{
//             py: '1em',
//             px: '.5em',
//             gap: '.5em',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <DigiDisplay sx={{ flexDirection: 'row', py: '.2em', px: '.5em', gap: '.5em' }}>
//             <Typography variant="body2" color="info">
//               {currentDestination.reason}
//             </Typography>
//             <Typography>Current Location:</Typography>
//             <LocationChip locationId={currentDestination.location.id} />
//           </DigiDisplay>
//           {currentDestination.objectives &&
//             currentDestination.objectives.map((obj) => (
//               <ComponentContainer
//                 key={obj.packageId}
//                 sx={{ flexDirection: 'row', justifyContent: 'space-between', px: '.5em' }}
//               >
//                 <Checkbox onChange={(e) => handleCheckboxChange(e, obj)} />
//                 <DigiField
//                   label="Objective"
//                   slots={{
//                     typography: {
//                       sx: {
//                         color: checkPickup(obj.pickup.id) ? 'success.main' : 'error.main',
//                       },
//                     },
//                   }}
//                 >
//                   {checkPickup(obj.pickup.id) ? 'Pickup' : 'DropOff'}
//                 </DigiField>
//                 <DigiField label="Package Id">{obj.packageId}</DigiField>
//               </ComponentContainer>
//             ))}
//           <DigiDisplay sx={{ flexDirection: 'row', py: '.2em', px: '.5em', gap: '.5em' }}>
//             <Typography variant="body2" color="info">
//               {nextDestination.reason}
//             </Typography>
//             <Typography>Next Location:</Typography>
//             <LocationChip locationId={nextDestination.location.id} />
//           </DigiDisplay>
//           <ComponentContainer>
//             <ReadOnlyField label="Distance" value={formattedDistance} />
//           </ComponentContainer>
//           <ComponentContainer sx={{ flexDirection: 'column', p: '.2em' }}>
//             <Typography align="center">Stops Remaining: {destinationCount}</Typography>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 width: '100%',
//                 justifyContent: 'space-between',
//                 px: '1em',
//               }}
//             >
//               <Button
//                 variant="contained"
//                 size="small"
//                 color="secondary"
//                 disabled={location.pathname === '/dashboard/routes'}
//                 onClick={handleOpenRoutes}
//               >
//                 Open Routes
//               </Button>
//               <Button
//                 variant="contained"
//                 color="success"
//                 endIcon={<DoubleArrow />}
//                 disabled={!allowNextStop}
//                 onClick={handleDeleteDestination}
//               >
//                 {destinationCount > 1 ? 'Next Stop' : 'Complete Route'}
//               </Button>
//             </Box>
//           </ComponentContainer>
//         </Box>
//       ) : (
//         <Box sx={{ p: '.5em', display: 'flex', flexDirection: 'column' }}>
//           <Typography
//             variant="h6"
//             sx={{
//               textAlign: 'center',
//               width: '100%',
//               color: 'grey',
//               textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
//             }}
//           >
//             No Route
//           </Typography>
//           <Button
//             fullWidth
//             variant="contained"
//             size="small"
//             color="secondary"
//             disabled={location.pathname === '/dashboard/routes'}
//             onClick={handleOpenRoutes}
//           >
//             Open Routes
//           </Button>
//         </Box>
//       )}
//     </VLWidget>
//   );
// };
