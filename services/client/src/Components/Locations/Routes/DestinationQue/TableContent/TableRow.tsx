import { useSoundEffect } from '@Audio/AudioManager';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { ArrowDropDown, ArrowDropUp, ExpandMoreTwoTone } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { updateDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

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

  const getIndex = React.useCallback(
    (destinations: IDestination[]) => {
      return destinations.findIndex((dest) => dest.id === destination.id);
    },
    [destination],
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
      dispatch(updateDestinations(updatedDestinations));
    },
    [sound, destinations, dispatch, getReorderedDestinations, getIndex],
  );

  return (
    <Accordion data-testid={`${testid}__Container`}>
      <AccordionSummary
        // data-testid={`${testid}__Summary`}
        expandIcon={<ExpandMoreTwoTone color="secondary" />}
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          data-testid={`${testid}__Summary_Wrapper`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 .2em',
          }}
        >
          <div
            data-testid={`${testid}__Destination_Wrapper`}
            style={{
              display: 'flex',
              gap: '0.5em',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
                    sx={{ color: 'text.secondary' }}
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
                    sx={{ color: 'text.secondary' }}
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
          </div>

          <Typography data-testid={`${testid}__StopReason`} color="info">
            {destination.reason}
          </Typography>
          <Typography
            data-testid={`${testid}__TaskCount`}
            sx={{ color: 'text.secondary' }}
          >
            {`${destination.objectives.length} Task(s)`}
          </Typography>
          <Typography data-testid={`${testid}__Distance`}>{distance}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {destination.objectives.map((obj) => {
          return (
            <DestinationTask
              key={obj.id}
              data-testid={`${testid}-ObjectiveList__Objective_${obj.id}`}
              objective={obj}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
