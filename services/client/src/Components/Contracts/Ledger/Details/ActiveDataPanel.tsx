import { Avatar, Box, Chip, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
type ContractorProps = {
  userName: string;
  profilePicture: string;
  ship?: string;
};

const Contractor: React.FC<ContractorProps> = ({ userName, profilePicture, ship }) => {
  return (
    <Box
      data-testid="ActiveData-ContractorPanel-ContractorList__ContractorContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        my: '.2em',
      }}
    >
      <Box
        data-testid="ActiveData-ContractorPanel-ContractorList__ContractorWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'rgba(14,49,141,.25)',
          borderRadius: '10px',
          p: '.2em',
          width: '50%',
          justifyContent: 'space-around',
          alignContent: 'center',
        }}
      >
        <Chip
          data-testid="ActiveData-ContractorPanel-ContractorList-Contractor__UserChip"
          avatar={<Avatar src={profilePicture} />}
          label={userName}
          color="secondary"
          variant="outlined"
        />
        <Box
          sx={{
            my: 'auto',
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'text.secondary' }}
          >
            Ship: {ship}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

type ContractorPanelProps = {
  contract: IContract;
};

export const ContractorsPanel: React.FC<ContractorPanelProps> = ({ contract }) => {
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
            backgroundColor: 'rgba(14,49,141,.25)',
            borderRadius: '10px',
          }}
        >
          <Box
            data-testid="ContractBriefing-ActiveData-ContractorPanel__CountBarWrapper"
            sx={{
              display: 'inherit',
              flexDirection: 'inherit',
              justifyContent: 'space-around',
              width: '100%',
              alignContent: 'center',
            }}
          >
            <Typography
              data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ActiveContractorsCount"
              variant="body2"
              sx={{
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
                fontWeight: 'bold',
                color: 'text.secondary',
              }}
            >
              Contractor Limit:{' '}
              {contract.contractorLimit ? contract.contractorLimit : 'No Limit'}
            </Typography>
          </Box>
        </Box>
        <Box
          data-testid="ContractBriefing-ActiveData-ContratorPanel__ContractorListContainer"
          sx={{
            width: '100%',
            height: '85%',
            overflow: 'auto',
            mt: '.5em',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgb(8, 29, 68)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '20px',
              background: 'rgb(121, 192, 244, .5)',
            },
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
            {contractors.map((contractors) => (
              <Contractor
                key={contractors.id}
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
