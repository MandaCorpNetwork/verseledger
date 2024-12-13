import { useSoundEffect } from '@Audio/AudioManager';
import { Box, debounce, TablePagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchOrgs } from '@Redux/Slices/Orgs/actions/post/fetchOrgs.action';
import { selectOrgPagination } from '@Redux/Slices/Orgs/orgs.selectors';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import React, { SyntheticEvent } from 'react';
import { IOrgSearchCMD } from 'vl-shared/src/schemas/orgs/OrgSearchCMD';

type PaginationAnchorProps = {
  isMobile: boolean;
};

export const PaginationAnchor: React.FC<PaginationAnchorProps> = ({ isMobile }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25);
  const [page, setPage] = React.useState<number>(0);
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const { searchParams } = useURLQuery();

  const pagination = useAppSelector(selectOrgPagination);
  const orgCount = pagination;

  const handleChangePage = React.useCallback(
    (_e: SyntheticEvent, newPage: number) => {
      sound.playSound('loading');
      setPage(newPage);
    },
    [sound, setPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      sound.playSound('clickMain');
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    [sound, setRowsPerPage, setPage],
  );

  const search = React.useCallback(
    (params: IOrgSearchCMD) => {
      dispatch(fetchOrgs(params));
    },
    [dispatch],
  );

  React.useEffect(() => {
    const searchTerm = searchParams.get(QueryNames.SearchQuery) as string;
    const params: IOrgSearchCMD = {
      page: page,
      limit: rowsPerPage,
      title: searchTerm ?? '',
      rsi_handle: searchTerm ?? '',
    };
    debounce(() => search(params), 300)();
  }, [searchParams, page, rowsPerPage, search]);

  return (
    <div style={{ position: 'sticky', bottom: 0, width: '100%' }}>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component={Box}
        count={orgCount.total}
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
