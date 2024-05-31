import { LocationChip } from '@Common/LocationChip';
import { PayDisplay } from '@Common/PayDisplay';
import { UserChip } from '@Common/UserChip';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

type ContractRowProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: IContract[];
  onPick: (id: string | null) => void;
  isSelected: string | null;
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
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'subtype', label: 'Subtype', minWidth: 100 },
  { id: 'owner', label: 'Owner', minWidth: 100 },
  { id: 'pay', label: 'Pay', minWidth: 100 },
  { id: 'location', label: 'Location', minWidth: 100 },
  { id: 'createdDate', label: 'Date Created', minWidth: 70 },
  { id: 'bidTime', label: 'Bid Time', minWidth: 70 },
];

type CreatedTimeDisplayProps = {
  contract: IContract;
};

const CreatedTimeDisplay: React.FC<CreatedTimeDisplayProps> = ({ contract }) => {
  const createdDate = dayjs(contract.createdAt);
  const createdTimeStamp = createdDate.format('D/M/YY HH:mm');
  dayjs.extend(relativeTime);
  const createdRelativeTimestamp = dayjs().to(createdDate);

  return (
    <Tooltip title={createdTimeStamp}>
      <Typography>{createdRelativeTimestamp}</Typography>
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
      return 'Bidding Closed';
    }
    dayjs.extend(relativeTime);
    return now.to(bidDate);
  }, [bidDate]);
  return (
    <Tooltip title={bidTimeStamp}>
      <Typography>{bidRealtiveTimestamp()}</Typography>
    </Tooltip>
  );
};

const titleDisplay = () => {};

export const ContractTableView: React.FC<ContractRowProps> = ({ contract, onPick }) => {
  return (
    <Box
      data-testid="ContractLedger-ContractBrowser__TableViewContainer"
      sx={{
        p: '1em',
        height: '100%',
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
              onClick={() => onPick(contract.id)}
              sx={{
                cursor: 'pointer',
                '&:nth-of-type(odd)': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <TableCell sx={{ textAlign: 'center' }}>{contract.title}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{contract.subType}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <UserChip userid={contract.owner_id} size="medium" />
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <PayDisplay value={contract.defaultPay} variant={contract.payStructure} />
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <LocationChip label="Location" />
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
    </Box>
  );
};
