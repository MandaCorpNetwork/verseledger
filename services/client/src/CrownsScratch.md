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

type VLFeature =
  | 'APPLICATION'
  | 'CONTRACT_LEDGER'
  | 'PERSONAL_LEDGER'
  | 'VERSE_NEWS'
  | 'VERSE_MARKET'
  | 'ORG_LEDGER'
  | 'POPUPS'
  | 'WIDGETS'
  | 'USER_SETTINGS'
  | 'APP_BAR';

type VLTool =
  | 'CONTRACT_BROWSER'
  | 'FILTERS'
  | 'CONTRACT_DISPLAY'
  | 'RADIO_STATIONS'
  | 'NOTIFICATIONS'
  | 'LOCATION_EXPLORER'
  | 'CONTRACT_MANAGER'
  | 'PLAYER_CARD'
  | 'NAV_BUTTONS'
  | 'CONTRACT_BIDS'
  | 'CREATE_CONTRACT'
  | 'OTHER';

type UserBrowser = 'CHROME' | 'FIREFOX' | 'SAFARI' | 'EDGE' | 'OPERA';

type IBugReport = {
  issueType: 'BUG';
  userTitle: string;
  shortDescription: string;
  feature: VLFeature;
  tool: VLTool;
  browser: UserBrowser;
  observedBehavior: string;
  expectedBehavior: string;
  suggestedBehavior: string;
  logs: string;
  attachments: string;
  notes: string;
};

type ISuggestionForm = {
  issueType: 'SUGGESTION';
};

type IUserIssueForm = {
  issueType: 'USER_ISSUE';
};

type IQuestionForm = {
  issueType: 'QUESTION';
};

type IFeatureQueForm = {
  issueType: 'FEATURE_QUE';
};

type IMilestoneForm = {
  issueType: 'MILESTONE';
};

type IGeneralFeedbackForm = {
  issueType: 'OTHER';
};

type IFeedbackIssueType =
  | 'BUG'
  | 'SUGGESTION'
  | 'USER_ISSUE'
  | 'QUESTION'
  | 'FEATURE_QUE'
  | 'MILESTONE'
  | 'OTHER';

type IFeedback =
  | Partial<IBugReport>
  | Partial<ISuggestionForm>
  | Partial<IUserIssueForm>
  | Partial<IQuestionForm>
  | Partial<IFeatureQueForm>
  | Partial<IMilestoneForm>
  | Partial<IGeneralFeedbackForm>;
