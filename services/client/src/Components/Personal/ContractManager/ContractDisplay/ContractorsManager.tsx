import { OutlinedLabel } from '@Common/Components/App/OutlinedLabel';
import { Avatar, Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { POPUP_USER_INVITE } from '@Popups/UserInvite/UserInvite';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useState } from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type ContractorProps = {
  id: string;
  user: IUser;
  pay: string;
};

const Contractor: React.FC<ContractorProps> = ({ user, pay }) => {
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
        <Tooltip title={user.displayName} arrow>
          <Chip
            data-testid="ContractorsTab-ContractorList-Contractor__ProfileChip"
            avatar={<Avatar src={user.pfp} />}
            label={user.displayName}
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

type ContractorsManagerProps = {
  contract: IContract;
};

export const ContractorsManager: React.FC<ContractorsManagerProps> = ({ contract }) => {
  const contractors = contract.Bids;

  const dispatch = useAppDispatch();
  const handleOpenInvite = () => {
    dispatch(openPopup(POPUP_USER_INVITE));
  };

  const acceptedBids = contractors?.filter((bid) => bid.status === 'ACCEPTED');
  const pendingBids = contractors?.filter((bid) => bid.status === 'PENDING');

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
        p: '.5em',
        borderLeft: '1px solid rgba(14,49,141,0.5)',
        borderRight: '1px solid rgba(14,49,141,0.5)',
        boxShadow: '0 5px 15px rgba(14,49,141,.8)',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background:
            'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
          opacity: 0.6,
          backdropFilter: 'blur(10px)',
          zIndex: -1,
          backgroundImage: 'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
          backgroundSize: '100% 2px',
        },
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
            Active Contractors: {acceptedBids?.length}
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
            Pending Bids: {pendingBids?.length}
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
        {contractors &&
          contractors.map((contractor) => (
            <Contractor
              key={contractor.id}
              id={contractor.id}
              user={contractor.User as IUser}
              pay="InDev"
            />
          ))}
      </Box>
    </Box>
  );
};
