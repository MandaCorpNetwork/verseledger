import { useSoundEffect } from '@Audio/AudioManager';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import {
  ArrowDropDown,
  ArrowDropUp,
  ExpandMoreTwoTone,
  RunningWithErrorsTwoTone,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid2,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { updateDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import { selectTasks } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IDestination, ITask, ITaskStatus } from 'vl-shared/src/schemas/RoutesSchema';

import { getSiblingDestinations } from '../../RouteUtilities';
import { DestinationTask } from './DestinationTask';

type TableRowProps = {
  destination: IDestination;
  list: IDestination[];
  distance: string;
  draggable?: boolean;
  ['data-testid']?: string;
};

export const DestinationTableRow: React.FC<TableRowProps> = ({
  destination,
  distance,
  list: destinations,
  draggable,
  'data-testid': testid = 'TableRow',
}) => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const taskArray = useAppSelector(selectTasks);

  const getIndex = React.useCallback(
    (destinations: IDestination[]) => {
      return destinations.findIndex((dest) => dest.id === destination.id);
    },
    [destination],
  );

  const hideReason = useMediaQuery('(max-width: 1200px)');
  const hideTasks = useMediaQuery('(max-width: 1090px)');
  const taskValidationHelper = React.useCallback(
    (tasks: ITask[], stopNumber: number, destinations: IDestination[]) => {
      return tasks.map((task) => {
        const siblingDestinations = getSiblingDestinations(task, destinations);
        if (task.type === 'pickup') {
          const isInterupted = siblingDestinations.some(
            (sibling) => stopNumber > sibling.stopNumber,
          );
          if (isInterupted) {
            return { ...task, status: 'INTERUPTED' as ITaskStatus };
          } else {
            const status = task.status === 'INTERUPTED' ? 'PENDING' : task.status;
            return { ...task, status: status };
          }
        }
        if (task.type === 'dropoff') {
          const isInterupted = siblingDestinations.some(
            (sibling) =>
              stopNumber < sibling.stopNumber &&
              sibling.tasks.some(
                (t) => t.relationId === task.relationId && t.type === 'pickup',
              ),
          );
          if (isInterupted) {
            return { ...task, status: 'INTERUPTED' as ITaskStatus };
          } else {
            const status = task.status === 'INTERUPTED' ? 'PENDING' : task.status;
            return { ...task, status: status };
          }
        }
        return task;
      });
    },
    [],
  );

  const validateDestObjectives = React.useCallback(
    (destinations: IDestination[]) => {
      const updatedDestinations: IDestination[] = [];

      destinations.forEach((dest) => {
        const tempDest = { ...dest };
        tempDest.tasks = taskValidationHelper(
          tempDest.tasks,
          tempDest.stopNumber,
          destinations,
        );
        updatedDestinations.push(tempDest);
      });
      return updatedDestinations;
    },
    [taskValidationHelper],
  );

  const getReorderedDestinations = React.useCallback(
    (
      targetIdx: number,
      targetStop: number,
      currentIdx: number,
      direction: 'up' | 'down',
      destinations: IDestination[],
    ) => {
      if (direction === 'up') {
        return destinations.map((dest, index) => {
          if (index < targetIdx) return dest;
          else if (index === currentIdx) return { ...dest, stopNumber: targetStop };
          else if (index === targetIdx) return { ...dest, stopNumber: targetStop + 1 };
          else return { ...dest, stopNumber: Math.abs(targetIdx - index) + targetStop };
        });
      } else {
        return destinations.map((dest, index) => {
          if (index < currentIdx) return dest;
          else if (index === targetIdx) return { ...dest, stopNumber: targetStop - 1 };
          else if (index === currentIdx) return { ...dest, stopNumber: targetStop };
          else return { ...dest, stopNumber: Math.abs(targetIdx - index) + targetStop };
        });
      }
    },
    [],
  );

  const handleReorder = React.useCallback(
    (direction: 'up' | 'down') => {
      const currentIdx = getIndex(destinations);
      // Prevent Moving Top Item Up or Bottom Item Down
      if (
        (currentIdx === 0 && direction === 'up') ||
        (currentIdx === destinations.length - 1 && direction === 'down')
      ) {
        sound.playSound('denied');
        return;
      }

      // Define Variables
      const targetIdx = direction == 'up' ? currentIdx - 1 : currentIdx + 1;
      const targetIdxStopNum = destinations[targetIdx].stopNumber;
      const targetStop = targetIdxStopNum > 0 ? targetIdxStopNum : 1;

      // Get updatedDestinations Array
      const updatedDestinations = getReorderedDestinations(
        targetIdx,
        targetStop,
        currentIdx,
        direction,
        destinations,
      );

      const validatedDestinations = validateDestObjectives(updatedDestinations);

      // const updatedObjectives = extractTasks(validatedDestinations);

      // const updatedMissions = missions.map((mission) => {
      //   return {
      //     ...mission,
      //     objectives: mission.objectives.map((objective) => {
      //       const updatedPickup = updatedObjectives.find(
      //         (obj) => obj.id === objective.pickup.id,
      //       );
      //       const updatedDropoff = updatedObjectives.find(
      //         (obj) => obj.id === objective.dropoff.id,
      //       );
      //       return {
      //         ...objective,
      //         pickup: updatedPickup
      //           ? {
      //               ...updatedPickup,
      //             }
      //           : objective.pickup,
      //         dropoff: updatedDropoff
      //           ? {
      //               ...updatedDropoff,
      //             }
      //           : objective.dropoff,
      //       };
      //     }),
      //   };
      // });
      dispatch(updateDestinations(validatedDestinations));
      // dispatch(updateMissions(updatedMissions));
      // dispatch(updateTasks(updatedObjectives));
    },
    [
      sound,
      destinations,
      dispatch,
      getReorderedDestinations,
      getIndex,
      validateDestObjectives,
    ],
  );

  const pickupInterrupted = destination.tasks.some(
    (obj) => obj.type === 'pickup' && obj.status === 'INTERUPTED',
  );
  const dropoffInterrupted = destination.tasks.some(
    (obj) => obj.type === 'dropoff' && obj.status === 'INTERUPTED',
  );

  const getDistanceStyle = React.useCallback(() => {
    switch (true) {
      case distance.endsWith('Tm'):
        return {
          color: 'rgb(255,100,100)',
          textShadow: '1px 1px 3px rgba(255,100,100,0.8), 2px 2px 4px rgba(0,0,0)',
        };
      case distance.endsWith('Gm'):
        return {
          color: 'secondary.main',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0)',
        };
      case distance.endsWith('Mm'):
        return {
          color: 'rgb(60, 200, 252)',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0)',
        };
      case distance.endsWith('km'):
        return {
          color: 'rgb(90, 150, 243)',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0)',
        };
      case distance === 'Fluctuates':
        return {
          color: 'warning.main',
          textShadow: '1px 1px 3px rgba(247,207,87,0.8), 2px 2px 4px rgba(0,0,0)',
        };
      case distance === 'Redundant':
      case distance.startsWith('Err'):
      default:
        return {
          color: 'grey',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0)',
        };
    }
  }, [distance]);

  const distanceStyle = getDistanceStyle();

  return (
    <Accordion data-testid={`${testid}__Container`}>
      <AccordionSummary
        // data-testid={`${testid}__Summary`}
        expandIcon={<ExpandMoreTwoTone color="secondary" />}
        sx={{
          display: 'flex',
          width: '100%',
          position: 'relative',
        }}
      >
        {(pickupInterrupted || dropoffInterrupted) && (
          <RunningWithErrorsTwoTone
            sx={{
              color: 'error.main',
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          />
        )}
        <Grid2
          data-testid={`${testid}__Summary_Wrapper`}
          container
          columns={12}
          sx={{ width: '100%' }}
        >
          <Grid2
            size={4}
            data-testid={`${testid}__Destination_Wrapper`}
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            {draggable && (
              <div
                data-testid={`${testid}__Reorder_Wrapper`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  data-testid={`${testid}-Reorder__MoveUp_Button`}
                  size="small"
                  sx={{ p: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReorder('up');
                  }}
                >
                  <ArrowDropUp
                    data-testid={`${testid}-Reorder__MoveUp_Icon`}
                    sx={[
                      { color: 'text.secondary' },
                      dropoffInterrupted && { color: 'error.light' },
                    ]}
                  />
                </IconButton>
                <IconButton
                  data-testid={`${testid}-Reorder__MoveDown_Button`}
                  size="small"
                  sx={{ p: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReorder('down');
                  }}
                >
                  <ArrowDropDown
                    data-testid={`${testid}-Reorder__MoveDown_Icon`}
                    sx={[
                      { color: 'text.secondary' },
                      pickupInterrupted && { color: 'error.light' },
                    ]}
                  />
                </IconButton>
              </div>
            )}
            <Typography
              data-testid={`${testid}-Summary__DestinationStop`}
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: 'info.main',
                display: 'flex',
                gap: '0.5em',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {destination.stopNumber === 0 ? 'Unsorted' : `${destination.stopNumber}.`}
              <LocationChip
                data-testid={`${testid}__LocationChip`}
                locationId={destination.location.id}
                sx={{
                  maxWidth: '130px',
                }}
              />
            </Typography>
          </Grid2>
          {!hideReason && (
            <Grid2 size="grow" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography data-testid={`${testid}__StopReason`} color="info"></Typography>
            </Grid2>
          )}
          {!hideTasks && (
            <Grid2 size="grow" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                data-testid={`${testid}__TaskCount`}
                sx={{ color: 'text.secondary' }}
              >
                {`${destination.tasks.length} Task(s)`}
              </Typography>
            </Grid2>
          )}
          <Grid2
            size={2}
            offset="auto"
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography data-testid={`${testid}__Distance`} sx={distanceStyle}>
              {distance}
            </Typography>
          </Grid2>
        </Grid2>
      </AccordionSummary>
      <AccordionDetails sx={{ gap: '0.2em', display: 'flex', flexDirection: 'column' }}>
        {destination.tasks.map((task) => {
          console.log(task);
          return (
            <DestinationTask
              key={task.id}
              data-testid={`${testid}-ObjectiveList__Objective_${task.id}`}
              task={task}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
