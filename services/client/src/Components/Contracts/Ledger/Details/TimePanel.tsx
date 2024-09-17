import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
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
                    ? 'info.main'
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
                  ? 'info.main'
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

const getContractProgress = (
  contractStatus: string,
  startDateJs: Dayjs,
  endDateJs: Dayjs,
  startDateObj: Date | null | undefined,
  endDateObj: Date | null | undefined,
) => {
  const now = dayjs();
  if (contractStatus !== 'INPROGRESS') return null;
  if (!startDateObj || !endDateObj) return null;
  if (now.isBefore(startDateJs) || now.isAfter(endDateJs)) return null;

  const totalDuration = endDateJs.diff(startDateJs);
  const elapsedDuration = now.diff(startDateJs);
  return (elapsedDuration / totalDuration) * 100;
};

const getInterval = (endDateJs: Dayjs) => {
  const now = dayjs();
  const timeTillEnd = endDateJs.diff(now, 'second');

  if (timeTillEnd <= 0) return null;

  return timeTillEnd <= 60 ? 5000 : timeTillEnd <= 300 ? 10000 : 300000;
};

export const ContractDurationPanel: React.FC<TimePanelProps> = ({ contract }) => {
  const contractStatus = contract.status;
  // const bidEnd = dayjs(contract.bidDate);
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
  }, [contractStatus, contract.endDate, endDate]);

  const timeRemaining = getTimeRemaining();

  const getTimeElapsed = React.useCallback(() => {
    const now = dayjs();
    if (contractStatus !== 'INPROGRESS') return null;
    if (!contract.startDate) return null;
    if (contract.endDate) return null;
    if (now.isBefore(startDate)) return null;
    return now.to(startDate, true);
  }, [contractStatus, contract.startDate, contract.endDate, startDate]);

  const timeElapsed = getTimeElapsed();

  const getContractDuration = React.useCallback(() => {
    if (!contract.startDate || !contract.endDate) return null;
    if (startDate.isAfter(endDate)) return 'Invalid Start Time';
    return startDate.to(endDate, true);
  }, [startDate, contract.startDate, contract.endDate, endDate]);

  const contractDuration = getContractDuration();

  const [progress, setProgress] = React.useState<number | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const updateProgress = () => {
      if (!isMounted) return;
      const newProgress = getContractProgress(
        contractStatus,
        startDate,
        endDate,
        contract.startDate,
        contract.endDate,
      );
      setProgress(newProgress);
    };

    const scheduleUpdate = () => {
      if (!isMounted) return;
      const interval = getInterval(endDate);
      if (interval !== null) {
        timeoutRef.current = setTimeout(() => {
          updateProgress();
          scheduleUpdate();
        }, interval);
      }
    };

    updateProgress();
    scheduleUpdate();

    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setProgress(null);
    };
  }, [contract, contractStatus, endDate, startDate]);

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
              <Typography
                variant="body2"
                sx={{ ml: '.5em', color: 'text.secondary', cursor: 'auto' }}
              >
                {timeTillStart}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{ ml: '.5em', color: 'warning.main', cursor: 'auto' }}
              >
                Awaiting Start
              </Typography>
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
              <Typography
                variant="body2"
                sx={{ ml: '.5em', color: 'text.secondary', cursor: 'auto' }}
              >
                {timeRemaining}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{ ml: '.5em', color: 'warning.main', cursor: 'auto' }}
              >
                Awaiting Completion
              </Typography>
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
              <Typography
                variant="body2"
                sx={{ ml: '.5em', color: 'text.secondary', cursor: 'auto' }}
              >
                {timeElapsed}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{ ml: '.5em', color: 'warning.main', cursor: 'auto' }}
              >
                Error in Start Time.
              </Typography>
            )}
          </Typography>
        )}
        {contractStatus === 'CANCELED' && (
          <Typography variant="tip">Contract Was Canceled</Typography>
        )}
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
          Start Time:
          <Typography
            variant="body2"
            sx={{
              ml: '.5em',
              color:
                timeTillStart === 'Invalid Start Time'
                  ? 'warning.main'
                  : formattedStartDate === 'Manually Controlled'
                    ? 'info.main'
                    : 'text.secondary',
              cursor: 'auto',
            }}
          >
            {formattedStartDate}
          </Typography>
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
          End Time:
          <Typography
            variant="body2"
            sx={{
              ml: '.5em',
              color:
                timeRemaining === 'Invalid End Time'
                  ? 'warning.main'
                  : formattedEndDate === 'Manually Controlled'
                    ? 'info.main'
                    : 'text.secondary',
              cursor: 'auto',
            }}
          >
            {formattedEndDate}
          </Typography>
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
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', ml: '.5em', cursor: 'auto' }}
              >
                {contractDuration}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: 'warning.main', ml: '.5em', cursor: 'auto' }}
              >
                Invalid Timestamps.
              </Typography>
            )}
          </Typography>
        )}
        {progress !== null && (
          <Box sx={{ width: '80%' }}>
            <Tooltip title={`Contract Progress: ${progress.toFixed(2)}%`}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mt: '.1em' }}
              />
            </Tooltip>
          </Box>
        )}
      </DigiDisplay>
    </Box>
  );
};
