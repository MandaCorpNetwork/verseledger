import { useSoundEffect } from '@Audio/AudioManager';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/get/fetchContracts.action';
import { fetchUserBids } from '@Redux/Slices/Contracts/actions/get/fetchUserBids.action';
import { selectContractsArray } from '@Redux/Slices/Contracts/contracts.selectors';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { ContractItem } from '../ContractItem';

type ContractInfoPanelProps = {
  /** User property for data. */
  user: IUser | null;
};

/**
 * ### ContractInfoPanel
 * @description
 * The ContractInfoPanel displays the information of each contract that is either created by, or employs, the user.
 * Allows the user to view a brief overview of the contract information, such as the owner, the type, the suptype, the status, and the date of completion/exipration.
 * Includes a display change button to swap between contracts owned and contracts employed.
 * #### Function Components
 * @component {@link ContractItem}
 */
export const ContractInfoPanel: React.FC<ContractInfoPanelProps> = ({ user }) => {
  //LOCAL STATES
  /** Gets the ownership of contracts for read only. */
  const [contractActivity, setContractActivity] = React.useState<string | null>(null);
  const [contractOwnership, setContractOwnership] = React.useState<string>('owned');
  //HOOK
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  //LOGIC

  /* Callback for displaying active contracts vs. contract history. */
  const handleContractActivityChange = React.useCallback(
    (value: string) => {
      sound.playSound('clickMain');
      setContractActivity((prev) => (prev === value ? null : value));
    },
    [setContractActivity, sound],
  );

  /* Callback for displaying contracts owned by player and employed by player. */
  const handleContractOwershipChange = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, value: string) => {
      sound.playSound('clickMain');
      if (!value) return; // prevention for pass null values
      if (contractOwnership !== value) {
        setContractOwnership(value);
      }
    },
    [setContractOwnership, sound, contractOwnership],
  );
  /** Gets the bid status of a contract for search params. */
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
    [dispatch],
  );
  /** Gets the contracts from database for search params. */
  const handleFetchContracts = React.useCallback(
    (params: IContractSearch) => {
      const contractParams = {
        ...params,
      };
      dispatch(fetchContracts(contractParams));
    },
    [dispatch],
  );
  /** Fetching contract ownership and then mapping them to either 'active' or 'history' state.
   */
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
  /** Retrieves the contract based the state. */
  const contracts = useAppSelector((state) => selectContractsArray(state));

  return (
    <DigiDisplay
      data-testid="ContractInfo__DigiDisplay"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1em',
        p: '1em',
        height: '100%',
        overflowY: 'hidden',
      }}
    >
      <Box
        data-testid="ContractInfo__ToggleGroupWrapper"
        sx={{ alignSelf: 'flex-end', display: 'flex' }}
      >
        <ToggleButtonGroup
          data-testid="ContractInfo__ToggleButtonGroup"
          size="small"
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
              bgcolor: 'action.disabledBackground',
              '&:hover': {
                color: 'text.secondary',
              },
            },
            '& .MuiToggleButton-root.Mui-selected': {
              color: 'secondary.main',
              bgcolor: 'primary.main',
              '&:hover': {
                color: 'secondary.light',
              },
            },
          }}
        >
          <ToggleButton
            data-testid="ContractInfo-ToggleGroup__OwnedButton"
            selected={contractOwnership === 'owned'}
            value="owned"
          >
            Owned
          </ToggleButton>
          <ToggleButton
            data-testid="ContractInfo-ToggleGroup__EmployedButton"
            selected={contractOwnership === 'employed'}
            value="employed"
          >
            Employed
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        data-testid="ContractInfo__ListContainer"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflowY: 'auto',
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
          px: '1em',
        }}
      >
        <Box data-testid="ContractInfo__CollapseWrapper">
          <Typography
            data-testid="ContractInfo-Active__Title"
            variant="body1"
            fontWeight={'bold'}
            sx={{ cursor: 'pointer', display: 'flex' }}
            onClick={() => handleContractActivityChange('active')}
          >
            Active Contracts
            <ArrowRight
              data-testid="ContractInfo-Active__ArrowIcon"
              sx={{
                transform:
                  contractActivity === 'active' ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms',
              }}
            />
          </Typography>
          <Collapse
            data-testid="ContractInfo-Active__Collapse"
            sx={{
              width: '100%',
            }}
          >
            {contracts.map((contract) => (
              <ContractItem
                key={contract.id}
                contract={contract}
                isOwner={contractOwnership === 'owned'}
                isActive={contractActivity === 'active'}
              />
            ))}
          </Collapse>
        </Box>
        <Box ata-testid="ContractInfo__CollapseWrapper">
          <Typography
            data-testid="ContractInfo-History__Title"
            variant="body1"
            fontWeight={'bold'}
            sx={{ cursor: 'pointer', display: 'flex' }}
            onClick={() => handleContractActivityChange('history')}
          >
            Contract History
            <ArrowRight
              data-testid="ContractInfo-History__ArrowIcon"
              sx={{
                transform:
                  contractActivity === 'history' ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms',
              }}
            />
          </Typography>
          <Collapse
            data-testid="ContractInfo-History__Collapse"
            sx={{
              width: '100%',
            }}
            in={contractActivity === 'history'}
          >
            {contracts.map((contract) => (
              <ContractItem
                key={contract.id}
                contract={contract}
                isOwner={contractOwnership === 'owned'}
              />
            ))}
          </Collapse>
        </Box>
      </Box>
    </DigiDisplay>
  );
};
