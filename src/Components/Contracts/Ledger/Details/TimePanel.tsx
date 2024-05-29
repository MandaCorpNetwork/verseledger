import { Box, LinearProgress, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { pickContract } from '@Redux/Slices/Contracts/contractSelectors';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

type TimePanel = {
  contractId: string | null;
};

export const BidPanel: React.FC<TimePanel> = ({ contractId }) => {
  const contract = useAppSelector((root) => pickContract(root, contractId as string));

  const formattedBidEnd = dayjs(contract.bidDate).format('DD MMM, YY @ HH:mm');

  const timeRemaining = React.useCallback(() => {
    const bidTime = dayjs(contract.bidDate);
    console.log(bidTime);
    dayjs.extend(relativeTime);
    const remainder = dayjs().to(bidTime);
    return remainder;
  }, [contract]);

  const bidProgress = 20;
  return (
    <Box
      data-testid="ContractTime-Panel__BidTimeContainer"
      sx={{
        width: '100%',
        height: '100%',
        alignContent: 'center',
      }}
    >
      <Box
        data-testid="ContractTime-Panel-BidTime__TextWrapper"
        sx={{
          width: '100%',
        }}
      >
        <Typography
          align="center"
          variant="body2"
          sx={{ fontWeight: 'bold', color: 'text.secondary' }}
        >
          Bid Time Remaining: {timeRemaining()}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          sx={{ fontWeight: 'bold', color: 'text.secondary' }}
        >
          Bid End Date: {formattedBidEnd}
        </Typography>
      </Box>
      <Box
        data-testid="ContractTime-Panel-BidTime__ProgressWrapper"
        sx={{
          width: '50%',
          mx: 'auto',
          mt: '.5em',
        }}
      >
        <LinearProgress variant="determinate" value={bidProgress} />
      </Box>
    </Box>
  );
};

export const StartPanel: React.FC<unknown> = () => {
  return (
    <Box data-testid="ContractTime-Panel__StartTimeWrapper">
      <Typography>Time Till Start: X</Typography>
      <Typography>Contract Start Date: X</Typography>
      <Typography>Contract Time Remaining: X</Typography>
    </Box>
  );
};

export const EndPanel: React.FC<unknown> = () => {
  return (
    <Box data-testid="ContractTime-Panel__EndTimeWrapper">
      <Typography>Time Till End: X</Typography>
      <Typography>Contract End Date: X</Typography>
    </Box>
  );
};
