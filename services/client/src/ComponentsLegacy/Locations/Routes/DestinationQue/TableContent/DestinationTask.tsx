import { PopupFormSelection } from '@CommonLegacy/Components/Boxes/PopupFormSelection';
import {
  AirlineStopsTwoTone,
  ArrowCircleUpTwoTone,
  ArrowDropDownCircleTwoTone,
} from '@mui/icons-material';
import { Button, Popover, Typography } from '@mui/material';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';
import type { ITask } from 'vl-shared/src/schemas/RoutesSchema';

import { MoveTask } from './MoveTask';

type DestinationTaskProps = {
  task: ITask;
  ['data-testid']?: string;
};

export const DestinationTask: React.FC<DestinationTaskProps> = ({
  task,
  'data-testid': testid = 'DestinationTask',
}) => {
  const isMissionObjective = task.type === 'pickup' || task.type === 'dropoff';

  const getTypeIcon = React.useCallback(() => {
    switch (task.type) {
      case 'pickup':
        return <ArrowCircleUpTwoTone color="inherit" />;
      case 'dropoff':
        return <ArrowDropDownCircleTwoTone color="inherit" />;
      default:
        return <AirlineStopsTwoTone color="inherit" />;
    }
  }, [task.type]);

  const getTypeColor = React.useCallback(() => {
    switch (task.type) {
      case 'pickup':
        return 'success.main';
      case 'dropoff':
        return 'warning.main';
      default:
        return 'info.main';
    }
  }, [task.type]);

  const getTypeLabel = React.useCallback(() => {
    switch (task.type) {
      case 'pickup':
        return 'Pickup';
      case 'dropoff':
        return 'Dropoff';
      default:
        return 'Stop';
    }
  }, [task.type]);

  const getTypeDisplay = React.useCallback(() => {
    const icon = getTypeIcon();
    const color = getTypeColor();
    const label = getTypeLabel();

    return (
      <Typography
        data-testid={`${testid}__Type`}
        sx={[
          { color: color, display: 'flex', gap: '0.3em' },
          task.status === 'INTERUPTED' && { color: 'error.light' },
        ]}
      >
        {icon} {label}
      </Typography>
    );
  }, [getTypeIcon, getTypeColor, getTypeLabel, testid, task.status]);

  const typeDisplay = getTypeDisplay();

  const moveDestinationPopup = usePopupState({
    variant: 'popover',
    popupId: 'moveDestinationPopup',
  });

  const renderMoveDestinationPopup = () => (
    <Popover
      {...bindPopover(moveDestinationPopup)}
      data-testid={`${testid}__MoveDestination_Popper_${task.id}`}
      sx={{ p: '1em' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'transparent',
            p: '0.5em',
            backdropFilterfilter: 'blur(20px)',
            backgroundImage:
              'linear-gradient(165deg, rgba(8,22,80,0.5), rgba(0,1,19,0.2))',
          },
        },
      }}
    >
      <MoveTask data-testid={`${testid}-MoveDestination__${task.id}_Core`} task={task} />
    </Popover>
  );
  return (
    <PopupFormSelection
      data-testid={`${testid}__root`}
      sx={[
        {
          position: 'relative',
          py: '0.35em',
          justifyContent: 'space-around',
          my: '0.2em',
          cursor: 'default',
        },
        task.status === 'INTERUPTED' && {
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
          borderColor: 'rgba(255, 0, 0, 0.8)',
          '&:hover': {
            borderColor: 'rgba(255, 0, 0, 0.8)',
            boxShadow: '0 0 10px 5px rgba(255, 0, 0, 0.8)',
          },
        },
      ]}
    >
      <Typography
        data-testid={`${testid}__Label`}
        sx={{
          color: 'text.primary',
          textShadow: '0 4px 4px rgba(0,0,0)',
          cursor: 'inherit',
        }}
      >
        {isMissionObjective ? `Package ${task.label}` : task.label}
      </Typography>
      {typeDisplay}
      {isMissionObjective && (
        <Typography
          data-testid={`${testid}__SCU`}
          sx={{
            color: 'text.primary',
            textShadow: '0 4px 4px rgba(0,0,0)',
            cursor: 'inherit',
          }}
        >{`${task.scu ?? ''} SCU`}</Typography>
      )}
      {isMissionObjective && (
        <Typography
          data-testid={`${testid}__MissionLabel`}
          sx={{
            color: 'info.light',
            textShadow: '0 4px 4px rgba(0,0,0)',
            cursor: 'inherit',
          }}
        >{`Mission: ${task.missionLabel}`}</Typography>
      )}
      <Button
        data-testid={`${testid}__MoveObjective_Button`}
        {...bindTrigger(moveDestinationPopup)}
        variant="outlined"
        size="small"
        color="warning"
        sx={{
          backgroundImage:
            'linear-gradient(135deg, rgba(247,207,7,0.5), rgba(181,137,4,0.5) 35%)',
          textShadow: '0 2px 4px rgba(0,0,0,0.7)',
          boxShadow:
            '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.3)',
          transition:
            'background-image 0.4s ease-in-out, text-shadow 0.2s ease-in-out, boxShadow 0.3s ease-in-out, transform 0.2s ease',
          '&:hover': {
            backgroundImage:
              'linear-gradient(135deg, rgba(247,207,7,0.6), rgba(181,137,4,0.6) 55%)',
            textShadow: '0 2px 6px rgba(0,0,0,0.9)',
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.4)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        Move Objective
      </Button>
      {renderMoveDestinationPopup()}
      {!isMissionObjective && <Button>Remove Objective</Button>}
    </PopupFormSelection>
  );
};
