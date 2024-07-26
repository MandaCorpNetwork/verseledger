import { Box, LinearProgress, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback } from 'react';

type BidTimeRemainingProps = {
  bidDate: Date | null | undefined;
};

export const BidTimeRemaining: React.FC<BidTimeRemainingProps> = ({ bidDate }) => {
  const getTimeRemaining = useCallback(() => {
    if (!bidDate) return 'Manually Controlled';
    const now = dayjs();
    const bidEndDate = dayjs(bidDate);

    if (bidEndDate.isBefore(now)) return 'Bidding Closed';

    return bidEndDate.fromNow(true);
  }, [bidDate]);

  const calculateProgress = useCallback(() => {
    if (!bidDate) return 0;
    const now = dayjs();
    const bidEndDate = dayjs(bidDate);
    if (bidEndDate.isBefore(now)) return 0;

    const totalDuration = bidEndDate.diff(now, 'seconds');
    const remainingDuration = bidEndDate.diff(now, 'seconds');

    return (remainingDuration / totalDuration) * 100;
  }, [bidDate]);

  const bidTimeRemaining = getTimeRemaining();
  const progress = calculateProgress();
  return (
    <Box sx={{ mr: 'auto' }}>
      <Typography variant="tip" sx={{ color: 'info.main', px: '.5em' }}>
        Bidding Time Remaining: {bidTimeRemaining}
      </Typography>
      {bidTimeRemaining !== 'Manually Controlled' &&
        bidTimeRemaining !== 'Bidding Closed' && (
          <>
            <LinearProgress variant="determinate" value={progress} />
          </>
        )}
    </Box>
  );
};
