import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_USER_INVITE } from '@Popups/UserInvite/UserInvite';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
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

  const contractorOrder = [
    'ACCPTED',
    'PENDING',
    'INVITED',
    'DECLINED',
    'EXPIRED',
    'REJECTED',
  ];

  const getContractorCountColor = React.useCallback(() => {
    if (acceptedBids === undefined) {
      return 'text.secondary';
    } else if (acceptedBids.length < contract.contractorLimit) {
      return 'text.secondary';
    } else if (acceptedBids.length === contract.contractorLimit) {
      return 'success.main';
    } else {
      return 'warning.main';
    }
  }, [acceptedBids, contract.contractorLimit]);

  const contractorCountColor = getContractorCountColor();

  return (
    <DigiBox
      data-testid="SelectedContract-ContractManagement__ContractorsTabWrapper"
      sx={{
        width: '100%',
        height: '100%',
        p: '.5em',
        justifyContent: 'flex-start',
      }}
    >
      <DigiDisplay
        data-testid="ContractorsTab__ControlsWrapper"
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          py: '.5em',
          mb: '.5em',
        }}
      >
        <Typography
          data-testid="ContractorsTab-Controls-Counts__ActiveContractorsCount"
          variant="body2"
          sx={{
            my: 'auto',
            mx: '.5em',
            fontWeight: 'bold',
            color: contractorCountColor,
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
            color:
              pendingBids?.length && pendingBids.length > 0 ? 'text.secondary' : 'grey',
            textShadow: pendingBids?.length === 0 ? '0 0 2px rgb(0,0,0)' : undefined,
          }}
        >
          Pending Bids: {pendingBids?.length}
        </Typography>
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
      </DigiDisplay>
      <Box
        data-testid="ContractorsTab__ContractorsListWrapper"
        sx={{
          px: '.5em',
          maxHeight: '90%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(0,73,130)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
        }}
      >
        {isOwned &&
          contractors &&
          (contractors?.length > 0 ? (
            contractors
              .slice()
              .sort((a, b) => {
                return (
                  contractorOrder.indexOf(a.status) - contractorOrder.indexOf(b.status)
                );
              })
              .map((contractor) => (
                <Contractor
                  key={contractor.id}
                  bid={contractor}
                  user={contractor.User as IUser}
                  contractOwned={isOwned}
                  contract={contract}
                />
              ))
          ) : (
            <Typography
              align="center"
              variant="h6"
              sx={{
                textAlign: 'center',
                width: '100%',
                color: 'grey',
                textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
              }}
            >
              No Contractors
            </Typography>
          ))}
        {!isOwned &&
          contractorViewableList &&
          (contractorViewableList.length > 0 ? (
            contractorViewableList
              .slice()
              .sort((a, b) => {
                return (
                  contractorOrder.indexOf(a.status) - contractorOrder.indexOf(b.status)
                );
              })
              .map((contractor) => (
                <Contractor
                  key={contractor.id}
                  bid={contractor}
                  user={contractor.User as IUser}
                  contractOwned={isOwned}
                  contract={contract}
                />
              ))
          ) : (
            <Typography
              align="center"
              variant="h6"
              sx={{
                textAlign: 'center',
                width: '100%',
                color: 'grey',
                textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
              }}
            >
              No Contractors
            </Typography>
          ))}
      </Box>
    </DigiBox>
  );
};
