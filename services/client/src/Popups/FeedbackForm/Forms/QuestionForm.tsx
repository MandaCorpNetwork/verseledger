import { useSoundEffect } from '@Audio/AudioManager';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  type SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import type { IFeedbackFeatures } from 'vl-shared/src/schemas/FeedbackFeatureSchema';
import type {
  IFeedbackForm,
  IQuestionFeedback,
} from 'vl-shared/src/schemas/FeedbackFormSchema';
import type { IFeedbackTools } from 'vl-shared/src/schemas/FeedbackToolSchema';

import { FeatureSelect } from '../Fields/FeatureSelect';
import { ToolSelect } from '../Fields/ToolSelect';

export const QuestionForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const sound = useSoundEffect();
  const isQuestionForm = formData.type === 'QUESTION';

  const handleFeatureSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      const newFeature = e.target.value as IFeedbackFeatures;
      sound.playSound('clickMain');
      setFormData({ ...formData, feature: newFeature });
    },
    [setFormData, formData, sound],
  );

  const handleToolSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      const newTool = e.target.value as IFeedbackTools;
      sound.playSound('clickMain');
      setFormData({ ...formData, tool: newTool });
    },
    [setFormData, formData, sound],
  );

  const handleChange = React.useCallback(
    (field: keyof IQuestionFeedback) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isQuestionForm) {
        setFormData({ ...formData, [field]: e.target.value });
      }
    },
    [isQuestionForm, setFormData, formData],
  );

  const handlePublicToggle = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isQuestionForm) {
        setFormData({ ...formData, public: e.target.checked });
      }
    },
    [isQuestionForm, setFormData, formData],
  );

  if (formData.type !== 'QUESTION') return null;
  return (
    <FormControl
      data-testid="Feedback-Popup-Form-IssueBody__QuestionForm_FormControl"
      sx={{ height: '100%', gap: { xs: '.5em', md: '1em' } }}
    >
      <FormLabel>Question Feedback</FormLabel>
      <FeatureSelect
        required={true}
        onChange={handleFeatureSelect}
        value={formData.feature}
      />
      <ToolSelect required={false} onChange={handleToolSelect} value={formData.tool} />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-QuestionForm-Field__Question"
        required
        size="small"
        label="Suggested Behavior"
        color="info"
        multiline
        rows={3}
        value={formData.question}
        onChange={handleChange('question')}
      />
      <FormControlLabel
        data-testid="Feedback-Popup-Form-IssueBody-QuestionForm-Field__Public_Switch"
        control={
          <Switch
            size="small"
            color="info"
            checked={formData.public ?? false}
            onChange={handlePublicToggle}
          />
        }
        label="Public"
      />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-QuestionForm-Field__Notes"
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
