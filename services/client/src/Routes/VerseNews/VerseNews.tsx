import { InDevOverlay } from '@CommonLegacy/Components/App/InDevOverlay';
import { VLViewport } from '@Common/Components/Core/Boxes/VLViewport';
import { Typography } from '@mui/material';
import { isDev } from '@Utils/isDev';

export const VerseNewsPage: React.FC = () => {
  const dev = isDev();
  return (
    <VLViewport data-testid="VerseNews__PageContainer" sx={{ position: 'relative' }}>
      <Typography variant="h4" align="center" sx={{ mt: '2em' }}>
        Verse News Page
      </Typography>
      {!dev && <InDevOverlay supportButton={true} />}
    </VLViewport>
  );
};
