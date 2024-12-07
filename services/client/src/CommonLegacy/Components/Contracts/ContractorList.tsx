import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import DigiDisplay from '@CommonLegacy/Components/Boxes/DigiDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_USER_INVITE } from '@Popups/UserInvite/UserInvite';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { Contractor } from './ContractorItem';

type ContractorListProps = {
  /** The contract to display information for */
  contract: IContract;
};

/**
 * ### ContractorList
 * @description
 * Displays the list of Contractors with a Bid connected to the Contract.
 * Depending on the user's access level, the user will see different levels of information. If user is the owner will be able to manage the bids & send Invites.
 * @param props - The props for the component
 * #### Functional Components
 * #### Styled Components
 */
export const ContractorList: React.FC<ContractorListProps> = ({ contract }) => {
  // HOOKS
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  // LOGIC
  /** @var {IUser} currentUser - The current user */
  const currentUser = useAppSelector(selectCurrentUser);

  /** @var {boolean} isOwner - Whether the user is the owner of the contract */
  const isOwner = currentUser?.id === contract.owner_id;

  /** @var {IContractBid} userBid - The bid of the current user if exists */
  const userBid = contract.Bids?.find((bid) => bid.user_id === currentUser?.id);

  const privledgedAccess =
    userBid?.status === 'ACCEPTED' ||
    userBid?.status === 'INVITED' ||
    userBid?.status === 'WITHDRAWN';

  /** @var {IContractBid[]} contractors - The complete list of bids on the contract */
  const contractors = contract.Bids;

  /**
   * Opens the Invite popup

   * @see {@link POPUP_USER_INVITE}
   */
  const handleOpenInvite = () => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_USER_INVITE, { contractId: contract.id }));
  };

  /** @var {IContractBid[]} acceptedBids - The list of accepted bids, viewable to a user with a `public` access level */
  const acceptedBids = contractors?.filter((bid) => bid.status === 'ACCEPTED');

  /** @var {IContractBid[]} pendingBids - The list of pending bids. Viewable by a user with an `owner` access level */
  const pendingBids = contractors?.filter((bid) => bid.status === 'PENDING');

  /** @var {IContractBid[]} contractorViewableList - The list of contractors that are viewable to a user with a `privledged` access level */
  const contractorViewableList = contractors?.filter((bid) =>
    ['ACCEPTED', 'WITHDRAWN', 'INVITED', 'DISMISSED', 'DECLINED', 'PENDING'].includes(
      bid.status,
    ),
  );

  /** @var {IContractBidStatus[]} contractorOrder - The order of the displayed bids by status */
  const contractorOrder = [
    'ACCPTED',
    'WITHDRAWN',
    'PENDING',
    'INVITED',
    'DECLINED',
    'DISMISSED',
    'EXPIRED',
    'REJECTED',
  ];

  /**
   * Returns the color of the contractor count based on the number of contractors compared to the contractor limit

   * - If the number of contractors is less than the contractor limit, return `text.secondary`
   * - If the number of contractors is equal to the contractor limit, return `success.main`
   * - If the number of contractors is greater than the contractor limit, return `warning.main`
   */
  const getContractorCountColor = React.useCallback(() => {
    if (acceptedBids === undefined || acceptedBids.length < contract.contractorLimit) {
      return 'text.secondary';
    } else if (acceptedBids.length === contract.contractorLimit) {
      return 'success.main';
    } else {
      return 'warning.main';
    }
  }, [acceptedBids, contract]);
  /**
   * @var {string} contractorCountColor - The color of the contractor count
   * calls {@link getContractorCountColor}
   */
  const contractorCountColor = getContractorCountColor();
  return (
    <ComponentContainer
      data-testid="SelectedContract-ContractManagement__ContractorsTabWrapper"
      sx={{
        width: '100%',
        height: '100%',
        p: '.5em',
        justifyContent: 'flex-start',
        flexGrow: 1,
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
        {isOwner && contract.status !== 'COMPLETED' && contract.status !== 'CANCELED' && (
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
        {isOwner &&
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
                  contractOwned={isOwner}
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
        {!isOwner &&
          userBid &&
          privledgedAccess &&
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
                  contractOwned={isOwner}
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
        {!isOwner &&
          !privledgedAccess &&
          acceptedBids &&
          (acceptedBids.length > 0 ? (
            acceptedBids?.map((contractor) => (
              <Contractor
                key={contractor.id}
                bid={contractor}
                user={contractor.User as IUser}
                contractOwned={isOwner}
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
    </ComponentContainer>
  );
};
