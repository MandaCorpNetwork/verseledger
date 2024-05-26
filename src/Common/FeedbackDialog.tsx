import { GitHub } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import Feedback from '../Assets/media/Feedback.webm?url';
import { Discord } from './CustomIcons';

type FeedbackDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose }) => {
  const [formView, setFormView] = React.useState(false);

  const handleOpenForm = () => {
    setFormView(true);
  };

  return (
    <Dialog open={open} sx={{ backdropFilter: 'blur(10px)' }}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        {!formView ? (
          <>
            <video src={Feedback} autoPlay muted loop width="500" />
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                zIndex: 10,
                top: '150px',
                width: '90%',
                justifyContent: 'center',
                flexDirection: 'column',
                left: '5%',
              }}
            >
              <Typography align="center" sx={{ fontWeight: 'bold' }}>
                Sometimes things break. Sometimes there are oversights. Somtimes users
                know everything.
              </Typography>
              <Typography align="center" sx={{ fontWeight: 'bold', mt: '.5em' }}>
                Please use this form to submit feedback for Verse Ledger.
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(8,29,68,.9)',
              p: '1em',
              borderTop: '3px solid',
              borderBottom: '3px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
            }}
          >
            <FormControl color="secondary">
              <FormLabel>Feedback Type</FormLabel>
              <RadioGroup defaultValue="suggestion" row>
                <FormControlLabel
                  control={<Radio size="small" color="secondary" />}
                  value="suggestion"
                  label="Suggestion"
                />
                <FormControlLabel
                  control={<Radio size="small" color="secondary" />}
                  value="bug"
                  label="Bug"
                />
                <FormControlLabel
                  control={<Radio size="small" color="secondary" />}
                  value="userIssue"
                  label="User Issue"
                />
                <FormControlLabel
                  control={<Radio size="small" color="secondary" />}
                  value="question"
                  label="Question"
                />
                <FormControlLabel
                  control={<Radio size="small" color="secondary" />}
                  value="other"
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <TextField color="secondary" label="Feedback Message" multiline />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <IconButton>
          <Discord />
        </IconButton>
        <IconButton sx={{ mr: 'auto' }}>
          <GitHub />
        </IconButton>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        {!formView ? (
          <Button color="secondary" onClick={handleOpenForm}>
            Next
          </Button>
        ) : (
          <Button color="secondary" onClick={handleOpenForm}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
