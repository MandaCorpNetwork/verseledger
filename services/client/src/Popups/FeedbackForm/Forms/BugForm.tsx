import { useSoundEffect } from '@Audio/AudioManager';
import { FormControl, FormLabel, type SelectChangeEvent, TextField } from '@mui/material';
import { BrowserSelect } from '@Popups/FeedbackForm/Fields/BrowserSelect';
import { FeatureSelect } from '@Popups/FeedbackForm/Fields/FeatureSelect';
import { ToolSelect } from '@Popups/FeedbackForm/Fields/ToolSelect';
import React from 'react';
import type { IBrowser } from 'vl-shared/src/schemas/FeedbackBrowserSchema';
import type { IFeedbackFeatures } from 'vl-shared/src/schemas/FeedbackFeatureSchema';
import type {
  IBugFeedback,
  IFeedbackForm,
} from 'vl-shared/src/schemas/FeedbackFormSchema';
import type { IFeedbackTools } from 'vl-shared/src/schemas/FeedbackToolSchema';

export const BugForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const sound = useSoundEffect();
  const isBugForm = formData.type === 'BUG';

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

  const handleBrowserSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      if (isBugForm) {
        const newBrowser = e.target.value as IBrowser;
        sound.playSound('clickMain');
        setFormData({ ...formData, browser: newBrowser });
      }
    },
    [isBugForm, sound, setFormData, formData],
  );

  const handleChange = React.useCallback(
    (field: keyof IBugFeedback) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isBugForm) {
        setFormData({ ...formData, [field]: e.target.value });
      }
    },
    [isBugForm, setFormData, formData],
  );

  if (formData.type !== 'BUG') return null;
  return (
    <FormControl
      data-testid="Feedback-Popup-Form-IssueBody__BugForm_FormControl"
      sx={{ height: '100%', gap: { xs: '.5em', md: '1em' } }}
    >
      <FormLabel data-testid="Feedback-Popup-Form-IssueBody-BugForm_FormLabel">
        Bug Feedback
      </FormLabel>
      <FeatureSelect
        required={true}
        onChange={handleFeatureSelect}
        value={formData.feature}
      />
      <ToolSelect required={true} onChange={handleToolSelect} value={formData.tool} />
      <BrowserSelect onChange={handleBrowserSelect} value={formData.browser} />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-BugForm-Field__ObservedBehavior"
        required
        size="small"
        label="Observed Behavior"
        color="info"
        multiline
        rows={3}
        value={formData.observedBehavior}
        onChange={handleChange('observedBehavior')}
      />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-BugForm-Field__ExpectedBehavior"
        size="small"
        label="Expected Behavior"
        color="info"
        multiline
        rows={3}
        value={formData.expectedBehavior}
        onChange={handleChange('expectedBehavior')}
      />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-BugForm-Field__SuggestedBehavior"
        size="small"
        label="Suggested Behavior"
        color="info"
        multiline
        rows={3}
        value={formData.suggestedBehavior}
        onChange={handleChange('suggestedBehavior')}
      />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-BugForm-Field__Logs"
        size="small"
        label="Logs"
        color="info"
        multiline
        rows={3}
        value={formData.logs}
        onChange={handleChange('logs')}
      />
      <TextField
        data-testid="Feedback-Popup-Form-IssueBody-BugForm-Field__Notes"
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
