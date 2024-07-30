import { Box, Button, Typography } from '@mui/material';
import { POPUP_USER_INVITE } from '@Popups/UserInvite/UserInvite';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';

import { Contractor } from './ContractorItem';

type ContractorsManagerProps = {
  contract: IContract;
  isOwned: boolean;
};

export const ContractorsManager: React.FC<ContractorsManagerProps> = ({
  contract,
  isOwned,
}) => {
  const { playSound } = useSoundEffect();
  const contractors = contract.Bids;

  const dispatch = useAppDispatch();
  const handleOpenInvite = () => {
    playSound('open');
    dispatch(openPopup(POPUP_USER_INVITE, { contractId: contract.id }));
  };

  const acceptedBids = contractors?.filter((bid) => bid.status === 'ACCEPTED');
  const pendingBids = contractors?.filter((bid) => bid.status === 'PENDING');

  const contractorViewableList = contractors?.filter((bid) =>
    ['ACCEPTED', 'WITHDRAWN', 'INVITED'].includes(bid.status),
  );

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
              color:
                acceptedBids === undefined
                  ? 'text.secondary'
                  : acceptedBids.length < contract.contractorLimit
                    ? 'text.secondary'
                    : acceptedBids?.length === contract.contractorLimit
                      ? 'success.main'
                      : 'warning.main',
            }}
          >
            Active Contractors: {acceptedBids?.length}/{contract.contractorLimit}
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
        {isOwned && (
          <Button
            data-testid="ContractorsTab-Controls__InviteButton"
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleOpenInvite}
          >
            Invite
          </Button>
        )}
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
        {isOwned &&
          contractors &&
          contractors.map((contractor) => (
            <Contractor
              key={contractor.id}
              bid={contractor}
              user={contractor.User as IUser}
              pay="InDev"
              contractOwned={isOwned}
            />
          ))}
        {!isOwned &&
          contractorViewableList?.map((contractor) => (
            <Contractor
              key={contractor.id}
              bid={contractor}
              user={contractor.User as IUser}
              pay="InDev"
              contractOwned={isOwned}
            />
          ))}
      </Box>
    </Box>
  );
};
