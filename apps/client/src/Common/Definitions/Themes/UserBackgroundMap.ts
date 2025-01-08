/**
 * @file UserBackgroundOptions
 * @summary
 * This is a list of options for the UserPage Background Images.
 * To Add a new image, simply insert an option at the end of the list.
 * Value - This is the name of the option passed to the backend, give it a one word name and if duplicated, put a number at the end.
 * URL - the URL to the image, try to utilize images directly from the RSI Sight. Avoid Images with custom size manipulation in the URL. Most of these are found by clicking the download button on the images in the Ship Matrix.
 * waterMark - This identifies which watermark to use. Depending on the colors of the Image you may want to utilize a different watermark. Currently there is only one so this will be changed in the future and may also allow for it to be based on theme.
 * label - This is the title of the image that will be displayed in the User Settings.
 */
import BackdropLogo from '@Assets/media/VerseLogos/LogoBackdrop.png?url';

type UserBackground = {
  value: string;
  url: string;
  waterMark: string;
  label: string;
};

export type ProfileBackgroundKey = keyof typeof profileBackgroundMap;

export const profileBackgroundMap: Record<string, UserBackground> = {
  pioneer1: {
    value: 'pioneer1',
    url: `https://robertsspaceindustries.com/media/of1es6gu4pa4ir/source/Alderin-Landed-Snow-Shot.jpg`,
    waterMark: BackdropLogo,
    label: 'Snowy Pioneer',
  },
  pioneer2: {
    value: 'pioneer2',
    url: `https://robertsspaceindustries.com/media/lri0jlr278tekr/source/Flying-Shot-Top-Dunes.jpg`,
    waterMark: BackdropLogo,
    label: 'Pioneer Dunes',
  },
  odyssey: {
    value: 'odyssey',
    url: 'https://media.robertsspaceindustries.com/xadldyzrqhwtj/source.jpg',
    waterMark: BackdropLogo,
    label: 'Odyssey',
  },
  polaris: {
    value: 'polaris',
    url: 'https://robertsspaceindustries.com/media/vffwk8ecgmb98r/source/Polaris-Selling-3-Deploymentv3.jpg',
    waterMark: BackdropLogo,
    label: 'Polaris Port',
  },
  scorpius: {
    value: 'scorpius',
    url: 'https://media.robertsspaceindustries.com/lmdjl2lrdzo0l/source.jpg',
    waterMark: BackdropLogo,
    label: 'Scorpius Pair',
  },
  sabre: {
    value: 'sabre',
    url: 'https://media.robertsspaceindustries.com/549eulq7pt48o/source.jpg',
    waterMark: BackdropLogo,
    label: 'Sabre Paregrine',
  },
  hornetMk2: {
    value: 'hornetMk2',
    url: 'https://media.robertsspaceindustries.com/k4adbatd70y6t/source.jpg',
    waterMark: BackdropLogo,
    label: 'Hornet Mk2',
  },
  mpuv: {
    value: 'mpuv',
    url: 'https://media.robertsspaceindustries.com/i9guillde6qib/source.jpg.',
    waterMark: BackdropLogo,
    label: 'MPUV',
  },
  srv: {
    value: 'srv',
    url: 'https://media.robertsspaceindustries.com/w6s2jjqi3z36t/source.jpg',
    waterMark: BackdropLogo,
    label: 'SRV',
  },
  hullC: {
    value: 'hullC',
    url: 'https://robertsspaceindustries.com/media/t3fpmn1m03ivtr/source/Hull_C_5_v002_compflat.jpg',
    waterMark: BackdropLogo,
    label: 'Hull C Backshot',
  },
  hullC2: {
    value: 'hullC2',
    url: 'https://media.robertsspaceindustries.com/k5ko5s3oet0r2/source.jpg',
    waterMark: BackdropLogo,
    label: 'Hull C Port',
  },
  vulture: {
    value: 'vulture',
    url: 'https://robertsspaceindustries.com/media/t25r4jxixrkswr/source/DRAK_Vulture_Promo_Canyon_PJ06_NoText-Squashed.jpg',
    waterMark: BackdropLogo,
    label: 'Vulture Horizon',
  },
  vulture2: {
    value: 'vulture2',
    url: 'https://robertsspaceindustries.com/media/is3b58rw56y8er/source/DRAK_Vulture_Promo_InAction_Starfarer_AA01_PJ01_Graded-Squashed.jpg',
    waterMark: BackdropLogo,
    label: 'Vulture Munch',
  },
  ares: {
    value: 'ares',
    url: 'https://media.robertsspaceindustries.com/f89ypdvxx0cvd/source.jpg',
    waterMark: BackdropLogo,
    label: 'Ares Pair',
  },
  perseus: {
    value: 'perseus',
    url: 'https://media.robertsspaceindustries.com/6sfr36x24j0hw/source.jpg',
    waterMark: BackdropLogo,
    label: 'Perseus Slice',
  },
  msr: {
    value: 'msr',
    url: 'https://robertsspaceindustries.com/media/mer9jjidovjf8r/source/Promo_image_Strech-Goal-Min.jpg',
    waterMark: BackdropLogo,
    label: 'MSR Clouds',
  },
  890: {
    value: '890',
    url: 'https://media.robertsspaceindustries.com/t2bky2nbdg0ms/source.jpg',
    waterMark: BackdropLogo,
    label: '890 Brochure',
  },
  arrow: {
    value: 'arrow',
    url: 'https://media.robertsspaceindustries.com/mkm2r79wso7c6/source.jpg',
    waterMark: BackdropLogo,
    label: 'Arrow Team Flyby',
  },
  apollo: {
    value: 'apollo',
    url: 'https://robertsspaceindustries.com/media/8isskxzubkscgr/source/RSI_Apollo_Flight_02a_AL_PJ01-Squashed.jpg',
    waterMark: BackdropLogo,
    label: 'Apollo Flyby',
  },
  retaliator: {
    value: 'retaliator',
    url: 'https://media.robertsspaceindustries.com/gssm088jbjzlm/source.jpg',
    waterMark: BackdropLogo,
    label: 'Retaliator Launch',
  },
  genisis: {
    value: 'genisis',
    url: 'https://robertsspaceindustries.com/media/iqk7vt4xay0zfr/source/Starliner_action1_runwaycompFlat.jpg',
    waterMark: BackdropLogo,
    label: 'Genisis Concept',
  },
  idris: {
    value: 'idris',
    url: 'https://media.robertsspaceindustries.com/59wd4xwt2qms4/source.jpeg',
    waterMark: BackdropLogo,
    label: 'Idris Stance',
  },
  arrastra: {
    value: 'arrastra',
    url: 'https://media.robertsspaceindustries.com/4m20uvevy0y36/source.jpg',
    waterMark: BackdropLogo,
    label: 'Arrastra Landed',
  },
  f8: {
    value: 'f8',
    url: 'https://media.robertsspaceindustries.com/j6rvfrkux5nrm/source.jpg',
    waterMark: BackdropLogo,
    label: 'F8 Hanger',
  },
  storm: {
    value: 'storm',
    url: 'https://media.robertsspaceindustries.com/j1gpc25oaks9g/source.jpg',
    waterMark: BackdropLogo,
    label: 'Storm AA',
  },
  pisces: {
    value: 'pisces',
    url: 'https://media.robertsspaceindustries.com/j198wh0bkm9ml/source.jpg',
    waterMark: BackdropLogo,
    label: 'Pisces Rescue',
  },
  centurion: {
    value: 'centurion',
    url: 'https://media.robertsspaceindustries.com/8hjjuee5lws5e/source.jpg',
    waterMark: BackdropLogo,
    label: 'Centurion BattleGroup',
  },
  zeus: {
    value: 'zeus',
    url: 'https://media.robertsspaceindustries.com/ypbhy8y8jsgea/source.jpg',
    waterMark: BackdropLogo,
    label: 'Zeus Clipper',
  },
  kraken: {
    value: 'kraken',
    url: 'https://media.robertsspaceindustries.com/u2qs1uxy9xfpd/source.jpg',
    waterMark: BackdropLogo,
    label: 'Kraken Hiding',
  },
  reclaimer: {
    value: 'reclaimer',
    url: 'https://robertsspaceindustries.com/media/627hob4lwqt3xr/source/Image002-1.jpg',
    waterMark: BackdropLogo,
    label: 'Reclaimer Monch',
  },
};
