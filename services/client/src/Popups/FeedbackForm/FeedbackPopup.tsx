import PallyLogo from '@Assets/media/MenuPage/PallyLogo.png?url';
import { Discord, KoFi, Patreon } from '@Common/Definitions/CustomIcons';
import { GitHub } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { FeedbackIntro } from './FeedbackIntro';

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
      minWidth="380px"
      minHeight="500px"
    >
      {page === 0 && <FeedbackIntro />}
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
