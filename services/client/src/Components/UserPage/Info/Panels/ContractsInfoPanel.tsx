import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { fetchUserBids } from '@Redux/Slices/Contracts/actions/fetch/fetchUserBids';
import { selectContractsArray } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';

import { ContractItem } from '../ContractItem';

type ContractInfoPanelProps = {
  user: IUser | null;
};

export const ContractInfoPanel: React.FC<ContractInfoPanelProps> = ({ user }) => {
  //LOCAL STATES
  const [contractActivity, setContractActivity] = React.useState<string | null>(null);
  const [contractOwnership, setContractOwnership] = React.useState<string>('owned');
  //HOOK
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  //LOGIC

  /* Callback for displaying active contracts vs. contract history. */
  const handleContractActivityChange = React.useCallback(
    (value: string) => {
      playSound('clickMain');
      setContractActivity((prev) => (prev === value ? null : value));
    },
    [setContractActivity, playSound],
  );

  /* Callback for displaying contracts owned by player and employed by player. */
  const handleContractOwershipChange = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, value: string) => {
      playSound('clickMain');
      if (!value) return; // prevention for pass null values
      if (contractOwnership !== value) {
        setContractOwnership(value);
      }
      console.log(contractOwnership);
    },
    [setContractOwnership, playSound, contractOwnership],
  );

  const handleFetchBids = React.useCallback(
    async (params: IUserBidSearch) => {
      const bidParams = {
        ...params,
      };
      try {
        const fetchBids = await dispatch(fetchUserBids(bidParams));
        if (fetchUserBids.fulfilled.match(fetchBids)) {
          const bids = fetchBids.payload.data;
          if (bids && Array.isArray(bids)) {
            const contractIds = bids.map((bid: IContractBid) => bid.contract_id);
            return contractIds;
          }
        }
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
    } else if (contractOwnership === 'employed' && contractActivity === 'active') {
      const bidParams: IUserBidSearch = {
        page: 0,
        status: ['ACCEPTED'],
      };
      handleFetchBids(bidParams).then((contractIds) => {
        const contractParams: IContractSearch = {
          page: 0,
          status: ['BIDDING', 'PENDING', 'INPROGRESS'],
          contractId: contractIds,
        };
        handleFetchContracts(contractParams);
      });
    } else if (contractOwnership === 'employed' && contractActivity === 'history') {
      const bidParams: IUserBidSearch = {
        page: 0,
        status: ['ACCEPTED'],
      };
      handleFetchBids(bidParams).then((contractIds) => {
        const contractParams: IContractSearch = {
          page: 0,
          status: ['COMPLETED'],
          contractId: contractIds,
        };
        handleFetchContracts(contractParams);
      });
    }
  }, [handleFetchBids, handleFetchContracts, contractActivity, contractOwnership, user]);

  const contracts = useAppSelector((state) => selectContractsArray(state));

  return (
    <DigiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        p: '1em',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1em',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ alignSelf: 'flex-end', display: 'flex' }}>
        <ToggleButtonGroup
          exclusive
          value={contractOwnership}
          onChange={handleContractOwershipChange}
          sx={{
            border: '1px solid',
            borderColor: 'success.dark',
            boxShadow: '0 0px 10px rgba(24,252,252,0.5)',
            borderRadius: '5px',
            '&:hover': {
              borderColor: 'primary.main',
            },
            '& .MuiToggleButton-root': {
              color: 'secondary.dark',
              backgroundColor: 'action.disabledBackground',
              '&:hover': {
                color: 'text.secondary',
              },
            },
            '& .MuiToggleButton-root.Mui-selected': {
              color: 'secondary.main',
              backgroundColor: 'primary.main',
              '&:hover': {
                color: 'secondary.light',
              },
            },
          }}
        >
          <ToggleButton selected={contractOwnership === 'owned'} value="owned">
            Owned
          </ToggleButton>
          <ToggleButton selected={contractOwnership === 'employed'} value="employed">
            Employed
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight: '85%' }}
      >
        <Box sx={{ maxHeight: '90%' }}>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => handleContractActivityChange('active')}
          >
            Active Contracts
            <ArrowRight
              sx={{
                transform:
                  contractActivity === 'active' ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms',
              }}
            />
          </Typography>
          <Collapse
            sx={{ maxHeight: '100%', my: '.5em', width: '100%' }}
            in={contractActivity === 'active'}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '2px',
                height: '100%',
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
              {contracts.map((contract) => (
                <ContractItem key={contract.id} contract={contract} />
              ))}
            </Box>
          </Collapse>
        </Box>
        <Box sx={{ maxHeight: '90%' }}>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => handleContractActivityChange('history')}
          >
            Contract History
            <ArrowRight
              sx={{
                transform:
                  contractActivity === 'history' ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms',
              }}
            />
          </Typography>
          <Collapse
            //If still having issue with the content spacing in box lower the collapse maxHeights
            sx={{ maxHeight: '100%', my: '.5em', width: '100%' }}
            in={contractActivity === 'history'}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '2px',
                height: '100%',
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
              {contracts.map((contract) => (
                <ContractItem key={contract.id} contract={contract} />
              ))}
            </Box>
          </Collapse>
        </Box>
      </Box>
    </DigiBox>
  );
};
