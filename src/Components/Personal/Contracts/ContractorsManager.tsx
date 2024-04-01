import { Avatar, Box, Button, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type ContractorProps = {
  id: number;
  name: string;
  profilePicture: string;
  isAccepted: boolean;
  isRejected: boolean;
  isDismissed: boolean;
  role: string;
  pay: string;
};

const Contractor: React.FC<ContractorProps> = ({ name, profilePicture }) => {
  const [contractorBidStatus, setContractorBidStatus] = useState<string | null>(null);

  const handleAccept = () => setContractorBidStatus('Accepted');
  const handleReject = () => setContractorBidStatus('Rejected');
  const handleDismiss = () => setContractorBidStatus('Dismissed');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <Avatar src={profilePicture} />
        {name}
      </Typography>
      {contractorBidStatus === null && (
        <>
          <Button color="error" onClick={handleReject}>
            Reject
          </Button>
          <Button color="success" onClick={handleAccept}>
            Accept
          </Button>
        </>
      )}
      {contractorBidStatus === 'Accepted' && (
        <>
          <Select></Select>
          <TextField></TextField>
          <Button color="error" onClick={handleDismiss}>
            Dismiss
          </Button>
        </>
      )}
      {contractorBidStatus === 'Rejected' && <Typography>Rejected</Typography>}
      {contractorBidStatus === 'Dismissed' && <Typography>Dismissed</Typography>}
    </Box>
  );
};

export const ContractorsManager: React.FC<unknown> = () => {
  const contractors = Object.values(testContractorsDB);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {contractors.map((contractor) => (
        <Contractor
          key={contractor.id}
          id={contractor.id}
          name={contractor.name}
          profilePicture={contractor.profilePicture}
        />
      ))}
    </Box>
  );
};

const testContractorsDB = {
  1: {
    id: 1,
    name: 'Test User',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  2: {
    id: 2,
    name: 'Test User 2',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  3: {
    id: 3,
    name: 'Test User 3',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  4: {
    id: 4,
    name: 'Test User 4',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  5: {
    id: 5,
    name: 'Test User 5',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  6: {
    id: 6,
    name: 'Test User 6',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  7: {
    id: 7,
    name: 'Test User 7',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  8: {
    id: 8,
    name: 'Test User 8',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  9: {
    id: 9,
    name: 'Test User 9',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  10: {
    id: 10,
    name: 'Test User 10',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
};
