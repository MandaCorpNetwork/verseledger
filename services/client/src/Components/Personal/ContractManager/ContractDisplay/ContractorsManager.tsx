import { OutlinedLabel } from '@Common/Components/App/OutlinedLabel';
import { Avatar, Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { POPUP_USER_INVITE } from '@Popups/UserInvite/UserInvite';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useState } from 'react';

type ContractorProps = {
  id: string;
  userName: string;
  profilePicture: string;
  pay: string;
};

const Contractor: React.FC<ContractorProps> = ({ userName, profilePicture, pay }) => {
  const [contractorBidStatus, setContractorBidStatus] = useState<string | null>(null);

  const handleAccept = () => setContractorBidStatus('Accepted');
  const handleReject = () => setContractorBidStatus('Rejected');
  const handleDismiss = () => setContractorBidStatus('Dismissed');

  const dispatch = useAppDispatch();

  const handlePlayerCardOpen = () => {
    dispatch(openPopup(POPUP_PLAYER_CARD));
  };

  return (
    <Box
      data-testid="ContractorsTab-ContractorList__ContractorBox"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        my: '.5em',
        backgroundColor: 'rgba(14,49,141,.25)',
        borderRadius: '10px',
        px: '1em',
      }}
    >
      <Box
        data-testid="ContractorsTab-ContractorsList-Contractor__ProfileChipWrapper"
        sx={{
          my: 'auto',
        }}
      >
        <Tooltip title={userName} arrow>
          <Chip
            data-testid="ContractorsTab-ContractorList-Contractor__ProfileChip"
            avatar={<Avatar src={profilePicture} />}
            label={userName}
            color="secondary"
            variant="outlined"
            clickable={true}
            onClick={handlePlayerCardOpen}
            sx={{
              width: '115px',
            }}
          />
        </Tooltip>
      </Box>
      {contractorBidStatus === null && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor__BidControlButtonWrapper"
          sx={{
            ml: 'auto',
          }}
        >
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-BidControls__AcceptButton"
            color="success"
            onClick={handleAccept}
            sx={{
              mx: '1em',
            }}
          >
            Accept
          </Button>
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-BidControls__RejectButton"
            color="error"
            onClick={handleReject}
            sx={{
              mx: '1em',
            }}
          >
            Reject
          </Button>
        </Box>
      )}
      {contractorBidStatus === 'Accepted' && (
        <Box
          data-testid="ContractorsTab-ContractorList-Contractor__AcceptedControlsWrapper"
          sx={{
            ml: 'auto',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__PayLabelWrapper"
            sx={{
              my: 'auto',
            }}
          >
            <OutlinedLabel
              size="small"
              margin="dense"
              label="Pay"
              value={pay}
              startAdornment="¤"
              maxWidth="75px"
              color="text.secondary"
            />
          </Box>
          <Button
            data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__DismissButton"
            color="error"
            onClick={handleDismiss}
            sx={{
              mx: '1em',
            }}
          >
            Dismiss
          </Button>
        </Box>
      )}
      {contractorBidStatus === 'Rejected' && (
        <Typography
          data-testid="ContractorsTab-ContractorList-Contractor-BidControl__RejectedBidStatus"
          variant="overline"
          sx={{
            color: 'warning.main',
            my: 'auto',
            mx: 'auto',
          }}
        >
          Rejected
        </Typography>
      )}
      {contractorBidStatus === 'Dismissed' && (
        <Typography
          data-testid="ContractorsTab-ContractorList-Contractor-AcceptedControls__DismissedContractorStatus"
          variant="overline"
          sx={{
            color: 'error.main',
            my: 'auto',
            mx: 'auto',
          }}
        >
          Dismissed
        </Typography>
      )}
    </Box>
  );
};

export const ContractorsManager: React.FC<unknown> = () => {
  const contractors = Object.values(testContractorsDB);

  const dispatch = useAppDispatch();
  const handleOpenInvite = () => {
    dispatch(openPopup(POPUP_USER_INVITE));
  };

  return (
    <Box
      data-testid="SelectedContract-ContractManagement__ContractorsTabWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderRadius: '5px',
        borderColor: 'primary.main',
        py: '.5em',
      }}
    >
      <Box
        data-testid="ContractorsTab__ControlsWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(14,49,141,.25)',
          borderRadius: '10px',
          py: '.2em',
          mb: '1em',
        }}
      >
        <Box
          data-testid="ContractorsTab-Controls__CountWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Typography
            data-testid="ContractorsTab-Controls-Counts__ActiveContractorsCount"
            variant="body2"
            sx={{
              my: 'auto',
              mx: '.5em',
              fontWeight: 'bold',
              color: 'text.secondary',
            }}
          >
            Active Contractors: X
          </Typography>
          <Typography
            data-testid="ContractorsTab-Controls-Counts__PendingBidsCount"
            variant="body2"
            sx={{
              my: 'auto',
              mx: '.5em',
              fontWeight: 'bold',
              color: 'text.secondary',
            }}
          >
            Pending Bids: X
          </Typography>
        </Box>
        <Button
          data-testid="ContractorsTab-Controls__InviteButton"
          variant="outlined"
          size="small"
          color="secondary"
          onClick={handleOpenInvite}
        >
          Invite
        </Button>
      </Box>
      <Box
        data-testid="ContractorsTab__ContractorsListWrapper"
        sx={{
          px: '.5em',
          height: '90%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
            borderRadius: '15px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '15px',
            background: 'rgb(121, 192, 244, .5)',
          },
        }}
      >
        {contractors.map((contractor) => (
          <Contractor
            key={contractor.id}
            id={contractor.id}
            userName={contractor.name}
            profilePicture={contractor.profilePicture}
            pay={contractor.pay}
          />
        ))}
      </Box>
    </Box>
  );
};

const testContractorsDB = {
  '1': {
    id: '1',
    name: 'Test User',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '2': {
    id: '2',
    name: 'Test User 2',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '3': {
    id: '3',
    name: 'Test User 3',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '4': {
    id: '4',
    name: 'Test User 4',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '5': {
    id: '5',
    name: 'Test User 5',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '6': {
    id: '6',
    name: 'Test User 6',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '7': {
    id: '7',
    name: 'Test User 7',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '8': {
    id: '8',
    name: 'Test User 8',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '9': {
    id: '9',
    name: 'Test User 9',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
  '10': {
    id: '10',
    name: 'Test User 10',
    profilePicture: '@/Assets/testprofile.png',
    isAccepted: false,
    isRejected: false,
    isDismissed: false,
    role: 'null',
    pay: 'null',
  },
};
