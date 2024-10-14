import { useSoundEffect } from '@Audio/AudioManager';
import { Add } from '@mui/icons-material';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ConcernSelect } from '@Popups/FeedbackForm/Fields/ConcernSelect';
import { FeatureSelect } from '@Popups/FeedbackForm/Fields/FeatureSelect';
import { NeedsPopover } from '@Popups/FeedbackForm/Fields/NeedsPopover';
import { ServiceSelect } from '@Popups/FeedbackForm/Fields/ServiceSelect';
import { TableSelect } from '@Popups/FeedbackForm/Fields/TableSelect';
import { ToolSelect } from '@Popups/FeedbackForm/Fields/ToolSelect';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IFeedbackConcern } from 'vl-shared/src/schemas/FeedbackConcernSchema';
import { IFeedbackFeatures } from 'vl-shared/src/schemas/FeedbackFeatureSchema';
import {
  IFeatureQueFeedback,
  IFeedbackForm,
  IFeedbackNeeds,
} from 'vl-shared/src/schemas/FeedbackFormSchema';
import { IFeedbackServices } from 'vl-shared/src/schemas/FeedbackServiceSchema';
import { IFeedbackTables } from 'vl-shared/src/schemas/FeedbackTableSchema';
import { IFeedbackTools } from 'vl-shared/src/schemas/FeedbackToolSchema';

export const FeatureQueForm: React.FC<{
  formData: Partial<IFeedbackForm> | IFeedbackForm;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IFeedbackForm>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const { playSound } = useSoundEffect();
  const isFeatureUpdateForm = formData.type === 'UPDATE';
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [popoverType, setPopoverType] = React.useState<string>('');

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

  const handleConcernSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      if (isFeatureUpdateForm) {
        const newConcern = e.target.value as IFeedbackConcern;
        playSound('clickMain');
        setFormData({ ...formData, concern: newConcern });
      }
    },
    [isFeatureUpdateForm, playSound, setFormData, formData],
  );

  const handleTableSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      if (isFeatureUpdateForm) {
        const newTable = e.target.value as IFeedbackTables;
        playSound('clickMain');
        setFormData({ ...formData, table: newTable });
      }
    },
    [isFeatureUpdateForm, playSound, setFormData, formData],
  );

  const handleServiceSelect = React.useCallback(
    (e: SelectChangeEvent<string>) => {
      if (isFeatureUpdateForm) {
        const newService = e.target.value as IFeedbackServices;
        playSound('clickMain');
        setFormData({ ...formData, service: newService });
      }
    },
    [isFeatureUpdateForm, playSound, setFormData, formData],
  );

  const handleChange = React.useCallback(
    (field: keyof IFeatureQueFeedback) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isFeatureUpdateForm) {
        setFormData({ ...formData, [field]: e.target.value });
      }
    },
    [isFeatureUpdateForm, setFormData, formData],
  );

  const handleAddNeedOpen = (type: string) => (e: React.MouseEvent<HTMLElement>) => {
    setPopoverType(type);
    setAnchorEl(e.currentTarget);
  };

  const handleCloseAddNeed = () => {
    setAnchorEl(null);
  };

  const handleAddNeed = React.useCallback(
    (field: string, title: string, description: string) => {
      if (isFeatureUpdateForm) {
        Logger.info('Adding need...');
        const needsKey =
          field === 'FrontEnd'
            ? 'frontNeeds'
            : field === 'BackEnd'
              ? 'backNeeds'
              : undefined;
        Logger.info('Needs Key:', needsKey);
        if (needsKey) {
          const existingNeeds: IFeedbackNeeds[] = Array.isArray(formData[needsKey])
            ? formData[needsKey]
            : [];
          Logger.info('Existing needs:', existingNeeds);
          const updatedNeeds = [...existingNeeds, { short: title, long: description }];
          Logger.info('Updated needs:', updatedNeeds);
          setFormData((prevFormData) => {
            Logger.info('Previous formData:', prevFormData);
            const newFormData = { ...prevFormData, [needsKey]: updatedNeeds };
            Logger.info('New formData:', newFormData);
            return newFormData;
          });
        }
      }
    },
    [formData, setFormData, isFeatureUpdateForm],
  );

  if (formData.type !== 'UPDATE') return null;
  return (
    <FormControl
      data-testid="Feedback-Popup-Form-IssueBody__FeatureUpdate_FormControl"
      sx={{ height: '100%', gap: { xs: '.5em', md: '1em' } }}
    >
      <FormLabel>Feature Update</FormLabel>
      <ConcernSelect onChange={handleConcernSelect} value={formData.concern} />
      <FeatureSelect
        required={false}
        onChange={handleFeatureSelect}
        value={formData.feature}
      />
      {!formData.feature && (
        <TextField
          data-testid="Feedback-Popup-Form-IssueBody-FeatureUpdate-Field__NewFeature"
          size="small"
          label="New Feature"
          color="info"
          value={formData.newFeature}
          onChange={handleChange('newFeature')}
        />
      )}
      <ToolSelect required={false} onChange={handleToolSelect} value={formData.tool} />
      {!formData.tool && (
        <TextField
          data-testid="Feedback-Popup-Form-IssueBody-FeatureUpdate-Field__NewTool"
          size="small"
          label="New Tool"
          color="info"
          value={formData.newTool}
          onChange={handleChange('newTool')}
        />
      )}
      <TableSelect onChange={handleTableSelect} value={formData.table} />
      {!formData.table && (
        <TextField
          data-testid="Feedback-Popup-Form-IssueBody-FeatureUpdate-Field__NewTable"
          size="small"
          label="New Table"
          color="info"
          value={formData.newTable}
          onChange={handleChange('newTable')}
        />
      )}
      <ServiceSelect onChange={handleServiceSelect} value={formData.service} />
      {!formData.service && (
        <TextField
          data-testid="Feedback-Popup-Form-IssueBody-FeatureUpdate-Field__NewService"
          size="small"
          label="New Service"
          color="info"
          value={formData.newService}
          onChange={handleChange('newService')}
        />
      )}
      <Divider />
      <Typography>
        FrontEnd Needs
        <IconButton onClick={handleAddNeedOpen('FrontEnd')}>
          <Add />
        </IconButton>
      </Typography>
      {formData.frontNeeds?.map((need, index) => (
        <Box key={index}>
          <Typography>{need.short}</Typography>
          <Typography>{need.long}</Typography>
        </Box>
      ))}
      <Divider />
      <Typography>
        BackEnd Needs
        <IconButton onClick={handleAddNeedOpen('BackEnd')}>
          <Add />
        </IconButton>
      </Typography>
      {formData.backNeeds?.map((need) => (
        <>
          <Typography>{need.short}</Typography>
          <Typography>{need.long}</Typography>
        </>
      ))}
      <NeedsPopover
        type={popoverType}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseAddNeed}
        onAdd={(title: string, description: string) =>
          handleAddNeed(popoverType, title, description)
        }
      />
      <TextField
        size="small"
        value={formData.notes}
        label="Notes"
        color="info"
        multiline
        rows={3}
        onChange={handleChange('notes')}
      />
      <TextField
        size="small"
        value={formData.linkedMilestone}
        label="Linked Milestone"
        color="info"
        onChange={handleChange('linkedMilestone')}
      />
    </FormControl>
  );
};
