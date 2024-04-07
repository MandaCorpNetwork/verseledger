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
  const [isBidEndManual, setIsBidEndManual] = React.useState(false);
  const [isStartDateManual, setIsStartDateManual] = React.useState(false);
  const [isEndDateManual, setIsEndDateManual] = React.useState(false);
  // Handling Time Change from the SelectTimeButton
  const handleTimeChange = (newTime: Date, fieldName: keyof typeof formData) => {
    if (!heldDate) {
      console.error('No date was selected.');
      return;
    }
    const dateSelected = dayjs(heldDate);
    const timeSelected = dayjs(newTime);

    const combinedDateTime = dateSelected
      .set('hour', timeSelected.hour())
      .set('minute', timeSelected.minute());
    // Passes in the date to formData
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
    onFormChange(fieldName, combinedDateTime.toDate());
    setHeldDate(null);
  };

  // Handling Time Change from the QuickTimeButton
  type AllowedUnitType = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';
  const [selectedBidEndQuickTime, setSelectedBidEndQuickTime] = React.useState<
    string | null
  >(null);
  const [selectedStartDateQuickTime, setSelectedStartDateQuickTime] = React.useState<
    string | null
  >(null);
  const [selectedEndDateQuickTime, setSelectedEndDateQuickTime] = React.useState<
    string | null
  >(null);

  // Quick Time Selection Handler
  const handleQuickTimeSelection = (
    duration: string,
    fieldName: keyof typeof formData,
  ) => {
    const [amount, unit] = duration.split(' ');

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

    if (isChecked && formData.bidEnd) {
      const newStartTime = dayjs(formData.bidEnd).add(1, 'second').toDate();
      onFormChange('startDate', newStartTime);
    }
  };

  React.useEffect(() => {
    if (afterBiddingChecked && formData.bidEnd && formData.startDate) {
      const expectedStartTime = dayjs(formData.bidEnd).add(1, 'second').toDate();

      if (!dayjs(formData.startDate).isSame(expectedStartTime)) {
        setAfterBiddingChecked(false);
      }
    }
  });

  const format = (date: Date | null) => {
    if (date) {
      return dayjs(date).format('MM/DD/YY HH:mm');
    } else {
      return '';
    }
  };

  const toggleEmergencyMode = () => {
    onFormChange('emergency', !formData.emergency);
    if (!formData.emergency) {
      onFormChange('endDate', null);
      onFormChange('startDate', null);
      onFormChange('bidEnd', null);
    }
  };

  return (
    <Box data-id="timeInfo-container">
      <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}>
        Time Info
      </FormLabel>
      <Box data-id="timeInfo-form" sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          data-id="timeInfo-form-controls"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 'auto',
            mb: 'auto',
          }}
        >
          <Box
            data-id="timeInfo-form-wrapper"
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {formData.emergency && <EmergencyOverlay />}
            <Box
              data-id="bidTime-form"
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
              data-id="startTime-form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                data-id="startTime-form-title-wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormLabel>Start Time:</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={afterBiddingChecked}
                      onChange={handleAfterBiddingChange}
                      disabled={formData.bidEnd === null}
                    />
                  }
                  label="After Bidding"
                  sx={{
                    color: 'text.secondary',
                  }}
                />
              </Box>
              <Box
                data-id="startTime-form-controls"
                sx={{
                  justifySelf: 'center',
                }}
              >
                <SelectTimeButton
                  onTimeChange={(selectedDate) =>
                    handleTimeChange(selectedDate, 'startDate')
                  }
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
              data-id="endTime-form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormLabel>End Time:</FormLabel>
              <SelectTimeButton
                onTimeChange={(selectedDate) => handleTimeChange(selectedDate, 'endDate')}
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
          data-id="timeInfo-form-output"
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
                  ? 'Bid End comes before Start Time'
                  : formData.bidEnd && isTimeAfter(formData.bidEnd, formData.endDate)
                    ? 'Bid End comes before End Time'
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
                  ? 'Start Time comes after Bid End Time'
                  : formData.endDate && isTimeAfter(formData.startDate, formData.endDate)
                    ? 'Start Time must be before End Time'
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
                  ? 'End Time comes after Bid End Time'
                  : formData.startDate &&
                      isTimeBefore(formData.endDate, formData.startDate)
                    ? 'End Time must be after Start Time'
                    : ''
            }
            sx={{ mt: '.7em', mb: '1em', width: '200px' }}
          />
        </Box>
      </Box>
      <Box
        data-id="timeInfo-form-emergency"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '.5em',
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<NotificationsActive />}
          onClick={toggleEmergencyMode}
        >
          <Typography>Emergency</Typography>
        </Button>
      </Box>
    </Box>
  );
};
