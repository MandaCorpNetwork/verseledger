export type ISounds =
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

export type SoundPack = {
  [key in ISounds]: string[];
};

export type IAudioPack = {
  name: string;
  pack: SoundPack;
};
