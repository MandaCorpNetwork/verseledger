// import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
// import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
// import { Box, Checkbox } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '@Redux/hooks';
// import { updateObjective } from '@Redux/Slices/Routes/actions/objective.action';
// import { selectMissionByObjectiveId } from '@Redux/Slices/Routes/routes.selectors';
// import React from 'react';
// import { IDestination, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

// type ObjectiveProps = {
//   active: boolean;
//   objective: IObjective;
//   destination: IDestination;
// };

// export const Objective: React.FC<ObjectiveProps> = ({
//   active,
//   objective,
//   destination,
// }) => {
//   const dispatch = useAppDispatch();
//   const isPickup = objective.pickup.id === destination.location.id;
//   const mission = useAppSelector(selectMissionByObjectiveId(objective.packageId));

//   const handleCheckboxChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const isChecked = e.target.checked;
//       const updatedObjective = isPickup
//         ? { ...objective, status: 'OBTAINED' as const }
//         : { ...objective, status: 'COMPLETED' as const };
//       const undoneObjective = { ...objective, status: 'INTERUPTED' as const };
//       if (mission) {
//         if (isChecked) {
//           dispatch(
//             updateObjective({
//               objective: updatedObjective,
//               missionId: mission.missionId,
//               destinationId: destination.id,
//             }),
//           );
//         } else {
//           dispatch(
//             updateObjective({
//               objective: undoneObjective,
//               missionId: mission.missionId,
//               destinationId: destination.id,
//             }),
//           );
//         }
//       }
//     },
//     [dispatch, mission, destination.id, objective, isPickup],
//   );
//   return (
//     <DigiDisplay
//       data-testid={`RouteTool-RouteViewer__Objective_${active}Active_Wrapper`}
//       sx={{
//         flexDirection: 'row',
//         width: '100%',
//         justifyContent: 'space-between',
//         py: '.2em',
//         flexShrink: 0,
//       }}
//     >
//       {active && <Checkbox color="secondary" onChange={handleCheckboxChange} />}
//       <Box
//         data-testid="RouteTool-RouteViewer-Objective__Details_Wrapper"
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           flexGrow: 1,
//           justifyContent: 'space-around',
//           px: '.2em',
//         }}
//       >
//         <DigiField
//           data-testid="RouteTool-RouteViewer-Objective-Details__Type"
//           label="Objective"
//           slots={{
//             typography: {
//               sx: {
//                 color: !isPickup ? 'error.main' : 'success.main',
//               },
//             },
//           }}
//         >
//           {isPickup ? 'Pickup' : 'DropOff'}
//         </DigiField>
//         <DigiField
//           data-testid="RouteTool-RouteViewer-Objective-Details__PackageId"
//           label="Package Id"
//         >
//           #{objective.packageId}
//         </DigiField>
//         <DigiField
//           data-testid="RouteTool-RouteViewer-Objective-Details__Contents"
//           label="Contents"
//         >
//           {objective.contents}
//         </DigiField>
//         <DigiField
//           data-testid="RouteTool-RouteViewer-Objective-Details__SCU"
//           label="SCU"
//           sx={{ minWidth: '50px' }}
//         >
//           {objective.scu}
//         </DigiField>
//       </Box>
//     </DigiDisplay>
//   );
// };
