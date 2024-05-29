import { Avatar, Box, Chip, Typography } from '@mui/material';
import { Contractors } from '@Popups/CreateContract/pages/Contractors';

type ContractorProps = {
  id: string;
  userName: string;
  profilePicture: string;
  ship?: string;
};

const Contractor: React.FC<ContractorProps> = ({ userName, profilePicture, ship }) => {
  return (
    <Box data-testid="ActiveData-ContractorPanel-ContractorList__ContractorWrapper">
      <Chip
        data-testid="ActiveData-ContractorPanel-ContractorList-Contractor__UserChip"
        avatar={<Avatar src={profilePicture} />}
        label={userName}
        color="secondary"
        variant="outlined"
      />
      <Typography>{ship}</Typography>
    </Box>
  );
};

export const ContractorsPanel: React.FC = () => {
  const contractors = Object.values(testContractorsDB);
  return (
    <Box
      data-testid="ContractBriefing-ActiveData-ContractorPanel__Container"
      sx={{
        display: 'flex',
        flexDisplay: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        data-testid="ContractBriefing-ActiveData-ContractorPanel__Wrapper"
        sx={{
          width: '100%',
          height: '100%',
          p: '.5em',
        }}
      >
        <Box
          data-testid="ContractBriefing-ActiveData-ContractorPanel__CountBarContainer"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '10%',
          }}
        >
          <Box
            data-testid="ContractBriefing-ActiveData-ContractorPanel__CountBarWrapper"
            sx={{
              display: 'inherit',
              flexDirection: 'inherit',
              justifyContent: 'space-around',
              width: '100%',
              backgroundColor: 'rgba(14,49,141,.25)',
              borderRadius: '10px',
            }}
          >
            <Typography
              data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ActiveContractorsCount"
              variant="body2"
              sx={{
                my: 'auto',
                fontWeight: 'bold',
                color: 'text.secondary',
              }}
            >
              Active Contractors: X
            </Typography>
            <Typography
              data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ContractorLimitCount"
              variant="body2"
              sx={{
                my: 'auto',
                fontWeight: 'bold',
                color: 'text.secondary',
              }}
            >
              Contractor Limit: X
            </Typography>
          </Box>
        </Box>
        <Box
          data-testid="ContractBriefing-ActiveData-ContratorPanel__ContractorListContainer"
          sx={{
            width: '100%',
            height: '90%',
            overflow: 'auto',
            mt: '.5em',
          }}
        >
          <Box
            data-testid="ContractBriefing-ActiveData-ContractorPanel-ContractorList__Wrapper"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {contractors.map((contractor) => (
              <Contractor
                key={contractors.id}
                id={contractors.id}
                userName={contractors.name}
                profilePicture={contractors.profilePicture}
                ship="InDev"
              />
            ))}
          </Box>
        </Box>
      </Box>
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
