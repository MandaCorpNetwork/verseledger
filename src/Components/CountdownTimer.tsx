// Countdown Timer Component
// This component makes a countdown from a targetDate and a startingDate for a timerUse
// If there is no targetDate it will display a filled CircularProgress with a infinite icon in the center.
// With an actual countdown needed, it will display a CircularProgress that determins the percentage of time left over the start time with a dynamic timestamp in the middle showing the remaining time.
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type CountdownTimerProps = {
  targetDate: Date | null;
  updateDate: Date;
  timerUse: string;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  updateDate,
  timerUse,
}) => {
  const [countDown, setCountDown] = useState('');
  const [progress, setProgress] = useState(0);
  const [countDownFormat, setCountDownFormat] = useState('');
  const [countDownHelper, setCountDownHelper] = useState('');
  //Initalizes the countDown state for passing the remaining time
  //Initializes the progress for the amount of time that has expired out of the total time
  //Initalizes the countDownFormat for the text passed to the timestamp displayed to convey formatting
  //Initalizes the countDownHelper for the text passed to the Tooltip for displaying the countdown on hover for visualization issues

  if (!targetDate) {
    //Returns the default if there is no targetDate passed to the Filled Circular Progress with the infinite symbol
    return (
      <Tooltip title={`No ${timerUse} Timer`} arrow>
        <Box
          data-testid="Infinite-Countdown-Timer"
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: '.5em',
          }}
        >
          <AllInclusiveIcon color="secondary" />
          <Box sx={{ position: 'absolute' }}>
            <CircularProgress variant="determinate" value={100} color="primary" />
          </Box>
        </Box>
      </Tooltip>
    );
  } else {
    //Returns the functional CoundownTimer
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        //Fetches the current time in milliseconds
        const targetStart = new Date(targetDate).getTime();
        //Fetches the targetDate in milliseconds
        const distance = targetStart - now;
        //Calculates the distance between the current time and the targetDate

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        //Calculates the days, hours, minutes, and seconds remaining

        if (days > 2) {
          setCountDown(`${days}`);
          setCountDownFormat('Days');
          setCountDownHelper(`${days} Days`);
        } else if (days > 1 && hours > 2) {
          setCountDown(`${days} ${hours}`);
          setCountDownFormat('DD | HH');
          setCountDownHelper(`${days} Days ${hours} Hours`);
        } else if (days == 0 && hours > 2) {
          setCountDown(`${hours}`);
          setCountDownFormat('Hours');
          setCountDownHelper(`${hours} Hours`);
        } else if (days == 0 && hours < 2) {
          setCountDown(`${hours}:${minutes}`);
          setCountDownFormat('HH:MM');
          setCountDownHelper(`${hours} Hours ${minutes} Minutes`);
        } else if (days == 0 && hours == 0) {
          setCountDown(`${minutes}`);
          setCountDownFormat('Minutes');
          setCountDownHelper(`${minutes} Minutes`);
        } else if (minutes < 2 && minutes > 0) {
          setCountDown(`${minutes}:${seconds}`);
          setCountDownFormat('MM:SS');
          setCountDownHelper(`${minutes} Minutes ${seconds} Seconds`);
        } else if (minutes < 0 && minutes > 0) {
          setCountDown(`${seconds}`);
          setCountDownFormat('Seconds');
          setCountDownHelper(`${seconds} Seconds`);
        } else {
          clearInterval(interval);
          setCountDown('Expired');
          setCountDownFormat('');
          setCountDownHelper('No Time');
        }
        //Sets the countDown state for the remaining time formatted based on a decending > 2 structure & the sets the countDownFormat state for the text passed to the timestamp

        const originTime = new Date(updateDate).getTime();
        const totalTime = targetStart - originTime;
        //Calculates the total time available for the timer

        setProgress(countDown !== 'Expired' ? (distance / totalTime) * 100 : 0);
      }, 1000);
      //Sets the progress state for the percentage of time remaining out of the total time

      return () => clearInterval(interval);
      //Clears the interval when the component is unmounted
    }, [targetDate]);
    return (
      <Tooltip title={`${countDownHelper} Remaining for ${timerUse}`} arrow>
        <Box
          data-testid="CountdownTimer"
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: '.5em',
          }}
        >
          {countDown === 'Expired' ? (
            //Returns the X icon if the countdown has expired
            <HighlightOffIcon color="info" fontSize="large" />
          ) : (
            <Box
              data-testid="CountdownTimer-Timestamp"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Typography sx={{ fontSize: '.6em', fontWeight: 'bold' }}>
                {countDown}
              </Typography>
              <Typography sx={{ fontSize: '.6em', fontWeight: 'bold' }}>
                {countDownFormat}
              </Typography>
            </Box>
            //Returns the Countdown Timer with the remaining time and the countdown format
          )}
          <Box data-testid="CountdownTimer-ProgressWheel" sx={{ position: 'absolute' }}>
            <CircularProgress variant="determinate" value={progress} color="secondary" />
            {/*Returns the Circular Progress with the percentage of time remaining*/}
          </Box>
        </Box>
      </Tooltip>
    );
  }
};
