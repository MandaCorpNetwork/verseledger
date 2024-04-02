import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

type ManageShipProps = {
  id: number;
  shipName: string;
  owner: string;
  model: string;
  isOwned: boolean;
};

const Ship: React.FC<ManageShipProps> = ({ shipName, model, owner }) => {
  const [shipApprovalStatus] = useState<string | null>(null);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Button>{shipName}</Button>
      <Typography>{model}</Typography>
      <Typography sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <Avatar />
        {owner}
      </Typography>
      {shipApprovalStatus === null && (
        <Box>
          <Button>Approve</Button>
          <Button>Reject</Button>
        </Box>
      )}
      {shipApprovalStatus === 'Approved' && (
        <Box>
          <Typography>0/5 Crew</Typography>
          <Button>Invite</Button>
        </Box>
      )}
      {shipApprovalStatus === 'Rejected' && <Typography>Rejected</Typography>}
    </Box>
  );
};

export const FleetAllocation: React.FC<unknown> = () => {
  const fleet = Object.values(testFleetDB);
  return (
    <Box>
      <Button>Contribute</Button>
      <Box>
        {fleet.map((ship) => (
          <Ship
            key={ship.shipName}
            shipName={ship.shipName}
            model={ship.model}
            owner={ship.owner}
            isOwned={ship.isOwned}
            id={ship.id}
          />
        ))}
      </Box>
    </Box>
  );
};

const testFleetDB = {
  ship1: {
    id: 1,
    shipName: 'ship1',
    model: 'model1',
    owner: 'owner1',
    isOwned: true,
  },
  ship2: {
    id: 2,
    shipName: 'ship2',
    model: 'model2',
    owner: 'owner2',
    isOwned: false,
  },
  ship3: {
    id: 3,
    shipName: 'ship3',
    model: 'model3',
    owner: 'owner3',
    isOwned: false,
  },
  ship4: {
    id: 4,
    shipName: 'ship4',
    model: 'model4',
    owner: 'owner4',
    isOwned: false,
  },
  ship5: {
    id: 5,
    shipName: 'ship5',
    model: 'model5',
    owner: 'owner5',
    isOwned: false,
  },
  ship6: {
    id: 6,
    shipName: 'ship6',
    model: 'model6',
    owner: 'owner6',
    isOwned: false,
  },
  ship7: {
    id: 7,
    shipName: 'ship7',
    model: 'model7',
    owner: 'owner7',
    isOwned: false,
  },
  ship8: {
    id: 8,
    shipName: 'ship8',
    model: 'model8',
    owner: 'owner8',
    isOwned: false,
  },
  ship9: {
    id: 9,
    shipName: 'ship9',
    model: 'model9',
    owner: 'owner9',
    isOwned: false,
  },
  ship10: {
    id: 10,
    shipName: 'ship10',
    model: 'model10',
    owner: 'owner10',
    isOwned: false,
  },
};
