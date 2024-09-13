import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

type BugReportProps = {
  bugForm: object;
};

export const BugReport: React.FC = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Title</Typography>
        <Typography>Submitter</Typography>
        <Typography>Created Date</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Status</Typography>
        <Typography>Title</Typography>
        <Typography>Submitter</Typography>
        <Typography>Brief</Typography>
        <Typography>Feature</Typography>
        <Typography>Tool</Typography>
        <Typography>Observed Behavior</Typography>
        <Typography>Expected Behavior</Typography>
        <Typography>Suggested Behavior</Typography>
        <Typography>Logs</Typography>
        <Typography>Notes</Typography>
        <Typography>Markdown</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
