import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import {
  selectContractPagination,
  selectContractsArray,
} from '@Redux/Slices/Contracts/selectors/contractSelectors';
import useDebounce from '@Utils/Hooks/useDebounce';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { isMobile } from '@Utils/isMobile';
import { Logger } from '@Utils/Logger';
import { ArchetypeToSubtypes, QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { IContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

import { useSoundEffect } from '@/AudioManager';
import { CardorTableViewToggle } from '@/Components/Contracts/Ledger/List/Card-TableViewToggle';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';

import { ContractCardDisplay } from './CardView/ContractCardDisplay';
import { ContractTableView } from './TableView/ContractTableView';

type ContractsViewerProps = {
  selectedId: string | null;
  selectedIdSetter: (id: string | null) => void;
  contractOnClose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ContractsBrowser: React.FC<ContractsViewerProps> = ({
  selectedIdSetter,
  contractOnClose,
  selectedId,
}) => {
  const { playSound } = useSoundEffect();
  const mobile = isMobile();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const [view, setView] = React.useState('ContractCardView');
  const [filters] = useURLQuery();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const pagination = useAppSelector(selectContractPagination);
  const contractCount = pagination;

  const handleChangePage = (_event: unknown, newPage: number) => {
    playSound('clickMain');
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    playSound('clickMain');
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelect = (id: string | null) => {
    playSound('open');
    selectedIdSetter(id);
    Logger.info(`Selected Contract in Browser: ${id}`);
  };

  const handleClose = () => {
    contractOnClose();
  };

  const debouncedSearch = React.useCallback(
    useDebounce((params: IContractSearch) => {
      dispatch(fetchContracts(params));
    }, 300),
    [dispatch],
  );

  React.useEffect(() => {
    // Subtype Filter Initialization
    const selectedSubtypes = filters.getAll(QueryNames.Subtype) as IContractSubType[];
    const selectedArchetype = filters.getAll(QueryNames.Archetype) as string[];
    const archetypeToSub: IContractSubType[] = selectedArchetype.flatMap(
      (a) => ArchetypeToSubtypes[a] ?? [],
    );
    const combinedSubtypes: IContractSubType[] = Array.from(
      new Set([...selectedSubtypes, ...archetypeToSub]),
    );
    Logger.info('Selected Subtypes: ', combinedSubtypes);
    const bidBefore = new Date(filters.get(QueryNames.BidBefore) as string);
    const bidAfter = new Date(filters.get(QueryNames.BidAfter) as string);
    const startBefore = new Date(filters.get(QueryNames.StartBefore) as string);
    const startAfter = new Date(filters.get(QueryNames.StartAfter) as string);
    const endBefore = new Date(filters.get(QueryNames.EndBefore) as string);
    const endAfter = new Date(filters.get(QueryNames.EndAfter) as string);
    const duration = parseInt(filters.get(QueryNames.Duration) as string, 10);
    const payStructure = filters.get(QueryNames.PayStructure) as IContractPayStructure;
    const contractorRating = filters.get(QueryNames.ContractorRating) as string;
    const minPay = Number(filters.get(QueryNames.UECRangeMin) as string);
    const maxPay = Number(filters.get(QueryNames.UECRangeMax) as string);

    const params: IContractSearch = {
      page: page,
      limit: rowsPerPage,
      status: ['BIDDING', 'INPROGRESS'],
      ...(combinedSubtypes.length > 0 && {
        subtype: combinedSubtypes,
      }),
      ...((bidBefore || bidAfter) && {
        bidDate: {
          before: bidBefore,
          after: bidAfter,
        },
      }),
      ...((startBefore || startAfter) && {
        startDate: {
          before: startBefore,
          after: startAfter,
        },
      }),
      ...((endBefore || endAfter) && {
        endDate: {
          before: endBefore,
          after: endAfter,
        },
      }),
      ...(duration && {
        duration: Number(duration),
      }),
      ...(payStructure && {
        payStructure: payStructure,
      }),
      ...(contractorRating && {
        contractorRating: contractorRating,
      }),
      ...(minPay && {
        minPay: minPay,
      }),
      ...(maxPay && {
        maxPay: maxPay,
      }),
    };
    debouncedSearch(params);
  }, [filters, page, rowsPerPage, debouncedSearch]);

  const contracts = useAppSelector((state) => selectContractsArray(state));

  return (
    <Box
      data-testid="ContractLedger-ColumnTwo__ContractBrowserContainer"
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '10px',
        borderLeft: '1px solid rgba(14,49,141,0.5)',
        borderRight: '1px solid rgba(14,49,141,0.5)',
        boxShadow: '0 5px 15px rgba(14,49,141,.8)',
        overflow: 'hidden',
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
        },
      }}
    >
      {!mobile && (
        <Box
          data-testid="ContractLedger-ContractBrowser__ContractListToolsWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
            alignItems: 'center',
          }}
        >
          <Box
            data-testid="ContractLedger-ContractBrowser-ContractListTools__CloseContractWrapper"
            sx={{ mr: 'auto' }}
          >
            {selectedId && (
              <Button
                onClick={handleClose}
                variant="text"
                endIcon={<CloseIcon />}
                color="secondary"
                sx={{
                  textShadow: '1px 1px 5px rgba(24,252,252,0.3)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                Close
              </Button>
            )}
          </Box>
          <Box data-id="Contract-Display-View-Toggle-Box" sx={{ ml: 'auto' }}>
            <CardorTableViewToggle onViewChange={setView} />
          </Box>
        </Box>
      )}
      <Box
        id="Contract-Display-Box"
        sx={{
          flexGrow: 1,
          display: 'flex',
          position: 'relative',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(121, 192, 244, .5)',
          },
        }}
      >
        {view === 'ContractCardView' ? (
          <ContractCardDisplay
            onPick={handleSelect}
            contracts={contracts}
            isSelected={selectedId}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            totalContracts={contractCount.total}
          />
        ) : (
          <ContractTableView
            onPick={selectedIdSetter}
            contract={contracts}
            isSelected={selectedId}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            totalContracts={contractCount.total}
          />
        )}
      </Box>
    </Box>
  );
};
