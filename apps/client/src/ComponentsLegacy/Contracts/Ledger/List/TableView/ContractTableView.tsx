import { useSoundEffect } from '@Audio/AudioManager';
import { PayDisplay } from '@CommonLegacy/Components/App/PayDisplay';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { SubtypeChip } from '@CommonLegacy/Components/Chips/SubtypeChip';
import { UserChip } from '@CommonLegacy/Components/Chips/UserChip';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import type {
  IContract,
  IContractTimestamped,
} from 'vl-shared/src/schemas/contracts/ContractSchema';

type ContractRowProps = {
  contract: IContract[];
  onPick: (id: string | null) => void;
  isSelected: string | null;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalContracts: number;
};

interface Column {
  id:
    | 'title'
    | 'type'
    | 'subtype'
    | 'owner'
    | 'pay'
    | 'location'
    | 'createdDate'
    | 'bidTime';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  { id: 'title', label: 'Contract Title', minWidth: 170 },
  { id: 'subtype', label: 'Subtype', minWidth: 100 },
  { id: 'owner', label: 'Contract Owner', minWidth: 100 },
  { id: 'pay', label: 'Default Pay', minWidth: 100 },
  { id: 'location', label: 'Start Location', minWidth: 100 },
  { id: 'createdDate', label: 'Date Created', minWidth: 70 },
  { id: 'bidTime', label: 'Bid End', minWidth: 70 },
];

type CreatedTimeDisplayProps = {
  contract: IContract;
};

const CreatedTimeDisplay: React.FC<CreatedTimeDisplayProps> = ({ contract }) => {
  const createdDate = dayjs((contract as IContractTimestamped).createdAt);
  const createdTimeStamp = createdDate.format('D/M/YY HH:mm');
  dayjs.extend(relativeTime);
  const createdRelativeTimestamp = dayjs().to(createdDate);

  return (
    <Tooltip title={createdTimeStamp}>
      <Typography variant="body2">{createdRelativeTimestamp}</Typography>
    </Tooltip>
  );
};

type BidTimeDisplayProps = {
  contract: IContract;
};

const BidTimeDisplay: React.FC<BidTimeDisplayProps> = ({ contract }) => {
  const bidDate = dayjs(contract.bidDate);
  const bidTimeStamp = `Ends: ${bidDate.format('D/M/YY HH:mm')}`;
  const bidRealtiveTimestamp = React.useCallback(() => {
    const now = dayjs();
    if (now >= bidDate) {
      if (contract.status !== 'BIDDING') {
        return 'Bidding Closed';
      } else {
        return 'Expired';
      }
    }
    dayjs.extend(relativeTime);
    return now.to(bidDate);
  }, [bidDate, contract.status]);
  return (
    <Tooltip title={bidTimeStamp}>
      <Typography
        variant="body2"
        sx={{ color: bidRealtiveTimestamp() == 'Bidding Closed' ? 'warning.main' : '' }}
      >
        {bidRealtiveTimestamp()}
      </Typography>
    </Tooltip>
  );
};

const getStartLocationId = (contract: IContract) => {
  return contract.Locations?.find(
    (location) => location.ContractLocation?.tag === 'start',
  )?.id;
};

export const ContractTableView: React.FC<ContractRowProps> = ({
  contract,
  onPick,
  isSelected,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  totalContracts,
}) => {
  const sound = useSoundEffect();
  return (
    <Box
      data-testid="ContractLedger-ContractBrowser__TableViewContainer"
      sx={{
        p: '1em',
        height: '100%',
        width: '100%',
      }}
    >
      <TableContainer
        sx={{
          maxHeight: '90%',
          boxShadow: '0 0 15px 2px #0e318d',
          mx: 'auto',
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
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                  component="th"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contract.map((contract) => (
              <TableRow
                key={contract.id}
                hover
                onClick={() => {
                  onPick(contract.id);
                  sound.playSound('clickMain');
                }}
                selected={isSelected === contract.id}
                sx={{
                  cursor: 'pointer',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(14,49,141,.7)',
                    boxShadow: contract.isEmergency
                      ? '0 0 10px 2px red'
                      : '0 0 10px 2px #18fcfc',
                    '&:hover': {
                      bgcolor: 'rgba(0,30,100,.8)',
                      boxShadow: contract.isEmergency
                        ? '0 0 10px 2px #ff4d4d'
                        : '0 0 10px 2px rgb(33, 150, 243)',
                    },
                  },
                }}
              >
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      maxWidth: '100%',
                      fontWeight: 'bold',
                      color: contract.isEmergency ? 'error.main' : 'text.secondary',
                    }}
                  >
                    {contract.title}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <SubtypeChip subtype={contract.subtype} />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <UserChip user_id={contract.owner_id} size="medium" />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <PayDisplay
                    value={contract.defaultPay}
                    variant={contract.payStructure}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <LocationChip locationId={getStartLocationId(contract) ?? ''} />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <CreatedTimeDisplay contract={contract} />
                </TableCell>
                <TableCell>
                  <BidTimeDisplay contract={contract} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component={Box}
        count={totalContracts}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        sx={{
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          boxShadow: '0 0 15px 2px #0e318d',
          bgcolor: 'rgba(0,1,19,.5)',
        }}
        slotProps={{
          select: {
            sx: {
              '& .MuiSelect-icon': {
                color: 'secondary.main',
              },
            },
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
              },
            },
            previousButtonIcon: {
              sx: {
                color: 'secondary.main',
              },
            },
          },
        }}
      />
    </Box>
  );
};
