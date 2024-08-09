import { FormControl, FormLabel, SelectChangeEvent, TextField } from '@mui/material';
import React from 'react';
import { IBrowser } from 'vl-shared/src/schemas/FeedbackBrowserSchema';
import { IFeedbackFeatures } from 'vl-shared/src/schemas/FeedbackFeatureSchema';
import { IBugFeedback, IFeedbackForm } from 'vl-shared/src/schemas/FeedbackFormSchema';
import { IFeedbackTools } from 'vl-shared/src/schemas/FeedbackToolSchema';

import { useSoundEffect } from '@/AudioManager';

import { BrowserSelect } from '../Fields/BrowserSelect';
import { FeatureSelect } from '../Fields/FeatureSelect';
import { ToolSelect } from '../Fields/ToolSelect';

export const BugForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const { playSound } = useSoundEffect();
  const isBugForm = formData.type === 'BUG';

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

  const handleBrowserSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      if (isBugForm) {
        const newBrowser = e.target.value as IBrowser;
        playSound('clickMain');
        setFormData({ ...formData, browser: newBrowser });
      }
    },
    [setFormData, formData, playSound],
  );

  const handleChange = React.useCallback(
    (field: keyof IBugFeedback) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isBugForm) {
        setFormData({ ...formData, [field]: e.target.value });
      }
    },
    [setFormData, formData],
  );

  if (formData.type !== 'BUG') return null;
  return (
    <FormControl sx={{ height: '100%' }}>
      <FormLabel>Bug Feedback</FormLabel>
      <FeatureSelect
        required={true}
        onChange={handleFeatureSelect}
        value={formData.feature}
      />
      <ToolSelect required={true} onChange={handleToolSelect} value={formData.tool} />
      <BrowserSelect onChange={handleBrowserSelect} value={formData.browser} />
      <TextField
        required
        size="small"
        label="Observed Behavior"
        color="info"
        multiline
        value={formData.observedBehavior}
        onChange={handleChange('observedBehavior')}
      />
      <TextField
        size="small"
        label="Expected Behavior"
        color="info"
        multiline
        value={formData.expectedBehavior}
        onChange={handleChange('expectedBehavior')}
      />
      <TextField
        size="small"
        label="Suggested Behavior"
        color="info"
        multiline
        value={formData.suggestedBehavior}
        onChange={handleChange('suggestedBehavior')}
      />
      <TextField
        size="small"
        label="Logs"
        color="info"
        multiline
        value={formData.logs}
        onChange={handleChange('logs')}
      />
      <TextField
        size="small"
        label="Notes"
        color="info"
        multiline
        value={formData.notes}
        onChange={handleChange('notes')}
      />
    </FormControl>
  );
};
