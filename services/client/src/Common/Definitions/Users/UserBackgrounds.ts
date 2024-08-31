import BackdropLogo from '@/Assets/media/VerseLogos/LogoBackdrop.png?url';

type UserBackground = {
  value: string;
  url: string;
  waterMark: string;
  label: string;
};

export const userBackgroundOptions: UserBackground[] = [
  {
    value: 'pioneer1',
    url: `https://robertsspaceindustries.com/media/of1es6gu4pa4ir/source/Alderin-Landed-Snow-Shot.jpg`,
    waterMark: BackdropLogo,
    label: 'Snowy Pioneer',
  },
  {
    value: 'pioneer2',
    url: `https://robertsspaceindustries.com/media/lri0jlr278tekr/source/Flying-Shot-Top-Dunes.jpg`,
    waterMark: BackdropLogo,
    label: 'Pioneer Dunes',
  },
  {
    value: 'odyssey',
    url: 'https://media.robertsspaceindustries.com/xadldyzrqhwtj/source.jpg',
    waterMark: BackdropLogo,
    label: 'Odyssey',
  },
];
