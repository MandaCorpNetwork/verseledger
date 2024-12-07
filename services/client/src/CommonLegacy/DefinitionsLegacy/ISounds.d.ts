type ISounds =
  | 'close'
  | 'denied'
  | 'error'
  | 'generalNotify'
  | 'loading'
  | 'messageNotify'
  | 'navigate'
  | 'send'
  | 'success'
  | 'toggleOff'
  | 'toggleOn'
  | 'warning'
  | 'hover'
  | 'open'
  | 'clickMain';

type SoundPack = {
  [key in ISounds]: string[];
};

type IAudioPack = {
  name: string;
  pack: SoundPack;
};
