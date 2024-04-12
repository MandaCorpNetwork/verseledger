import { Cancel, NotificationsActive } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { EmergencyOverlay } from './TimeInfoFormControls/EmergencyOverlay';
import { QuickTimeButton } from './TimeInfoFormControls/QuickTimeButton';
import { SelectTimeButton } from './TimeInfoFormControls/SelectTimeButton';

type TimeInfoFormProps = {
  formData: {
    bidEnd: Date;
    startDate: Date;
    endDate: Date;
    emergency: boolean | string;
  };
  onFormChange: (field: string, value: Date | boolean | null) => void;
};

export const TimeInfoForm: React.FC<TimeInfoFormProps> = ({ formData, onFormChange }) => {
  // Date Formatter
  const format = (date: Date | null) => {
    if (date) {
      return dayjs(date).format('MM/DD/YY HH:mm');
    } else {
      return '';
    }
  };

  // Time Validation Functions
  function isTimeAfter(time1: Date, time2: Date) {
    const dayjsTime1 = dayjs(time1);
    const dayjsTime2 = dayjs(time2);
    return dayjsTime1.isAfter(dayjsTime2);
  }

  function isTimeBefore(time1: Date, time2: Date) {
    const dayjsTime1 = dayjs(time1);
    const dayjsTime2 = dayjs(time2);
    return dayjsTime1.isBefore(dayjsTime2);
  }

  const [heldDate, setHeldDate] = React.useState<Date | null>(null);
  // Temporary storage of selected date from SelectTimeButton
  const [isBidEndManual, setIsBidEndManual] = React.useState(false);
  const [isStartDateManual, setIsStartDateManual] = React.useState(false);
  const [isEndDateManual, setIsEndDateManual] = React.useState(false);
  // Flag for manually set date, passed to QuickTimeSelectButton disabling the group

  // Handling Time Change from the SelectTimeButton & dataForm.field manualSelect Flag
  const handleTimeChange = (newTime: Date, fieldName: keyof typeof formData) => {
    if (!heldDate) {
      console.error('No date was selected.');
      return;
    }
    const dateSelected = dayjs(heldDate);
    const timeSelected = dayjs(newTime);
    // Converts the date selected to dayjs object

    const combinedDateTime = dateSelected
      .set('hour', timeSelected.hour())
      .set('minute', timeSelected.minute());
    // Combines the date and time selected into one dayjs object

    // Switch for the field name to determine which flag to set for manualSelect
    switch (fieldName) {
      case 'bidEnd':
        setIsBidEndManual(true);
        break;
      case 'startDate':
        setIsStartDateManual(true);
        break;
      case 'endDate':
        setIsEndDateManual(true);
        break;
      default:
        console.error('Invalid field name', fieldName);
        break;
    }

    // Pass the combinedDateTime to the formData state
    onFormChange(fieldName, combinedDateTime.toDate());
    setHeldDate(null);
    // Reset the heldDate state
  };

  // Handling Time Change from the QuickTimeButton
  type AllowedUnitType = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';
  // List of allowed units for the QuickTimeButton
  const [selectedBidEndQuickTime, setSelectedBidEndQuickTime] = React.useState<
    string | null
  >(null);
  const [selectedStartDateQuickTime, setSelectedStartDateQuickTime] = React.useState<
    string | null
  >(null);
  const [selectedEndDateQuickTime, setSelectedEndDateQuickTime] = React.useState<
    string | null
  >(null);
  // Temporary storage of selected time from QuickTimeButton Styling

  // Quick Time Selection Handler
  const handleQuickTimeSelection = (
    duration: string,
    fieldName: keyof typeof formData,
  ) => {
    const [amount, unit] = duration.split(' ');
    // Separates the duration into an amount and unit

    // UnitType Error Handler
    if (!['year', 'month', 'week', 'day', 'hour', 'minute', 'second'].includes(unit)) {
      console.error('Invalid unit type of date', unit);
      return;
    }

    const newTime = dayjs()
      .add(parseInt(amount, 10), unit as AllowedUnitType)
      .toDate();
    onFormChange(fieldName, newTime);
    // Passes in the date to formData

    // QuickTimeButton Styling Handler
    switch (fieldName) {
      case 'bidEnd':
        setSelectedBidEndQuickTime(duration);
        break;
      case 'startDate':
        setSelectedStartDateQuickTime(duration);
        break;
      case 'endDate':
        setSelectedEndDateQuickTime(duration);
        break;
      default:
        console.error('Invalid field name', fieldName);
        break;
    }
  };

  // Handling Time Change from the After Bidding Checkbox
  const [afterBiddingChecked, setAfterBiddingChecked] = React.useState(false);

  const handleAfterBiddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAfterBiddingChecked(isChecked);
    setSelectedStartDateQuickTime(null);
    // Reset the QuickTimeButton styling

    // If after bidding is checked, set the start date to be 1 second after the bid end time
    if (isChecked && formData.bidEnd) {
      const newStartTime = dayjs(formData.bidEnd).add(1, 'second').toDate();
      onFormChange('startDate', newStartTime);
    }
  };

  // Handling Time Change from the Before Bidding Checkbox
  React.useEffect(() => {
    if (afterBiddingChecked && formData.bidEnd && formData.startDate) {
      const expectedStartTime = dayjs(formData.bidEnd).add(1, 'second').toDate();
      // If after bidding is checked, set the start date to be 1 second after the bid end time

      if (!dayjs(formData.startDate).isSame(expectedStartTime)) {
        setAfterBiddingChecked(false);
      }
      // If the start date is not the expected start time, uncheck the after bidding checkbox
    }
  });

  // Handling Time Change from the Emergency Mode Checkbox
  const toggleEmergencyMode = () => {
    onFormChange('emergency', !formData.emergency);
    if (!formData.emergency) {
      onFormChange('endDate', null);
      onFormChange('startDate', null);
      onFormChange('bidEnd', null);
    }
  };

  return (
    <Box data-testid="timeInfo-container">
      <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}>
        Time Info
      </FormLabel>
      <Box data-testid="timeInfo-form" sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          data-testid="timeInfo-form-controls"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 'auto',
            mb: 'auto',
          }}
        >
          <Box
            data-testid="timeInfo-form-wrapper"
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {formData.emergency && <EmergencyOverlay />}
            <Box
              data-testid="bidTime-form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormLabel>Bid Time:</FormLabel>
              <SelectTimeButton
                onDateChange={(newDate) => setHeldDate(newDate)}
                onTimeChange={(newTime) => handleTimeChange(newTime, 'bidEnd')}
              />
              <QuickTimeButton
                time="30 min"
                isSelected={selectedBidEndQuickTime === '30 minute'}
                isManual={isBidEndManual}
                onClick={() => handleQuickTimeSelection('30 minute', 'bidEnd')}
              />
              <QuickTimeButton
                time="1 hr"
                isSelected={selectedBidEndQuickTime === '1 hour'}
                isManual={isBidEndManual}
                onClick={() => handleQuickTimeSelection('1 hour', 'bidEnd')}
              />
              <QuickTimeButton
                time="2 hr"
                isSelected={selectedBidEndQuickTime === '2 hour'}
                isManual={isBidEndManual}
                onClick={() => handleQuickTimeSelection('2 hour', 'bidEnd')}
              />
              <QuickTimeButton
                time="4 hr"
                isSelected={selectedBidEndQuickTime === '4 hour'}
                isManual={isBidEndManual}
                onClick={() => handleQuickTimeSelection('4 hour', 'bidEnd')}
              />
              <QuickTimeButton
                time="8 hr"
                isSelected={selectedBidEndQuickTime === '8 hour'}
                isManual={isBidEndManual}
                onClick={() => handleQuickTimeSelection('8 hour', 'bidEnd')}
              />
            </Box>
            <Box
              data-testid="startTime-form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                data-testid="startTime-form-title-wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormLabel>Start Time:</FormLabel>
              </Box>
              <Box
                data-testid="startTime-form-controls"
                sx={{
                  justifySelf: 'center',
                }}
              >
                <SelectTimeButton
                  onDateChange={(newDate) => setHeldDate(newDate)}
                  onTimeChange={(newTime) => handleTimeChange(newTime, 'startDate')}
                />
                <QuickTimeButton
                  time="30 min"
                  isSelected={selectedStartDateQuickTime === '30 minute'}
                  isManual={isStartDateManual}
                  onClick={() => handleQuickTimeSelection('30 minute', 'startDate')}
                />
                <QuickTimeButton
                  time="1 hr"
                  isSelected={selectedStartDateQuickTime === '1 hour'}
                  isManual={isStartDateManual}
                  onClick={() => handleQuickTimeSelection('1 hour', 'startDate')}
                />
                <QuickTimeButton
                  time="2 hr"
                  isSelected={selectedStartDateQuickTime === '2 hour'}
                  isManual={isStartDateManual}
                  onClick={() => handleQuickTimeSelection('2 hour', 'startDate')}
                />
                <QuickTimeButton
                  time="4 hr"
                  isSelected={selectedStartDateQuickTime === '4 hour'}
                  isManual={isStartDateManual}
                  onClick={() => handleQuickTimeSelection('4 hour', 'startDate')}
                />
                <QuickTimeButton
                  time="8 hr"
                  isSelected={selectedStartDateQuickTime === '8 hour'}
                  isManual={isStartDateManual}
                  onClick={() => handleQuickTimeSelection('8 hour', 'startDate')}
                />
              </Box>
            </Box>
            <Box
              data-testid="endTime-form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormLabel>End Time:</FormLabel>
              <SelectTimeButton
                onDateChange={(newDate) => setHeldDate(newDate)}
                onTimeChange={(newTime) => handleTimeChange(newTime, 'endDate')}
              />
              <QuickTimeButton
                time="30 min"
                isSelected={selectedEndDateQuickTime === '30 minute'}
                isManual={isEndDateManual}
                onClick={() => handleQuickTimeSelection('30 minute', 'endDate')}
              />
              <QuickTimeButton
                time="1 hr"
                isSelected={selectedEndDateQuickTime === '1 hour'}
                isManual={isEndDateManual}
                onClick={() => handleQuickTimeSelection('1 hour', 'endDate')}
              />
              <QuickTimeButton
                time="2 hr"
                isSelected={selectedEndDateQuickTime === '2 hour'}
                isManual={isEndDateManual}
                onClick={() => handleQuickTimeSelection('2 hour', 'endDate')}
              />
              <QuickTimeButton
                time="4 hr"
                isSelected={selectedEndDateQuickTime === '4 hour'}
                isManual={isEndDateManual}
                onClick={() => handleQuickTimeSelection('4 hour', 'endDate')}
              />
              <QuickTimeButton
                time="8 hr"
                isSelected={selectedEndDateQuickTime === '8 hour'}
                isManual={isEndDateManual}
                onClick={() => handleQuickTimeSelection('8 hour', 'endDate')}
              />
            </Box>
          </Box>
        </Box>
        <Box
          data-testid="timeInfo-form-output"
          sx={{ display: 'flex', flexDirection: 'column', ml: '.5em' }}
        >
          <TextField
            data-testid="bidEnd-Form-Output"
            label="Bid Time"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      onFormChange('bidEnd', null);
                      setSelectedBidEndQuickTime(null);
                      setIsBidEndManual(false);
                    }}
                    disabled={!formData.bidEnd}
                    size="small"
                  >
                    <Cancel
                      fontSize="medium"
                      color={!formData.bidEnd ? 'disabled' : 'secondary'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.bidEnd ? format(formData.bidEnd) : 'Manual Bid End'}
            color="secondary"
            error={
              (formData.startDate && isTimeAfter(formData.bidEnd, formData.startDate)) ||
              (formData.endDate && isTimeAfter(formData.bidEnd, formData.endDate))
            }
            helperText={
              formData.startDate &&
              formData.endDate &&
              isTimeAfter(formData.bidEnd, formData.startDate) &&
              isTimeAfter(formData.bidEnd, formData.endDate)
                ? 'Concept of time eledues you.'
                : formData.bidEnd && isTimeAfter(formData.bidEnd, formData.startDate)
                  ? 'BidTime after StartTime'
                  : formData.bidEnd && isTimeAfter(formData.bidEnd, formData.endDate)
                    ? 'BidTime after EndTime'
                    : ''
            }
            sx={{ mb: '1em', width: '200px' }}
          />
          <TextField
            data-testid="startTime-Form-Output"
            label="Start Time"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setAfterBiddingChecked(false); //Clears the startDate
                      onFormChange('startDate', null);
                      setSelectedStartDateQuickTime(null);
                      setIsStartDateManual(false);
                    }}
                    disabled={!formData.startDate}
                    size="small"
                  >
                    <Cancel
                      fontSize="medium"
                      color={!formData.startDate ? 'disabled' : 'secondary'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.startDate ? format(formData.startDate) : 'Manual Start'}
            color="secondary"
            error={
              (formData.bidEnd && isTimeBefore(formData.startDate, formData.bidEnd)) ||
              (formData.endDate && isTimeAfter(formData.startDate, formData.endDate))
            }
            helperText={
              formData.bidEnd &&
              formData.endDate &&
              isTimeBefore(formData.startDate, formData.bidEnd) &&
              isTimeAfter(formData.startDate, formData.endDate)
                ? 'Concept of time eludes you.'
                : formData.bidEnd && isTimeBefore(formData.startDate, formData.bidEnd)
                  ? 'StartTime before BidTime'
                  : formData.endDate && isTimeAfter(formData.startDate, formData.endDate)
                    ? 'StartTime after EndTime'
                    : ''
            }
            sx={{ mt: '.7em', mb: '1em', width: '200px' }}
          />
          <TextField
            data-testid="endTime-Form-Output"
            label="End Time"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      onFormChange('endDate', null);
                      setSelectedEndDateQuickTime(null);
                      setIsEndDateManual(false);
                    }}
                    disabled={!formData.endDate}
                    size="small"
                  >
                    <Cancel
                      fontSize="medium"
                      color={!formData.endDate ? 'disabled' : 'secondary'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.endDate ? format(formData.endDate) : 'Manual End'}
            color="secondary"
            error={
              (formData.bidEnd && isTimeBefore(formData.endDate, formData.bidEnd)) ||
              (formData.startDate && isTimeBefore(formData.endDate, formData.startDate))
            }
            helperText={
              formData.bidEnd &&
              formData.startDate &&
              isTimeBefore(formData.endDate, formData.bidEnd) &&
              isTimeBefore(formData.endDate, formData.startDate)
                ? 'Concept of time eludes you.'
                : formData.bidEnd && isTimeBefore(formData.endDate, formData.bidEnd)
                  ? 'EndTime before BidTime'
                  : formData.startDate &&
                      isTimeBefore(formData.endDate, formData.startDate)
                    ? 'EndTime before StartTime'
                    : ''
            }
            sx={{ mt: '.7em', mb: '.5em', width: '200px' }}
          />
        </Box>
      </Box>
      <Box
        data-testid="timeInfo-form-emergency"
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          mt: '.5em',
          ml: '.5em',
          mb: '.2em',
        }}
      >
        <FormControlLabel
          data-testid="afterbidding-checkbox"
          control={
            <Checkbox
              color="secondary"
              checked={afterBiddingChecked}
              onChange={handleAfterBiddingChange}
              disabled={formData.bidEnd === null}
            />
          }
          label="Start After Bidding"
          sx={{
            color: 'text.secondary',
          }}
        />
        <Button
          variant="contained"
          color="error"
          startIcon={<NotificationsActive />}
          onClick={toggleEmergencyMode}
          sx={{
            ml: '1em',
          }}
        >
          <Typography>Emergency</Typography>
        </Button>
        {formData.emergency && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: '2em',
              alignItems: 'center',
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderColor: 'warning.main',
              borderRadius: '5px',
              pl: '.5em',
              pr: '.5em',
              pb: '.2em',
              pt: '.2em',
              backgroundColor: 'rgba(255, 141, 15, .1)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'warning.main' }}>
              Emergency being active disables some settings.
            </Typography>
            <Typography variant="body2" sx={{ color: 'warning.main' }}>
              Contract start defaults to manual.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
