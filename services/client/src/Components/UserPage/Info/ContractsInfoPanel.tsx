import { useSoundEffect } from '@/AudioManager';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { Box } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { fetchUserBids } from '@Redux/Slices/Contracts/actions/fetch/fetchUserBids';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type ContractInfoPanelProps = {
  user: IUser | null;
};

export const ContractInfoPanel: React.FC<ContractInfoPanelProps> = ({ user }) => {
  //LOCAL STATES
  const [contractActivity, setContractActivity] = React.useState<string>('active');
  const [contractOwnership, setContractOwnership] = React.useState<string>('owned');
  //HOOK
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  //LOGIC
  /* Callback for displaying active contracts vs. contract history. */
  const handleContractActivityChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setContractActivity(value);
    },
    [setContractActivity, playSound],
  );
  /* Callback for displaying contracts owned by player and employed by player. */
  const handleContractOwershipChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setContractOwnership(value);
    },
    [setContractOwnership, playSound],
  );

  const handleFetchBids = React.useCallback(
    async (params: IUserBidSearch) => {
      const bidParams = {
        ...params,
      };
      try {
        const fetchBids = await dispatch(fetchUserBids(bidParams));
      } catch {
        enqueueSnackbar('Error fetching bids', { variant: 'error' });
      }
    },
    [enqueueSnackbar, dispatch],
  );

  const handleFetchContracts = React.useCallback(
    (params: IContractSearch) => {
      const contractParams = {
        ...params,
      };
      dispatch(fetchContracts(contractParams));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!user) return;
    if (contractOwnership === 'owned' && contractActivity === 'active') {
      const contractParams: IContractSearch = {
        page: 0,
        status: ['BIDDING', 'PENDING', 'INPROGRESS'],
        ownerId: [user.id],
      };
      handleFetchContracts(contractParams);
    } else if (contractOwnership === 'owned' && contractActivity === 'history') {
      const contractParams: IContractSearch = {
        page: 0,
        status: ['COMPLETED'],
        ownerId: [user.id],
      };
      handleFetchContracts(contractParams);
    }
  });

  return (
    <DigiBox>
      <Box />
    </DigiBox>
  );
};
