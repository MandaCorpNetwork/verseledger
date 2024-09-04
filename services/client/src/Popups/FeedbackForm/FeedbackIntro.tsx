import Feedback from '@Assets/media/Feedback.webm?url';
import { Box, Typography } from '@mui/material';

export const FeedbackIntro: React.FC = () => {
  return (
    <Box
      data-testid="Feedback-Popup__Intro_Wrapper"
      sx={{
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%',
        height: '500px',
        boxShadow:
          '0 1px 2px rgba(255,141,15,.4), 0 2px 4px rgba(255,141,15,.3), 0 4px 8px rgba(255,141,15,.2), 0 8px 16px rgba(255,141,15,.1), 0 16px 32px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
      }}
    >
      <Box
        data-testid="Feedback-Popup__Intro_Video"
        component="video"
        src={Feedback}
        autoPlay
        muted
        loop
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <Box
        data-testid="Feedback-Popup__Text_Wrapper"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          p: '1em',
        }}
      >
        <Typography
          align="center"
          sx={{
            fontWeight: 'bold',
            color: 'info.main',
            textShadow: '0 0 10px #000',
            background:
              'linear-gradient(135deg, rgba(255,141,15,.5) 30%, rgba(0,0,0,.5) 60%)',
            boxShadow:
              '0 3px 10px rgba(0,0,0,.3), 0 6px 12px rgba(0,0,0,.3), inset 0 1px 2px rgba(14,35,141,.3), inset 0 -1px 2px rgba(0,0,0,0.1)',
            borderRadius: '20px',
            px: '.5em',
          }}
        >
          Sometimes things break. Sometimes there are oversights. Somtimes users know
          everything.
        </Typography>
        <Typography
          align="center"
          sx={{
            my: '2em',
            fontWeight: 'bold',
            color: 'info.main',
            textShadow: '0 0 10px #000',
            background:
              'linear-gradient(135deg, rgba(255,141,15,.5) 30%, rgba(0,0,0,.5) 60%)',
            boxShadow:
              '0 3px 10px rgba(0,0,0,.3), 0 6px 12px rgba(0,0,0,.3), inset 0 1px 2px rgba(14,35,141,.3), inset 0 -1px 2px rgba(0,0,0,0.1)',
            borderRadius: '20px',
            px: '.5em',
          }}
        >
          Please use this form to submit feedback for Verse Ledger.
        </Typography>
      </Box>
    </Box>
  );
};
