import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { Box, Checkbox } from '@mui/material';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

type ObjectiveProps = {
  active: boolean;
  objectiveType: 'Contract' | 'Delivery' | 'Order' | 'Custom';
  objective: IDelivery | IContract;
};

export type IDelivery = {
  type: 'Pickup' | 'Drop-Off';
  packageId: string;
  mission: string;
  contents: string;
  scu: number;
  pickupLocation?: ILocation;
  dropOffLocation?: ILocation;
};

export const Objective: React.FC<ObjectiveProps> = ({
  active,
  objectiveType,
  objective,
}) => {
  const isDelivery = (_objective: IDelivery | IContract): _objective is IDelivery =>
    objectiveType === 'Delivery';
  return (
    <DigiDisplay
      data-testid={`RouteTool-RouteViewer__Objective_${active}Active_Wrapper`}
      sx={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        py: '.2em',
        flexShrink: 0,
      }}
    >
      {active && <Checkbox color="secondary" />}
      {isDelivery(objective) && (
        <Box
          data-testid="RouteTool-RouteViewer-Objective__Details_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'space-between',
            px: '.2em',
          }}
        >
          <DigiField
            data-testid="RouteTool-RouteViewer-Objective-Details__Type"
            label="Objective"
            slots={{
              typography: {
                sx: {
                  color: objective.type === 'Drop-Off' ? 'error.main' : 'success.main',
                },
              },
            }}
          >
            {objective.type}
          </DigiField>
          <DigiField
            data-testid="RouteTool-RouteViewer-Objective-Details__PackageId"
            label="Package Id"
          >
            #{objective.packageId}
          </DigiField>
          <DigiField
            data-testid="RouteTool-RouteViewer-Objective-Details__MissionId"
            label="Mission"
          >
            #{objective.mission}
          </DigiField>
          <DigiField
            data-testid="RouteTool-RouteViewer-Objective-Details__Contents"
            label="Contents"
          >
            {objective.contents}
          </DigiField>
          <DigiField
            data-testid="RouteTool-RouteViewer-Objective-Details__SCU"
            label="SCU"
          >
            {objective.scu}
          </DigiField>
        </Box>
      )}
    </DigiDisplay>
  );
};
