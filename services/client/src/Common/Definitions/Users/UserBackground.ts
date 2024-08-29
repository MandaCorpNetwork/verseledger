import DuskPioneer from '@Assets/media/VLSandboxPic.jpg?url';

import BackdropLogo from '@/Assets/media/VerseLogos/LogoBackdrop.png?url';

type UserBackground = {
  value: string;
  image: string;
  waterMark: string;
  label: string;
};

export const userBackgroundOptions: UserBackground[] = [
  {
    value: 'pioneer',
    image: `${DuskPioneer}`,
    waterMark: BackdropLogo,
    label: 'Snowy Pioneer',
  },
];
