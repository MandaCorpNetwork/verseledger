import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
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
  const bidTime = dayjs(contract?.bidDate);

  const formattedBidEnd = bidTime.format('DD MMM, YY @ HH:mm');

  const timeRemaining = React.useCallback(() => {
    dayjs.extend(relativeTime);
    const remainder = dayjs().to(bidTime, true);
    return remainder;
  }, [contract, bidTime]);

  const timeProgress = React.useCallback(() => {
    const now = dayjs();
    const updatedTime = dayjs(contract.updatedAt);
    const totalTime = bidTime.diff(updatedTime);
    const elapsedTime = now.diff(updatedTime);
    const progress = (elapsedTime / totalTime) * 100;
    return Math.round(progress);
  }, [contract, bidTime]);

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
        <Tooltip title={`${timeProgress()}%`} arrow>
          <LinearProgress variant="determinate" value={timeProgress()} />
        </Tooltip>
      </Box>
    </Box>
  );
};

export const StartPanel: React.FC<TimePanel> = ({ contractId }) => {
  const contract = useAppSelector((root) => pickContract(root, contractId as string));
  const [isBidEnd, setIsBidEnd] = React.useState(false);

  const bidEnd = dayjs(contract?.bidDate);

  React.useEffect(() => {
    if (contract?.bidDate == null) return;
    const interval = set
    const now = dayjs();
    if (now >= bidEnd) {
      setIsBidEnd(true);
    }
    return;
  });

  return (
    <Box
      data-testid="ContractTime-Panel__StartTimeContainer"
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
        {isBidEnd ? (
          <></>
        ) : (
          <Typography
            align="center"
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'text.secondary' }}
          >
            Time Till Start: X
          </Typography>
        )}
        <Typography
          align="center"
          variant="body2"
          sx={{ fontWeight: 'bold', color: 'text.secondary' }}
        >
          Contract Start Date: X
        </Typography>
        {isBidEnd ? (
          <Typography
            align="center"
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'text.secondary' }}
          >
            Contract Time Remaining: X
          </Typography>
        ) : (
          <></>
        )}
        <Typography
          align="center"
          variant="body2"
          sx={{ fontWeight: 'bold', color: 'text.secondary' }}
        >
          Contract Time Remaining: X
        </Typography>
      </Box>
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
/*
Time between %
So Contract Update
Bid End
Total time is duration between update and Bid
Time elapsed is distance from Update to now
Progress is Elapsed/Total

*/