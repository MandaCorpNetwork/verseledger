import { useSoundEffect } from '@Audio/AudioManager';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { MoveDownTwoTone, MoveUpTwoTone } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import {
  deleteDestination,
  updateDestinations,
} from '@Redux/Slices/Routes/actions/destination.action';
import { selectDestinations } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

type MoveObjectiveProps = {
  objective: ITask;
  ['data-testid']?: string;
};

export const MoveObjective: React.FC<MoveObjectiveProps> = ({
  objective,
  'data-testid': testid = 'MoveObjectivePopper',
}) => {
  const destinations = useAppSelector(selectDestinations);

  const dispatch = useAppDispatch();
  const sound = useSoundEffect();

  const getDestination = React.useCallback(() => {
    return destinations.find((dest) =>
      dest.tasks.some((obj) => obj.id === objective.id),
    ) as IDestination;
  }, [destinations, objective]);

  const destination = getDestination();

  const getAvailableDestinations = React.useCallback(() => {
    if (!destination) return null;
    return destinations.filter(
      (dest) =>
        dest.location.id === destination.location.id && dest.id !== destination.id,
    );
  }, [destinations, destination]);

  const availableDestinations = getAvailableDestinations();

  // const getConflictDestinations = React.useCallback(() => {
  //   if (objective.type === 'pickup' || objective.type === 'dropoff') {
  //     if (!siblingDest) return null;
  //     if (objective.type === 'pickup') {
  //       return destinations.filter((dest) => dest.stopNumber >= siblingDest.stopNumber);
  //     } else {
  //       return destinations.filter((dest) => dest.stopNumber <= siblingDest.stopNumber);
  //     }
  //   }
  // }, [destinations, objective]);

  // const conflictDestinations = getConflictDestinations();

  // const newAvailable = destination.tasks.length !== 1;

  // const createNewDest = React.useCallback(() => {
  //   if (!newAvailable) return sound.playSound('error');
  //   const reason =
  //     objective.type === 'pickup' || objective.type === 'dropoff'
  //       ? 'Mission'
  //       : (objective.label ?? 'Stop');
  //   const newDest: IDestination = {
  //     id: createLocalID('D'),
  //     location: objective.location,
  //     stopNumber: 0,
  //     visited: false,
  //     reason,
  //     tasks: [{ ...objective, status: 'PENDING' }],
  //   };
  //   const updatedDests: IDestination[] = [];
  //   updatedDests.push({
  //     ...destination,
  //     tasks: destination.tasks.filter((obj) => obj.id !== objective.id),
  //   });
  //   if (objective.type === 'dropoff') {
  //     if (!siblingDest) return sound.playSound('error');

  //     newDest.stopNumber = siblingDest.stopNumber + 1;
  //     destinations.forEach((dest) => {
  //       if (dest.stopNumber >= newDest.stopNumber) {
  //         updatedDests.push({
  //           ...dest,
  //           stopNumber: dest.stopNumber + 1,
  //         });
  //       }
  //     });
  //   }
  //   dispatch(updateDestinations([newDest, ...updatedDests]));
  //   sound.playSound('loading');
  //   if (destination.tasks.length === 1) {
  //     dispatch(deleteDestination(destination.id));
  //   }
  // }, [destinations, dispatch, newAvailable, objective, siblingDest, sound, destination]);

  const moveObjective = React.useCallback(
    (newDest: IDestination) => {
      if (!destination) return sound.playSound('error');

      const updatedCurrent = {
        ...destination,
        objectives: destination.tasks.filter((obj) => obj.id !== objective.id),
      };

      const updatedObj: ITask = {
        ...objective,
        status: 'PENDING',
      };

      const updatedNew = {
        ...newDest,
        objectives: [...newDest.tasks, updatedObj],
      };
      dispatch(updateDestinations([updatedNew, updatedCurrent]));
      if (updatedCurrent.objectives.length === 0) {
        dispatch(deleteDestination(updatedCurrent.id));
      }
    },
    [sound, objective, destination, dispatch],
  );
  return (
    <div
      data-testid={`${testid}__Wrapper`}
      style={{ gap: '0.5em', display: 'flex', flexDirection: 'column' }}
    >
      <DigiDisplay data-testid={`${testid}__MoveList_Wrapper`} sx={{ p: '0.2em .4em' }}>
        <Typography
          data-testid={`${testid}-MoveList__Header`}
          sx={{ fontWeight: 'bold', cursor: 'default' }}
        >
          Movable Stops
        </Typography>
        {(!availableDestinations || availableDestinations.length === 0) && (
          <Typography
            data-testid={`${testid}-MoveList__EmptyList_Text`}
            sx={{ color: 'text.disabled', textShadow: '0px 2px 4px rgba(0,0,0)' }}
          >
            No Available Stops
          </Typography>
        )}
        {availableDestinations &&
          availableDestinations.map((dest) => {
            const moveIcon =
              dest.stopNumber >= destination.stopNumber ? (
                <MoveUpTwoTone color="inherit" />
              ) : (
                <MoveDownTwoTone color="inherit" />
              );
            // const disabled = conflictDestinations?.includes(dest);
            return (
              <Typography
                key={dest.id}
                data-testid={`${testid}-MoveList__MovableDest-${dest.id}_Text`}
                sx={{
                  // color: disabled ? 'text.disabled' : 'warning.light',
                  textShadow: '0px 2px 4px rgba(0,0,0)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Stop #{dest.stopNumber}
                <IconButton
                  data-testid={`${testid}-MoveList-MovableDest-${dest.id}__MoveButton`}
                  color="warning"
                  // disabled={disabled}
                  sx={{ color: 'warning.main' }}
                  onClick={() => moveObjective(dest)}
                >
                  {moveIcon}
                </IconButton>
              </Typography>
            );
          })}
      </DigiDisplay>
      <Button
        data-testid={`${testid}__NewDestination_Button`}
        variant="outlined"
        size="small"
        color="info"
        // disabled={!newAvailable}
        // onClick={createNewDest}
        sx={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,181,100,0.5), rgba(181,130,5,0.5) 35%)',
          textShadow: '0 2px 4px rgba(0,0,0,0.7)',
          boxShadow:
            '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.3)',
          transition:
            'background-image 0.4s ease-in-out, text-shadow 0.2s ease-in-out, boxShadow 0.3s ease-in-out, transform 0.2s ease',
          '&:hover': {
            backgroundImage:
              'linear-gradient(135deg, rgba(255,181,100,0.6), rgba(181,130,5,0.6) 55%)',
            textShadow: '0 2px 6px rgba(0,0,0,0.9)',
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.4)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        New Stop
      </Button>
    </div>
  );
};
