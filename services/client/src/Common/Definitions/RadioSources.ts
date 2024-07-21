export const radioSources = [
  {
    name: 'The Peoples Radio',
    url: 'https://us1.streamingpulse.com/ssl/7058',
    link: 'https://thepeoplesradio.space/',
  },
  { name: 'The Base', url: 'https://listen.thebase.sc/', link: 'https://thebase.sc/' },
  {
    name: 'Space Travel Radio',
    url: 'https://www.spacetravelradio.de:2893/stream/2/',
    link: 'https://www.spacetravelradio.de/',
  },
  { name: 'Radio Outer Haven', url: 'http://108.178.13.122:8176/stream', link: '' },
];

export type IRadioSource = {
  name: string;
  url: string;
  link: string;
};
