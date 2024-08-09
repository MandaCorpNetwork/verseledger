import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { isDev } from '@Utils/isDev';
import React from 'react';
import { IFeedbackForm } from 'vl-shared/src/schemas/FeedbackFormSchema';

import { useSoundEffect } from '@/AudioManager';

type FeedbackType =
  | 'BUG'
  | 'SUGGESTION'
  | 'QUESTION'
  | 'USER_ISSUE'
  | 'UPDATE'
  | 'MILESTONE';

export const FeedbackForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const dev = isDev();
  const { playSound } = useSoundEffect();
  const { formData, setFormData } = props;

  const handleTypeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newType = event.target.value as FeedbackType;
      playSound('clickMain');
      setFormData({ type: newType });
    },
    [setFormData],
  );
  return (
    <GlassBox
      data-testid="Feedback-Popup__Form_Container"
      sx={{
        p: '.5em',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <DigiBox
        data-testid="Feedback-Popup-Form__IssueType_Wrapper"
        sx={{ p: { xs: '.5em', md: '1em' } }}
      >
        <FormControl color="info">
          <FormLabel>Feedback Type</FormLabel>
          <DigiDisplay>
            <RadioGroup value={formData.type ?? null} onChange={handleTypeChange}>
              <FormControlLabel
                control={<Radio size="small" color="info" />}
                value="BUG"
                label="Bug"
              />
              <FormControlLabel
                control={<Radio size="small" color="info" />}
                value="SUGGESTION"
                label="Suggestion"
              />
              <FormControlLabel
                control={<Radio size="small" color="info" />}
                value="QUESTION"
                label="Question"
              />
              <FormControlLabel
                control={<Radio size="small" color="info" />}
                value="USER_ISSUE"
                label="User Issue"
              />
              {dev && (
                <FormControlLabel
                  control={<Radio size="small" color="info" />}
                  value="UPDATE"
                  label="Feature Update"
                />
              )}
              {dev && (
                <FormControlLabel
                  control={<Radio size="small" color="info" />}
                  value="MILESTONE"
                  label="Milestone"
                />
              )}
            </RadioGroup>
          </DigiDisplay>
        </FormControl>
        <FormControl color="info">
          <FormLabel>Feedback Intro</FormLabel>
          <DigiDisplay sx={{ gap: '1em', py: '.5em' }}>
            <TextField
              label="User Title"
              size="small"
              required
              color="info"
              inputProps={{ maxLength: 32 }}
            />
            <TextField
              label="Brief Intro"
              size="small"
              multiline
              required
              rows={2}
              color="info"
              inputProps={{ maxLength: 300 }}
            />
          </DigiDisplay>
        </FormControl>
      </DigiBox>
      <DigiBox></DigiBox>
    </GlassBox>
  );
};
