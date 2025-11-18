import { type SvgIconComponent } from '@mui/icons-material';

export const VerseLedgerVersion = '0.6.0';

  /**
   * Severity Range:
   * 0. No Current Issues
   * 1. Testing For Feedback
   * 2. Low Impact UI Bugs
   * 3. Missing Logic - Minor Impact (Small QOL Features Planned Remain)
   * 4.  Logic Bug - Minor Impact (Work around exist | Doesn't Impede Tool Usage or Functionality)
   * 5. Missing Logic - Major Impact (Missing Planned Functionality Preventing Full Use of the Tool [Some uses available])
   * 6. Logic Bug - Major Impact (Bug Prevents Usage of the Tool | Portions of the Tool are Still usable)
   * 7. Bug - Critical Impact (Bug that Breaks the the Tool & Might impact Other features)
   * 8. Missing Logic - Critical Impact (Most of the Logic Missing Preventing Usage of the Tool)
   * 9. Planning (Tool still in the Planning/Whiteboard Stages And has Zero Usage)
   * 10. Placeholder (A planned Feature with a placeholder page)
   */
export type SeverityCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type AppCategory = 'core' | 'org' | 'tool' | 'personal' | 'contract' | 'market';

export type AppListing = {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
  disabled?: boolean;
  versionLabel: string;
  version: string;
  severityCode: SeverityCode;
  category: AppCategory[];
};

export type AppGroup = {
  id: string;
  label: string;
  category: string;
  list: string[];
};
