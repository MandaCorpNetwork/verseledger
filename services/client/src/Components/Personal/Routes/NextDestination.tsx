import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
import { Typography } from '@mui/material';
import React from 'react';

import { IDelivery, Objective } from './Objective';

export const NextDestination: React.FC = () => {
  return (
    <DigiBox
      data-testid="RouteTool-RouteViewer__NextDestination_Container"
      sx={{ p: '.5em', gap: '.5em' }}
    >
      <DigiDisplay data-testid="RouteTool-RouteViewer-NextDestination__Title_Wrapper">
        <Typography data-testid="RouteTool-RouteViewer-NextDestination_Title">
          Next Destination:
        </Typography>
      </DigiDisplay>
      <DigiDisplay
        data-testid="RouteTool-RouteViewer-NextDestination__Information_Container"
        sx={{ flexDirection: 'row' }}
      >
        <ReadOnlyField label="Local Time" />
        <ReadOnlyField label="Distance" />
        <ReadOnlyField label="Est. Travel Time" />
      </DigiDisplay>
      <PopupFormDisplay
        data-testid="RouteTool-RouteViewer-NextDestination__ObjectiveList_Wrapper"
        sx={{
          p: '.5em',
          maxHeight: '120px',
          flexDirection: 'column',
          overflow: 'auto',
          display: 'flex',
          gap: '.5em',
        }}
      >
        {testObjectives.map((objective) => (
          <Objective
            key={objective.packageId}
            active={false}
            objectiveType="Delivery"
            objective={objective as unknown as IDelivery}
          />
        ))}
      </PopupFormDisplay>
    </DigiBox>
  );
};

const testObjectives = [
  {
    type: 'Drop-Off',
    packageId: '554653',
    mission: '655343',
    contents: 'Copper',
    scu: '5',
  },
  {
    type: 'Pickup',
    packageId: '877564',
    mission: '936654',
    contents: 'Unknown',
    scu: '1',
  },
  {
    type: 'Drop-Off',
    packageId: '778475',
    mission: '887893',
    contents: 'Unknown',
    scu: '1',
  },
];
