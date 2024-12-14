import VerseLedgerMask from '@Assets/Images/Logos/VerseLedgerMaskLogo.png?url';
import VerseOSGlow from '@Assets/Images/Logos/VerseOSGlowLogo.png?url';
import backgroundvideo from '@Assets/Videos/RedMicrotech.webm?url';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { ComponentDisplay } from '@Common/Components/Core/Boxes/ComponentDisplay';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Box } from '@mui/material';

import { ListSelectButton } from '../Common/Components/Core/Buttons/ListSelectButton';
import { Contracts, Scu, Scu3d } from './DefinitionsLegacy/CustomIcons';

export const SandboxContent: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '1em',
      }}
    >
      <Box sx={{ display: 'flex', gap: '1em', flexDirection: 'column' }}>
        <ListSelectButton>Pick Me</ListSelectButton>
        <FeatureDisplay>
          Potential Feature
          <ComponentContainer
            sx={{ m: '20px 50px', flexDirction: 'row', gap: '1em', p: '1em' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', width: '40px' }}>
              <Scu fontSize="large" />
              <Scu3d fontSize="large" />
              <Contracts fontSize="large" />
            </div>
            <ComponentDisplay sx={{ width: '100px', height: '40px' }} />
            <div>FOOBAR</div>
          </ComponentContainer>
        </FeatureDisplay>
        <Box>
          <Box
            sx={{
              width: '800px',
              height: '600px',
              position: 'relative',
              '&:before': {
                position: 'absolute',
                content: '""',
                backgroundImage: `url(${VerseOSGlow})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              },
            }}
          >
            <video
              autoPlay
              loop
              muted
              src={backgroundvideo}
              style={{
                width: '100%',
                height: '100%',
                maskImage: `url(${VerseLedgerMask})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskType: 'alpha',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
