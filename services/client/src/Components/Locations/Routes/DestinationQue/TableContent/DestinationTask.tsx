import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import {
  AirlineStopsTwoTone,
  ArrowCircleUpTwoTone,
  ArrowDropDownCircleTwoTone,
} from '@mui/icons-material';
import { Button, Popover, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectMissions } from '@Redux/Slices/Routes/routes.selectors';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';
import { ILogisticTransport, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

import { MoveObjective } from './MoveObjective';

type DestinationTaskProps = {
  objective: IObjective;
  ['data-testid']?: string;
};

export const DestinationTask: React.FC<DestinationTaskProps> = ({
  objective,
  'data-testid': testid = 'DestinationTask',
}) => {
  const missions = useAppSelector(selectMissions);

  const isMissionObjective = objective.type === 'pickup' || objective.type === 'dropoff';

  const getParentMission = React.useCallback(() => {
    if (!isMissionObjective) return;

    return missions.find((mission) =>
      mission.objectives.some(
        (obj) => obj.pickup.id === objective.id || obj.dropoff.id === objective.id,
      ),
    );
  }, [isMissionObjective, missions, objective.id]);

  const parentMission = getParentMission();

  const getParentObjective = React.useCallback(() => {
    if (!parentMission) return;
    return parentMission.objectives.find(
      (obj) => obj.pickup.id === objective.id || obj.dropoff.id === objective.id,
    );
  }, [parentMission, objective.id]);

  const parentObjective = getParentObjective();

  const getTypeIcon = React.useCallback(() => {
    switch (objective.type) {
      case 'pickup':
        return <ArrowCircleUpTwoTone color="inherit" />;
      case 'dropoff':
        return <ArrowDropDownCircleTwoTone color="inherit" />;
      case 'stop':
      default:
        return <AirlineStopsTwoTone color="inherit" />;
    }
  }, [objective.type]);

  const getTypeColor = React.useCallback(() => {
    switch (objective.type) {
      case 'pickup':
        return 'success.main';
      case 'dropoff':
        return 'warning.main';
      case 'stop':
      default:
        return 'info.main';
    }
  }, [objective.type]);

  const getTypeLabel = React.useCallback(() => {
    switch (objective.type) {
      case 'pickup':
        return 'Pickup';
      case 'dropoff':
        return 'Dropoff';
      case 'stop':
      default:
        return 'Stop';
    }
  }, [objective.type]);

  const getTypeDisplay = React.useCallback(() => {
    const icon = getTypeIcon();
    const color = getTypeColor();
    const label = getTypeLabel();

    return (
      <Typography
        data-testid={`${testid}__Type`}
        sx={{ color: color, display: 'flex', gap: '0.3em' }}
      >
        {icon} {label}
      </Typography>
    );
  }, [getTypeIcon, getTypeColor, getTypeLabel, testid]);

  const typeDisplay = getTypeDisplay();

  const moveDestinationPopup = usePopupState({
    variant: 'popover',
    popupId: 'moveDestinationPopup',
  });

  const renderMoveDestinationPopup = () => (
    <Popover
      {...bindPopover(moveDestinationPopup)}
      data-testid={`${testid}__MoveDestination_Popper_${objective.id}`}
      sx={{ p: '1em' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'transparent',
            p: '0.5em',
            backdropFilterfilter: 'blur(20px)',
            backgroundImage:
              'linear-gradient(165deg, rgba(8,22,80,0.5), rgba(0,1,19,0.2))',
          },
        },
      }}
    >
      <MoveObjective
        data-testid={`${testid}-MoveDestination__${objective.id}_Core`}
        objective={objective}
        mission={parentMission}
      />
    </Popover>
  );
  return (
    <PopupFormSelection
      data-testid={`${testid}__root`}
      sx={{ position: 'relative', py: '0.2em', justifyContent: 'space-around' }}
    >
      <Typography
        data-testid={`${testid}__Label`}
        sx={{ color: 'text.primary', textShadow: '0 4px 4px rgba(0,0,0)' }}
      >
        {isMissionObjective ? `Package ${parentObjective!.label}` : objective.label}
      </Typography>
      {typeDisplay}
      {isMissionObjective && (
        <Typography
          data-testid={`${testid}__SCU`}
          sx={{
            color: 'text.primary',
            textShadow: '0 4px 4px rgba(0,0,0)',
          }}
        >{`${(parentObjective! as ILogisticTransport).scu ?? ''} SCU`}</Typography>
      )}
      {isMissionObjective && (
        <Typography
          data-testid={`${testid}__MissionLabel`}
          sx={{
            color: 'info.light',
            textShadow: '0 4px 4px rgba(0,0,0)',
          }}
        >{`Mission: ${parentMission!.label}`}</Typography>
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
