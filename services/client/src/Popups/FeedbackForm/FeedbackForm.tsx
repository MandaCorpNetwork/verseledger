import { useSoundEffect } from '@Audio/AudioManager';
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

import { BugForm } from './Forms/BugForm';
import { FeatureQueForm } from './Forms/FeatureQueForm';
import { QuestionForm } from './Forms/QuestionForm';
import { SuggestionForm } from './Forms/SuggestionForm';
import { UserIssueForm } from './Forms/UserIssueForm';

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
  const sound = useSoundEffect();
  const { formData, setFormData } = props;

  const handleTypeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newType = event.target.value as FeedbackType;
      sound.playSound('clickMain');
      setFormData({ type: newType });
    },
    [sound, setFormData],
  );

  const renderForm = React.useCallback(() => {
    switch (formData.type) {
      case 'BUG':
        return <BugForm formData={formData} setFormData={setFormData} />;
      case 'SUGGESTION':
        return <SuggestionForm formData={formData} setFormData={setFormData} />;
      case 'QUESTION':
        return <QuestionForm formData={formData} setFormData={setFormData} />;
      case 'USER_ISSUE':
        return <UserIssueForm formData={formData} setFormData={setFormData} />;
      case 'UPDATE':
        return <FeatureQueForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  }, [formData, setFormData]);
  return (
    <GlassBox
      data-testid="Feedback-Popup__Form_Container"
      sx={{
        p: '.5em',
        maxHeight: '100%',
        overflow: 'auto',
        gap: '1em',
      }}
    >
      <DigiBox
        data-testid="Feedback-Popup-Form__IssueType_Wrapper"
        sx={{ p: { xs: '.5em', md: '1em' }, maxHeight: '100%' }}
      >
        <FormControl
          data-testid="Feedback-Popup-Form-IssueType__FormControl"
          color="info"
          sx={{ mb: '.5em' }}
        >
          <FormLabel data-testid="Feedback-Popup-Form-IssueType__FormLabel">
            Feedback Type
          </FormLabel>
          <DigiDisplay data-testid="Feedback-Popup-Form-IssueType__RadioGroup_Wrapper">
            <RadioGroup
              data-testid="Feedback-Popup-Form-IssueType__RadioGroup"
              value={formData.type ?? null}
              onChange={handleTypeChange}
            >
              <FormControlLabel
                data-testid="Feedback-Popup-Form-IssueType__Radio_BUG"
                control={<Radio size="small" color="info" />}
                value="BUG"
                label="Bug"
              />
              <FormControlLabel
                data-testid="Feedback-Popup-Form-IssueType__Radio_SUGGESTION"
                control={<Radio size="small" color="info" />}
                value="SUGGESTION"
                label="Suggestion"
              />
              <FormControlLabel
                data-testid="Feedback-Popup-Form-IssueType__Radio_QUESTION"
                control={<Radio size="small" color="info" />}
                value="QUESTION"
                label="Question"
              />
              <FormControlLabel
                data-testid="Feedback-Popup-Form-IssueType__Radio_USER-ISSUE"
                control={<Radio size="small" color="info" />}
                value="USER_ISSUE"
                label="User Issue"
              />
              {dev && (
                <FormControlLabel
                  data-testid="Feedback-Popup-Form-IssueType__Radio_UPDATE"
                  control={<Radio size="small" color="info" />}
                  value="UPDATE"
                  label="Feature Update"
                />
              )}
              {dev && (
                <FormControlLabel
                  data-testid="Feedback-Popup-Form-IssueType__Radio_MILESTONE"
                  control={<Radio size="small" color="info" />}
                  value="MILESTONE"
                  label="Milestone"
                />
              )}
            </RadioGroup>
          </DigiDisplay>
        </FormControl>
        <FormControl
          color="info"
          data-testid="Feedback-Popup-Form__IssueIntro_FormControl"
        >
          <FormLabel data-testid="Feedback-Popup-Form-IssueIntro__FormLabel">
            Feedback Intro
          </FormLabel>
          <DigiDisplay
            data-testid="Feedback-Popup-Form-IssueIntro__Field_Wrapper"
            sx={{ gap: '1.5em', py: '1em' }}
          >
            <TextField
              data-testid="Feedback-Popup-Form-IssueIntro-Field__UserTitle"
              label="User Title"
              size="small"
              required
              color={formData.userTitle?.length === 32 ? 'error' : 'info'}
              inputProps={{ maxLength: 32 }}
              onChange={(e) => {
                setFormData({ ...formData, userTitle: e.currentTarget.value });
                if (e.currentTarget.value.length === 32) {
                  sound.playSound('warning');
                }
              }}
              value={formData.userTitle ?? ''}
              helperText={
                formData.userTitle?.length == 32 ? 'Character Limit Reached' : ''
              }
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                },
              }}
            />
            <TextField
              data-testid="Feedback-Popup-Form-IssueIntro-Field__Brief"
              label="Brief Intro"
              size="small"
              multiline
              required
              rows={2}
              color={formData.userTitle?.length === 300 ? 'error' : 'info'}
              inputProps={{ maxLength: 300 }}
              onChange={(e) => {
                setFormData({ ...formData, brief: e.currentTarget.value });
                if (e.currentTarget.value.length === 300) {
                  sound.playSound('warning');
                }
              }}
              value={formData.brief ?? ''}
              helperText={formData.brief?.length == 300 ? 'Character Limit Reached' : ''}
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                },
              }}
            />
          </DigiDisplay>
        </FormControl>
      </DigiBox>
      <DigiBox
        data-testid="Feedback-Popup-Form__IssueBody_Wrapper"
        sx={{ p: { xs: '.5em', md: '1em' } }}
      >
        {renderForm()}
      </DigiBox>
    </GlassBox>
  );
};
