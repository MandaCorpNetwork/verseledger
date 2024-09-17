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
  ISuggestionFeedback,
} from 'vl-shared/src/schemas/FeedbackFormSchema';
import { IFeedbackTools } from 'vl-shared/src/schemas/FeedbackToolSchema';

import { useSoundEffect } from '@/AudioManager';

import { FeatureSelect } from '../Fields/FeatureSelect';
import { ToolSelect } from '../Fields/ToolSelect';

export const SuggestionForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const { playSound } = useSoundEffect();
  const isSuggestionForm = formData.type === 'SUGGESTION';

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
    (field: keyof ISuggestionFeedback) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isSuggestionForm) {
        setFormData({ ...formData, [field]: e.target.value });
      }
    },
    [isSuggestionForm, setFormData, formData],
  );

  const handlePublicToggle = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isSuggestionForm) {
        setFormData({ ...formData, public: e.target.checked });
      }
    },
    [isSuggestionForm, setFormData, formData],
  );

  if (formData.type !== 'SUGGESTION') return null;
  return (
    <FormControl
      data-testid="Feedback-Popup-Form-IssueBody__SuggestionForm_FormControl"
      sx={{ height: '100%', gap: { xs: '.5em', md: '1em' } }}
    >
      <FormLabel>Suggestion Feedback</FormLabel>
      <FeatureSelect
        required={true}
        onChange={handleFeatureSelect}
        value={formData.feature}
      />
      <ToolSelect required={true} onChange={handleToolSelect} value={formData.tool} />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-SuggestionForm-Field__SuggestedBehavior"
        required
        size="small"
        label="Suggested Behavior"
        color="info"
        multiline
        rows={3}
        value={formData.suggestedBehavior}
        onChange={handleChange('suggestedBehavior')}
      />
      <FormControlLabel
        data-testid="Feedback-Popup-Form-IssueBody-SuggestionForm-Field__Public_Switch"
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
        data-testid="Feedback-Popup-Form-IssueBody-SuggestionForm-Field__Notes"
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
