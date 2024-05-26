import Feedback from '@Assets/media/Feedback.webm?url';
import { Discord } from '@Common/CustomIcons';
import { GitHub } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

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
    >
      {page == 0 ? (
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
              Sometimes things break. Sometimes there are oversights. Somtimes users know
              everything.
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
      <Box>
        <IconButton>
          <GitHub />
        </IconButton>
        <IconButton>
          <Discord />
        </IconButton>
      </Box>
    </VLPopup>
  );
};
