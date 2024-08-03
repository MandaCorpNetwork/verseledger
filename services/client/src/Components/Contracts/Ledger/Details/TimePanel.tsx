import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type TimePanelProps = {
  contract: IContract;
};

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const BiddingTimePanel: React.FC<TimePanelProps> = ({ contract }) => {
  const getBidDate = React.useCallback(() => {
    if (!contract.bidDate) return 'Manually Controlled';
    const bidDate = dayjs(contract.bidDate);
    const formattedBidEnd = bidDate.format('DD MMM, YY @ HH:mm');
    return formattedBidEnd;
  }, [contract.bidDate]);
  const formattedBidEnd = getBidDate();

  const timeRemaining = React.useCallback(() => {
    if (contract.status !== 'BIDDING') return 'Bidding Closed';
    if (!contract.bidDate) return 'Manual';
    const now = dayjs();
    const bidDate = dayjs(contract.bidDate);
    if (now.isAfter(bidDate)) return 'Bidding Closed';
    const remainder = dayjs().to(bidDate, true);
    return remainder;
  }, [contract.status, contract.bidDate]);

  const timeRemainingDisplay = timeRemaining();

  return (
    <Box
      data-testid="ContractTime-Panel__BidTimeContainer"
      sx={{
        display: 'inline-flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <DigiDisplay
        data-testid="ContractTime-Panel-BidTime__TextWrapper"
        sx={{ p: '1em' }}
      >
        {timeRemainingDisplay !== 'Manual' && (
          <Typography
            align="center"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Bid Time Remaining:
            <Typography
              variant="body2"
              sx={{
                ml: '.5em',
                color:
                  timeRemainingDisplay === 'Bidding Closed'
                    ? 'warning.main'
                    : 'text.secondary',
                cursor: 'auto',
              }}
            >
              {timeRemainingDisplay}
            </Typography>
          </Typography>
        )}
        <Typography
          align="center"
          variant="body2"
          sx={{
            fontWeight: 'bold',
            cursor: 'default',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Bid End Date:{' '}
          <Typography
            variant="body2"
            sx={{
              ml: '.5em',
              color:
                formattedBidEnd === 'Manually Controlled'
                  ? 'warning.main'
                  : 'text.secondary',
              cursor: 'auto',
            }}
          >
            {formattedBidEnd}
          </Typography>
        </Typography>
      </DigiDisplay>
    </Box>
  );
};

export const ContractDurationPanel: React.FC<TimePanelProps> = ({ contract }) => {
  const contractStatus = contract.status;
  const bidEnd = dayjs(contract.bidDate);
  const startDate = dayjs(contract.startDate);
  const endDate = dayjs(contract.endDate);

  const formattedStartDate = contract.startDate
    ? startDate.format('DD MMM, YY @ HH:mm')
    : 'Manually Controlled';

  const formattedEndDate = contract.endDate
    ? endDate.format('DD MMM, YY @ HH:mm')
    : 'Manually Controlled';

  const getTimeTillStart = React.useCallback(() => {
    const now = dayjs();
    if (contractStatus !== 'BIDDING') return null;
    if (!contract.startDate) return null;
    if (now.isAfter(startDate)) return 'Invalid Start Time';
    return now.to(startDate, true);
  }, [contractStatus, startDate, contract.startDate]);

  const timeTillStart = getTimeTillStart();

  const getTimeRemaining = React.useCallback(() => {
    const now = dayjs();
    if (contractStatus !== 'INPROGRESS') return null;
    if (!contract.endDate) return null;
    if (now.isAfter(endDate)) return 'Invalid End Time';
    return now.to(endDate, true);
  }, [contractStatus, bidEnd, contract.bidDate]);

  const timeRemaining = getTimeRemaining();

  const getTimeElapsed = React.useCallback(() => {
    const now = dayjs();
    if (contractStatus !== 'INPROGRESS') return null;
    if (!contract.startDate) return null;
    if (contract.endDate) return null;
    if (now.isBefore(startDate)) return null;
    return now.to(startDate, true);
  }, [contractStatus, startDate, contract.startDate]);

  const timeElapsed = getTimeElapsed();

  const getContractDuration = React.useCallback(() => {
    if (!contract.startDate || !contract.endDate) return null;
    if (startDate.isAfter(endDate)) return 'Invalid Start Time';
    return startDate.to(endDate, true);
  }, [contractStatus, startDate, contract.startDate, contract.endDate, endDate]);

  const contractDuration = getContractDuration();

  const getContractProgress = React.useCallback(() => {
    const now = dayjs();
    if (contractStatus !== 'INPROGRESS' || !contract.startDate || !contract.endDate)
      return null;
    if (now.isBefore(startDate) || now.isAfter(endDate)) return null;

    const totalDuration = endDate.diff(startDate);
    const elapsedDuration = now.diff(startDate);
    return (elapsedDuration / totalDuration) * 100;
  }, [contractStatus, startDate, endDate]);

  const [progress, setProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    const updateInterval = () => {
      const now = dayjs();
      const timeTillEnd = endDate.diff(now, 'second');

      if (timeTillEnd <= 0) {
        setProgress(100);
        return;
      }

      if (timeTillEnd <= 60) return 5000;
      if (timeTillEnd <= 300) return 10000;
      return 300000;
    };

    const interval = setInterval(() => {
      setProgress(getContractProgress());
    }, updateInterval());
    return () => clearInterval(interval);
  }, [contractStatus, startDate, endDate, getContractProgress]);

  return (
    <Box
      data-testid="ContractTime-Panel__StartTimeContainer"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DigiDisplay
        data-testid="ContractTime-Panel-StartTime__TextWrapper"
        sx={{
          py: '.5em',
          px: '1em',
        }}
      >
        {timeTillStart !== null && (
          <Typography
            align="center"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Time Till Start:
            {timeTillStart !== 'Invalid Start Time' ? (
              <Typography>{timeTillStart}</Typography>
            ) : (
              <Typography>Error in Start Time.</Typography>
            )}
          </Typography>
        )}
        {timeRemaining !== null && (
          <Typography
            align="center"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Time Remaining:
            {timeRemaining !== 'Invalid End Time' ? (
              <Typography>{timeRemaining}</Typography>
            ) : (
              <Typography>Error in End Time.</Typography>
            )}
          </Typography>
        )}
        {timeElapsed !== null && (
          <Typography
            align="center"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Time Elapsed:
            {timeElapsed !== 'Invalid Start Time' ? (
              <Typography>{timeElapsed}</Typography>
            ) : (
              <Typography>Error in Start Time.</Typography>
            )}
          </Typography>
        )}
        {contractStatus === 'CANCELED' && <Typography>Contract Was Canceled</Typography>}
        {contractStatus === 'COMPLETED' && <Typography>Contract is Complete</Typography>}
        <Typography
          align="center"
          variant="body2"
          sx={{
            fontWeight: 'bold',
            cursor: 'default',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Start Time: <Typography>{formattedStartDate}</Typography>
        </Typography>
        <Typography
          align="center"
          variant="body2"
          sx={{
            fontWeight: 'bold',
            cursor: 'default',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          End Time: <Typography>{formattedEndDate}</Typography>
        </Typography>
        {contractDuration !== null && (
          <Typography
            align="center"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Contract Duration:
            {contractDuration !== 'Invalid Start Time' ? (
              <Typography>{contractDuration}</Typography>
            ) : (
              <Typography>Invalid Timestamps.</Typography>
            )}
          </Typography>
        )}
        {progress !== null && (
          <Box sx={{ width: '80%' }}>
            <Tooltip title={`Contract Progress: ${progress}%`}>
              <LinearProgress variant="determinate" value={progress} />
            </Tooltip>
          </Box>
        )}
      </DigiDisplay>
    </Box>
  );
};
