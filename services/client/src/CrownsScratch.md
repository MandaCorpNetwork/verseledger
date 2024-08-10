# Feedback Forms

# Work on Location Popup

# Fix the Widget popping in outside of Viewport

# Connect Radio to new sound system

# Contract Manager
  * Hook up the Filter
  * Restyle Filters
  * Add Bids & Owned Drop Down Sections to History Tab
  * Add Full Mobile Conversion to Contract Manager
  * Update Display Style & Component Usage

# Mobile Fixes
  ## Settings Page
    * Switch To a Tab Bar

# Copied URL does not show as valid location until using the back button

# Sortby for Contracts

import PallyLogo from '@Assets/media/MenuPage/PallyLogo.png?url';
import { Discord, KoFi, Patreon } from '@Common/Definitions/CustomIcons';
import { GitHub } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { FeedbackPage } from './pages/feedbackPage';
import { FormPage } from './pages/formPage';

export const POPUP_FEEDBACK = 'feedback';

export const FeedbackPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);

  const onSubmit = React.useCallback(() => {
    if (page >= 1) dispatch(closePopup(POPUP_FEEDBACK));
    setPage(page + 1);
  }, [page]);

  return (
    <VLPopup
      name={POPUP_FEEDBACK}
      title="Feedback"
      onSubmit={onSubmit}
      submitText={page == 0 ? 'Next' : 'Submit'}
      state={page}
    >
      {page === 0 && <FeedbackPage />}
      {page === 1 && <FormPage />}
      <Box sx={{ display: 'flex' }}>
        <IconButton
          component="a"
          href="https://github.com/MandaCorpNetwork"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.discord.gg/kf47Tw3P"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Discord />
        </IconButton>
        <Box sx={{ ml: 'auto' }}>
          <IconButton
            component="a"
            href="https://ko-fi.com/verseledger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <KoFi />
          </IconButton>
          <IconButton
            component="a"
            href="https://pally.gg/p/verseledger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={PallyLogo}
              alt="Pally Logo"
              style={{ width: '25px', height: 'auto' }}
            />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.patreon.com/otterlodgestudios"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Patreon />
          </IconButton>
        </Box>
      </Box>
    </VLPopup>
  );
};


import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Logger } from '@Utils/Logger';
import React from 'react';

import { BugForm } from '../forms/BugForm';
import { SuggestionForm } from '../forms/SuggestionForm';
import { UserIssueForm } from '../forms/UserIssueForm';

type FormDataMap = {
  BUG: IBugReport;
  SUGGESTION: ISuggestionForm;
  USER_ISSUE: IUserIssueForm;
  QUESTION: IQuestionForm;
  FEATURE_QUE: IFeatureQueForm;
  MILESTONE: IMilestoneForm;
  OTHER: IGeneralFeedbackForm;
};

const currentFormType = React.useCallback(
  <T extends IFeedback>(
    formData: IFeedback | null,
    type: T['issueType'],
  ): formData is T => {
    return formData?.issueType === type;
  },
  [],
);

export const FormPage: React.FC = () => {
  const isAdmin = true;
  const [issueType, setIssueType] = React.useState<IFeedbackIssueType | null>(null);
  const [formData, setFormData] = React.useState<IFeedback | null>(null);

  const handleIssueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setIssueType(value as IFeedbackIssueType);
      switch (value) {
        case 'SUGGESTION':
          setFormData({} as ISuggestionForm);
          break;
        case 'BUG':
          setFormData({} as IBugReport);
          break;
        case 'USER_ISSUE':
          setFormData({} as IUserIssueForm);
          break;
        case 'QUESTION':
          setFormData({} as IQuestionForm);
          break;
        case 'FEATURE_QUE':
          setFormData({} as IFeatureQueForm);
          break;
        case 'MILESTONE':
          setFormData({} as IMilestoneForm);
          break;
        case 'OTHER':
          setFormData({} as IGeneralFeedbackForm);
          break;
        default:
          setFormData(null);
      }
    },
    [issueType, setFormData],
  );

  const renderForm = React.useMemo(() => {
    switch (issueType) {
      case 'SUGGESTION':
        return <SuggestionForm />;
      case 'BUG':
        return (
          <BugForm
            formData={formData as IBugReport}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<IBugReport>>}
          />
        );
      case 'USER_ISSUE':
        return <UserIssueForm />;
      case 'QUESTION':
        return <UserIssueForm />;
      case 'FEATURE_QUE':
        return <UserIssueForm />;
      case 'MILESTONE':
        return <UserIssueForm />;
      case 'OTHER':
        return <UserIssueForm />;
      default:
        return;
    }
  }, [issueType]);

  const isSubmitEnabled = React.useMemo(() => {
    Logger.info(formData);
    switch (issueType) {
      default:
      case 'SUGGESTION':
        return true;
      case 'BUG':
        return (
          formData.userTitle.trim() != '' &&
          formData.shortDescription.trim() != '' &&
          formData.feature != null &&
          formData.tool != null &&
          formData.browser != null
        );
    }
  }, [formData, issueType]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '1em',
      }}
    >
      <FormControl color="secondary">
        <FormLabel>Feedback Type</FormLabel>
        <RadioGroup value={issueType} onChange={handleIssueChange} row>
          <FormControlLabel
            control={<Radio size="small" color="secondary" />}
            value="SUGGESTION"
            label="Suggestion"
          />
          <FormControlLabel
            control={<Radio size="small" color="secondary" />}
            value="BUG"
            label="Bug"
          />
          <FormControlLabel
            control={<Radio size="small" color="secondary" />}
            value="USER_ISSUE"
            label="User Issue"
          />
          <FormControlLabel
            control={<Radio size="small" color="secondary" />}
            value="QUESTION"
            label="Question"
          />
          {isAdmin && (
            <FormControlLabel
              control={<Radio size="small" color="secondary" />}
              value="FEATURE_QUE"
              label="Feature Plan"
            />
          )}
          {isAdmin && (
            <FormControlLabel
              control={<Radio size="small" color="secondary" />}
              value="MILESTONE"
              label="Milestone Plan"
            />
          )}
          <FormControlLabel
            control={<Radio size="small" color="secondary" />}
            value="OTHER"
            label="Other"
          />
        </RadioGroup>
      </FormControl>
      <Box data-testid="Feedback__Form-Container">{renderForm}</Box>
    </Box>
  );
};

import Feedback from '@Assets/media/Feedback.webm?url';
import { Box, Typography } from '@mui/material';

export const FeedbackPage: React.FC = () => {
  return (
    <Box>
      <video src={Feedback} autoPlay muted loop width="500" />
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          zIndex: 10,
          top: '200px',
          width: '88%',
          justifyContent: 'center',
          flexDirection: 'column',
          left: '5%',
        }}
      >
        <Typography
          align="center"
          sx={{ fontWeight: 'bold', color: 'info.main', textShadow: '0 0 10px #000' }}
        >
          Sometimes things break. Sometimes there are oversights. Sometimes users know
          best.
        </Typography>
        <Typography
          align="center"
          sx={{
            fontWeight: 'bold',
            mt: '.5em',
            color: 'info.main',
            textShadow: '0 0 10px #000',
          }}
        >
          Please use this form to submit feedback for Verse Ledger.
        </Typography>
      </Box>
    </Box>
  );
};


import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';

import { activeFeatureOptions } from './FeatureOptions';
import {
  applicationTools,
  contractLedgerTools,
  popupTools,
  widgetTools,
} from './ToolOptions';

export const BugForm: React.FC<{
  formData: IBugReport;
  setFormData: React.Dispatch<React.SetStateAction<IBugReport>>;
}> = (props) => {
  const { formData, setFormData } = props;

  const toolOptionSelection = React.useCallback(() => {
    switch (formData.feature) {
      case 'APPLICATION':
        return applicationTools;
      case 'WIDGETS':
        return widgetTools;
      case 'POPUPS':
        return popupTools;
      case 'CONTRACT_LEDGER':
        return contractLedgerTools;
      case 'PERSONAL_LEDGER':
        return contractLedgerTools;
      default:
        return [];
    }
  }, [formData.feature]);

  return (
    <FormControl>
      <Box>
        <FormLabel>Bug Report Form</FormLabel>
        <TextField size="small" label="Issue Title" />
        <TextField size="small" label="Short Description" multiline rows={2} />
        <Box>
          <FormControl>
            <InputLabel>Feature</InputLabel>
            <Select
              label="Feature"
              size="small"
              value={formData.feature}
              autoWidth
              onChange={(e) =>
                setFormData({ ...formData, feature: e.target.value as VLFeature })
              }
            >
              {activeFeatureOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Tool</InputLabel>
            <Select label="Tool" size="small" autoWidth>
              {toolOptionSelection().map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </FormControl>
  );
};

/*
Issue Title
Short Description
Feature
Tool
Browser
Observed Behavior
Expected Behavior
Suggested Behavior
Logs
Attachments
Notes
*/

export const applicationTools = [
  { label: 'Nav Buttons', value: 'NAV_BUTTONS' },
  { label: 'Other', value: 'OTHER' },
];

export const widgetTools = [
  { label: 'Radio', value: 'RADIO_STATIONS' },
  { label: 'Other', value: 'OTHER' },
];

export const popupTools = [
  { label: 'Player Card', value: 'PLAYER_CARD' },
  { label: 'Locations', value: 'LOCATION_EXPLORER' },
  { label: 'Contract Bid', value: 'CONTRACT_BIDS' },
  { label: 'Create Contract', value: 'CREATE_CONTRACT' },
  { label: 'Other', value: 'OTHER' },
];

export const contractLedgerTools = [
  { label: 'Contract Browser', value: 'CONTRACT_BROWSER' },
  { label: 'Contract Filters', value: 'FILTERS' },
  { label: 'Contract Display', value: 'CONTRACT_DISPLAY' },
  { label: 'Contract Bids', value: 'CONTRACT_BIDS' },
  { label: 'Other', value: 'OTHER' },
];

export const personalLedgerTools = [
  { label: 'Radio Stations', value: 'RADIO_STATIONS' },
  { label: 'Notifications', value: 'NOTIFICATIONS' },
  { label: 'Location Explorer', value: 'LOCATION_EXPLORER' },
  { label: 'Contract Manager', value: 'CONTRACT_MANAGER' },
  { label: 'Contract Bids', value: 'CONTRACT_BIDS' },
  { label: 'Other', value: 'OTHER' },
];

export const activeFeatureOptions = [
  { label: 'Application', value: 'APPLICATION' },
  { label: 'Widgets', value: 'WIDGETS' },
  { label: 'Popups', value: 'POPUPS' },
  { label: 'Contract Ledger', value: 'CONTRACT_LEDGER' },
  { label: 'Personal Ledger', value: 'PERSONAL_LEDGER' },
];
