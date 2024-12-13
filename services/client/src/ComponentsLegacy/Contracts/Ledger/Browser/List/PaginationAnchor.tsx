import { useSoundEffect } from '@Audio/AudioManager';
import { Box, debounce, TablePagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/get/fetchContracts.action';
import { selectContractPagination } from '@Redux/Slices/Contracts/contracts.selectors';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { ArchetypeToSubtypes, QueryNames } from '@Common/Definitions/Search/QueryNames';
import React, { SyntheticEvent } from 'react';
import { IContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import { IContractSearch } from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import { IContractSubType } from 'vl-shared/src/schemas/contracts/ContractSubTypeSchema';

type PaginationAnchorProps = {
  isMobile: boolean;
};

export const PaginationAnchor: React.FC<PaginationAnchorProps> = ({ isMobile }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const [page, setPage] = React.useState<number>(0);
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const { searchParams } = useURLQuery();

  const pagination = useAppSelector(selectContractPagination);
  const contractCount = pagination;

  const handleChangePage = React.useCallback(
    (_e: SyntheticEvent, newPage: number) => {
      sound.playSound('loading');
      setPage(newPage);
    },
    [sound, setPage],
  );

  // TODO: Math to make the page stay the same whether decreasing or increasing
  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      sound.playSound('clickMain');
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    [sound, setRowsPerPage, setPage],
  );

  const search = React.useCallback(
    (params: IContractSearch) => {
      dispatch(fetchContracts(params));
    },
    [dispatch],
  );

  React.useEffect(() => {
    // Subtype Filter Initialization
    const selectedSubtypes = searchParams.getAll(
      QueryNames.Subtype,
    ) as IContractSubType[];
    const selectedArchetype = searchParams.getAll(QueryNames.Archetype) as string[];
    const archetypeToSub: IContractSubType[] = selectedArchetype.flatMap(
      (a) => ArchetypeToSubtypes[a] ?? [],
    );
    const combinedSubtypes: IContractSubType[] = Array.from(
      new Set([...selectedSubtypes, ...archetypeToSub]),
    );
    const bidBefore = new Date(searchParams.get(QueryNames.BidBefore) as string);
    const bidAfter = new Date(searchParams.get(QueryNames.BidAfter) as string);
    const startBefore = new Date(searchParams.get(QueryNames.StartBefore) as string);
    const startAfter = new Date(searchParams.get(QueryNames.StartAfter) as string);
    const endBefore = new Date(searchParams.get(QueryNames.EndBefore) as string);
    const endAfter = new Date(searchParams.get(QueryNames.EndAfter) as string);
    const duration = parseInt(searchParams.get(QueryNames.Duration) as string, 10);
    const payStructure = searchParams.get(
      QueryNames.PayStructure,
    ) as IContractPayStructure;
    const contractorRating = searchParams.get(QueryNames.ContractorRating) as string;
    const minPay = Number(searchParams.get(QueryNames.UECRangeMin) as string);
    const maxPay = Number(searchParams.get(QueryNames.UECRangeMax) as string);
    const emergency = searchParams.get(QueryNames.Emergency) as string;

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
      ...(emergency && {
        isEmergency: 'true',
      }),
    };
    debounce(() => search(params), 300)();
  }, [searchParams, page, rowsPerPage, search]);

  return (
    <div style={{ position: 'sticky', bottom: 0, width: '100%' }}>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component={Box}
        count={contractCount.total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={() => handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Cards per page"
        sx={{
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
          boxShadow: '0 0 8px 5px rgba(14,49,252,.4)',
          bgcolor: 'rgba(0,1,19,.5)',
          width: '100%',
          '& .MuiTablePagination-displayedRows': {
            fontSize: { xs: '.7em', sm: '1em' },
          },
          '& .MuiTablePagination-selectLabel': {
            fontSize: { xs: '.7em', sm: '1em' },
          },
          '& .MuiTablePagination-toolbar': {
            px: { xs: '.5em', sm: '1em' },
          },
          '& .MuiTablePagination-actions': {
            ml: { xs: '0', sm: '20px' },
          },
        }}
        slotProps={{
          select: {
            'aria-label': 'Cards per page',
            sx: {
              '& .MuiSelect-icon': {
                color: 'secondary.main',
              },
              fontSize: { xs: '.8em', sm: '1em' },
              mr: { xs: '5px', sm: '32px' },
              ml: { xs: '0', sm: '8px' },
            },
            size: isMobile ? 'small' : 'medium',
          },
          actions: {
            firstButtonIcon: {
              sx: {
                color: 'secondary.main',
              },
            },
            nextButtonIcon: {
              sx: {
                color: 'secondary.main',
                fontSize: { xs: '.7em', sm: '1em' },
              },
            },
            previousButtonIcon: {
              sx: {
                color: 'secondary.main',
                fontSize: { xs: '.7em', sm: '1em' },
              },
            },
          },
        }}
      />
    </div>
  );
};
