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
  index: number;
  ['data-testid']?: string;
};
//VER-6

export const DestinationTableRow: React.FC<TableRowProps> = ({
  destination,
  distance,
  list: destinations,
  index: listPosition,
  draggable,
  'data-testid': testid = 'TableRow',
}) => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();

  const handleReorder = React.useCallback(
    (index: number, direction: 'up' | 'down') => {
      // Prevent Moving Top Item Up
      if (
        (index === 0 && direction === 'up') ||
        (index === destinations.length - 1 && direction === 'down')
      ) {
        sound.playSound('denied');
        return;
      }

      // Define the new Index Value
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      // Get updatedDestinations Array
      const updatedDestinations: IDestination[] = destinations.reduce<IDestination[]>(
        (acc, dest, idx) => {
          if (idx === index) {
            // If the Index eq set newIndex & Update Stop Number
            acc[idx] = { ...dest, stopNumber: newIndex + 1 };
          } else if (idx === newIndex) {
            // If the Index eq newIndex moves the Stop
            acc[idx] = { ...dest, stopNumber: index + 1 };
          } else {
            if (dest.stopNumber > index + 1 && dest.stopNumber <= newIndex + 1) {
              acc[idx] = { ...dest, stopNumber: dest.stopNumber - 1 };
            } else if (dest.stopNumber < index + 1 && dest.stopNumber >= newIndex + 1) {
              acc[idx] = { ...dest, stopNumber: dest.stopNumber + 1 };
            } else {
              acc[idx] = { ...dest };
            }
          }
          return acc;
        },
        [],
      );
      dispatch(updateDestinations(updatedDestinations));
    },
    [sound, destinations, dispatch],
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
                    handleReorder(listPosition, 'up');
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
                    handleReorder(listPosition, 'down');
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
