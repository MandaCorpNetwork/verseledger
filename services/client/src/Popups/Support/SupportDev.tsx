import construction from '@Assets/media/Construction.webm';
import PallyLogo from '@Assets/media/MenuPage/PallyLogo.png?url';
import { Discord, KoFi, Patreon } from '@CommonLegacy/Definitions/CustomIcons';
import { Box, IconButton, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';

export const POPUP_SUPPORT_DEVELOPMENT = 'supportDev';

export const SupportDevPopup: React.FC = () => {
  return (
    <VLPopup
      data-testid="SupportDevelopment__Popup"
      name={POPUP_SUPPORT_DEVELOPMENT}
      title="Support Verse Ledger"
      sx={{ alignItems: 'center' }}
    >
      <Typography
        align="center"
        sx={{ fontWeight: 'bold', textShadow: '0 2px 4px rgb(0,0,0)', mb: '1em' }}
      >
        Some Features Under Development.
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '320px',
          height: '180px',
          overflow: 'hidden',
          boderRadius: '8px',
          mb: '1em',
        }}
      >
        <video
          src={construction}
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: '.8',
          }}
        />
        <Typography
          sx={{
            position: 'absolute',
            top: '25%',
            textAlign: 'center',
            textShadow: '0 3px 8px rgb(0,0,0)',
            fontWeight: 'bold',
            color: 'warning.main',
          }}
        >{`If you're looking to support the project, you can visit us on our Discord or use the links below.`}</Typography>
      </Box>
      <Box
        sx={{
          borderRadius: '20px',
          px: '.5em',
          display: 'flex',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(14,35,141), rgba(8,22,80))',
          boxShadow: '0 5px 10px rgba(0,0,0), inset 0 2px 3px rgba(33,150,243,.2)',
          border: '1px solid rgba(24,252,252,.2)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,.5), inset 0 3px 5px rgba(33,150,243,.4)',
            background: 'linear-gradient(135deg, rgba(8,22,80), rgba(0,1,19))',
          },
        }}
      >
        <IconButton
          component="a"
          href="https://ko-fi.com/verseledger"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            transition: '0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        >
          <KoFi />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.patreon.com/otterlodgestudios"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            transition: '0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        >
          <Patreon />
        </IconButton>
        <IconButton
          component="a"
          href="https://pally.gg/p/verseledger"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            transition: '0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        >
          <img
            src={PallyLogo}
            alt="Pally Logo"
            style={{ width: '28px', height: 'auto' }}
          />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.discord.gg/pVEK5rZ9WW"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            transition: '0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        >
          <Discord />
        </IconButton>
      </Box>
    </VLPopup>
  );
};
