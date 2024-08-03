import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { IContract, IContractTimestamped } from 'vl-shared/src/schemas/ContractSchema';

type TimePanelProps = {
  contract: IContract;
};

dayjs.extend(relativeTime);

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
    const createdTime = dayjs((contract as IContractTimestamped)?.createdAt);
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

export const EndPanel: React.FC<TimePanelProps> = ({ contract }) => {
  const [isBidStart, setBidStart] = React.useState(false);
  const endDate = dayjs(contract?.endDate);
  const createdDate = dayjs((contract as IContractTimestamped)?.createdAt);

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
