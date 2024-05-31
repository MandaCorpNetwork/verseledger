import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { pickContract } from '@Redux/Slices/Contracts/contractSelectors';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

type TimePanelProps = {
  contractId: string | null;
};

export const BidPanel: React.FC<TimePanelProps> = ({ contractId }) => {
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

export const StartPanel: React.FC<TimePanelProps> = ({ contractId }) => {
  const contract = useAppSelector((root) => pickContract(root, contractId as string));
  const [isBidEnd, setIsBidEnd] = React.useState(false);

  const bidEnd = dayjs(contract?.bidDate);
  const startDate = dayjs(contract?.startDate);
  const endDate = dayjs(contract?.endDate);

  const formattedStartDate = startDate.format('DD MMM, YY @ HH:mm');

  console.log(contract);

  React.useEffect(() => {
    if (contract?.bidDate == null) return;
    const interval = setInterval(() => {
      const now = dayjs();
      if (now >= bidEnd) {
        setIsBidEnd(true);
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [contract, bidEnd, setIsBidEnd, isBidEnd]);

  const timeToStart = React.useCallback(() => {
    const tillStart = startDate.toNow(true);
    return tillStart;
  }, [startDate]);

  const tillStartProgress = React.useCallback(() => {
    const now = dayjs();
    const createdTime = dayjs(contract?.createdAt);
    const totalTime = startDate.diff(createdTime);
    const elapsedTime = now.diff(createdTime);
    const progress = (elapsedTime / totalTime) * 100;
    console.log(`${createdTime} createdTime`);
    console.log(`${startDate} start`);
    console.log(`${totalTime} total`);
    console.log(`${elapsedTime} elapsed`);
    console.log(`${progress} progress`);
    return Math.round(progress);
  }, [contract, startDate]);

  const contractDurationCalc = () => {
    dayjs.extend(duration);
    const totalDuration = dayjs.duration(endDate.diff(startDate));

    const days = Math.floor(totalDuration.asDays());
    const hours = Math.floor(totalDuration.asHours()) % 24;
    const minutes = Math.floor(totalDuration.asMinutes()) % 60;

    if (days > 1) {
      return `${days} Days`;
    } else if (days == 0 && hours > 1 && minutes > 1) {
      return `${hours} Hours & ${minutes} Minutes`;
    } else if (hours >= 1 && minutes >= 1) {
      return `${hours} Hours & ${minutes} Minutes`;
    } else if (hours > 1 && minutes <= 0) {
      return `${hours} Hours`;
    } else if (hours == 1 && minutes <= 0) {
      return `${hours} Hour`;
    } else if (hours <= 0 && minutes > 1) {
      return `${minutes} Minutes`;
    } else if (minutes >= 1) {
      return `${minutes} Minute`;
    } else {
      return `Manually Ending`;
    }
  };

  const contractDuration = contractDurationCalc();

  const timeRemaining = React.useCallback(() => {
    const tillEnd = dayjs().to(endDate, true);
    return tillEnd;
  }, [endDate]);

  const contractProgress = React.useCallback(() => {
    const now = dayjs();
    const totalTime = endDate.diff(startDate);
    const elapsedTime = startDate.diff(now);
    const progress = (elapsedTime / totalTime) * 100;
    return Math.round(progress);
  }, [startDate, endDate]);

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
        data-testid="ContractTime-Panel-StartTime__TextWrapper"
        sx={{
          width: '100%',
        }}
      >
        {isBidEnd ? (
          <>
            <Typography
              data-testid="ContractTime-Panel-StartTime__StartDate"
              align="center"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              Contract Start Date: {formattedStartDate}
            </Typography>
            <Typography
              data-testid="ContractTime-Panel-StartTime__TimeTillStart"
              align="center"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              Contract Time Remaining: {timeRemaining()}
            </Typography>
            <Box
              data-testid="ContractTime-Panel-StartTime__ProgressWrapper"
              sx={{
                width: '50%',
                mx: 'auto',
                mt: '.5em',
              }}
            >
              <Tooltip title={`Progress: ${contractProgress()}%`} arrow>
                <LinearProgress
                  data-testid="ContractTime-Panel-StartTime-Progress__ContractDuration"
                  variant="determinate"
                  value={contractProgress()}
                />
              </Tooltip>
            </Box>
          </>
        ) : (
          <>
            <Typography
              data-testid="ContractTime-Panel-StartTime__TimeTillStart"
              align="center"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              Time Till Start: {timeToStart()}
            </Typography>
            <Typography
              data-testid="ContractTime-Panel-StartTime__ContractLength"
              align="center"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              Contract Length: {contractDuration}
            </Typography>
            <Box
              data-testid="ContractTime-Panel-StartTime__ProgressWrapper"
              sx={{
                width: '50%',
                mx: 'auto',
                mt: '.5em',
              }}
            >
              <Tooltip
                data-testid="ContractTime-Panel-StartTime-Progress__TillStart"
                title={`${tillStartProgress()}% to Start Time`}
                arrow
              >
                <LinearProgress variant="determinate" value={tillStartProgress()} />
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export const EndPanel: React.FC<TimePanelProps> = ({ contractId }) => {
  const contract = useAppSelector((root) => pickContract(root, contractId as string));
  const [isBidStart, setBidStart] = React.useState(false);
  const endDate = dayjs(contract?.endDate);
  const createdDate = dayjs(contract?.createdAt);

  React.useEffect(() => {
    const status = contract?.status;
    if (status !== 'INPROGRESS') return;
    const interval = setInterval(() => {
      if (status == 'INPROGRESS') {
        setBidStart(true);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [contract, setBidStart]);

  const tillEnd = React.useCallback(() => {
    const remainder = dayjs().to(endDate, true);
    return remainder;
  }, [endDate]);

  const contractProgress = React.useCallback(() => {
    const now = dayjs();
    const totalTime = endDate.diff(createdDate);
    const elapsedTime = now.diff(createdDate);
    const progress = (elapsedTime / totalTime) * 100;
    return Math.round(progress);
  }, [createdDate, endDate]);

  const formattedEndDate = endDate.format('DD MMM, YY @ HH:mm');

  return (
    <Box
      data-testid="ContractTime-Panel__EndTimeContainer"
      sx={{
        width: '100%',
        height: '100%',
        alignContent: 'center',
      }}
    >
      <Box
        data-testid="ContractTime-Panel-EndTime__TextWrapper"
        sx={{
          width: '100%',
        }}
      >
        {isBidStart ? (
          <Typography
            data-testid="ContractTime-Panel-StartTime__ContractLength"
            align="center"
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'text.secondary' }}
          >
            Time Till End: {tillEnd()}
          </Typography>
        ) : (
          <></>
        )}

        <Typography
          data-testid="ContractTime-Panel-StartTime__ContractLength"
          align="center"
          variant="body2"
          sx={{ fontWeight: 'bold', color: 'text.secondary' }}
        >
          Contract End Date: {formattedEndDate}
        </Typography>
        <Box
          data-testid="ContractTime-Panel-StartTime__ProgressWrapper"
          sx={{
            width: '50%',
            mx: 'auto',
            mt: '.5em',
          }}
        >
          <Tooltip title={`${contractProgress()}%`} arrow>
            <LinearProgress variant="determinate" value={contractProgress()} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
