import {
  FormControl,
  FormControlLabel,
  FormLabel,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { IFeedbackFeatures } from 'vl-shared/src/schemas/FeedbackFeatureSchema';
import {
  IFeedbackForm,
  IUserIssueFeedback,
} from 'vl-shared/src/schemas/FeedbackFormSchema';
import { IFeedbackTools } from 'vl-shared/src/schemas/FeedbackToolSchema';

import { useSoundEffect } from '@/AudioManager';

import { FeatureSelect } from '../Fields/FeatureSelect';
import { ToolSelect } from '../Fields/ToolSelect';

export const QuestionForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const { playSound } = useSoundEffect();
  const isUserIssueForm = formData.type === 'USER_ISSUE';

  const handleFeatureSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      const newFeature = e.target.value as IFeedbackFeatures;
      playSound('clickMain');
      setFormData({ ...formData, feature: newFeature });
    },
    [setFormData, formData, playSound],
  );

  const handleToolSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      const newTool = e.target.value as IFeedbackTools;
      playSound('clickMain');
      setFormData({ ...formData, tool: newTool });
    },
    [setFormData, formData, playSound],
  );

  const handleChange = React.useCallback(
    (field: keyof IUserIssueFeedback) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isUserIssueForm) {
        setFormData({ ...formData, [field]: e.target.value });
      }
    },
    [setFormData, formData],
  );

  if (formData.type !== 'USER_ISSUE') return null;
  return (
    <FormControl
      data-testid="Feedback-Popup-Form-IssueBody__UserIssueForm_FormControl"
      sx={{ height: '100%', gap: { xs: '.5em', md: '1em' } }}
    >
      <FormLabel>Question Feedback</FormLabel>
      <FeatureSelect
        required={false}
        onChange={handleFeatureSelect}
        value={formData.feature}
      />
      <ToolSelect required={false} onChange={handleToolSelect} value={formData.tool} />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-UserIssueForm-Field__Report"
        required
        size="small"
        label="Suggested Behavior"
        color="info"
        multiline
        rows={3}
        value={formData.report}
        onChange={handleChange('report')}
      />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-UserIssueForm-Field__Notes"
        required
        size="small"
        label="Notes"
        color="info"
        multiline
        rows={3}
        value={formData.notes}
        onChange={handleChange('notes')}
      />
    </FormControl>
  );
};
