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
  {
    value: 'polaris',
    url: 'https://robertsspaceindustries.com/media/vffwk8ecgmb98r/source/Polaris-Selling-3-Deploymentv3.jpg',
    waterMark: BackdropLogo,
    label: 'Polaris Port',
  },
  {
    value: 'scorpius',
    url: 'https://media.robertsspaceindustries.com/lmdjl2lrdzo0l/source.jpg?_gl=1*cc4fcy*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzM2ODguMzQuMC4w',
    waterMark: BackdropLogo,
    label: 'Scorpius Pair',
  },
  {
    value: 'sabre',
    url: 'https://media.robertsspaceindustries.com/549eulq7pt48o/source.jpg?_gl=1*1cabh4e*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzM3ODUuNDYuMC4w',
    waterMark: BackdropLogo,
    label: 'Sabre Paregrine',
  },
  {
    value: 'hornetMk2',
    url: 'https://media.robertsspaceindustries.com/k4adbatd70y6t/source.jpg?_gl=1*1gj4gwl*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQyMzcuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Hornet Mk2',
  },
  {
    value: 'mpuv',
    url: 'https://media.robertsspaceindustries.com/i9guillde6qib/source.jpg?_gl=1*1a75036*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQyOTIuNS4wLjA.',
    waterMark: BackdropLogo,
    label: 'MPUV',
  },
  {
    value: 'srv',
    url: 'https://media.robertsspaceindustries.com/w6s2jjqi3z36t/source.jpg?_gl=1*q6j78j*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQzNTAuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'SRV',
  },
  {
    value: 'hullC',
    url: 'https://robertsspaceindustries.com/media/t3fpmn1m03ivtr/source/Hull_C_5_v002_compflat.jpg',
    waterMark: BackdropLogo,
    label: 'Hull C Backshot',
  },
  {
    value: 'hullC2',
    url: 'https://media.robertsspaceindustries.com/k5ko5s3oet0r2/source.jpg?_gl=1*qtm4dl*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQ0MTguNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Hull C Port',
  },
  {
    value: 'vulture',
    url: 'https://robertsspaceindustries.com/media/t25r4jxixrkswr/source/DRAK_Vulture_Promo_Canyon_PJ06_NoText-Squashed.jpg',
    waterMark: BackdropLogo,
    label: 'Vulture Horizon',
  },
  {
    value: 'vulture2',
    url: 'https://robertsspaceindustries.com/media/is3b58rw56y8er/source/DRAK_Vulture_Promo_InAction_Starfarer_AA01_PJ01_Graded-Squashed.jpg',
    waterMark: BackdropLogo,
    label: 'Vulture Munch',
  },
  {
    value: 'ares',
    url: 'https://media.robertsspaceindustries.com/f89ypdvxx0cvd/source.jpg?_gl=1*1uv2sig*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQ2NDUuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Ares Pair',
  },
  {
    value: 'perseus',
    url: 'https://media.robertsspaceindustries.com/6sfr36x24j0hw/source.jpg?_gl=1*b9mouu*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQ3MDguNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Perseus Slice',
  },
  {
    value: 'msr',
    url: 'https://robertsspaceindustries.com/media/mer9jjidovjf8r/source/Promo_image_Strech-Goal-Min.jpg',
    waterMark: BackdropLogo,
    label: 'MSR Clouds',
  },
  {
    value: '890',
    url: 'https://media.robertsspaceindustries.com/t2bky2nbdg0ms/source.jpg?_gl=1*1gpnrhr*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQ4MTcuNDIuMC4w',
    waterMark: BackdropLogo,
    label: '890 Brochure',
  },
  {
    value: 'arrow',
    url: 'https://media.robertsspaceindustries.com/mkm2r79wso7c6/source.jpg?_gl=1*sj4cy2*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQ4ODEuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Arrow Team Flyby',
  },
  {
    value: 'apollo',
    url: 'https://robertsspaceindustries.com/media/8isskxzubkscgr/source/RSI_Apollo_Flight_02a_AL_PJ01-Squashed.jpg',
    waterMark: BackdropLogo,
    label: 'Apollo Flyby',
  },
  {
    value: 'retaliator',
    url: 'https://media.robertsspaceindustries.com/gssm088jbjzlm/source.jpg?_gl=1*1t1bm8f*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzQ5NjEuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Retaliator Launch',
  },
  {
    value: 'genisis',
    url: 'https://robertsspaceindustries.com/media/iqk7vt4xay0zfr/source/Starliner_action1_runwaycompFlat.jpg',
    waterMark: BackdropLogo,
    label: 'Genisis Concept',
  },
  {
    value: 'idris',
    url: 'https://media.robertsspaceindustries.com/59wd4xwt2qms4/source.jpeg?_gl=1*2xrjp3*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUxMDAuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Idris Stance',
  },
  {
    value: 'arrastra',
    url: 'https://media.robertsspaceindustries.com/4m20uvevy0y36/source.jpg?_gl=1*11dmhj7*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUxNDEuMTkuMC4w',
    waterMark: BackdropLogo,
    label: 'Arrastra Landed',
  },
  {
    value: 'f8',
    url: 'https://media.robertsspaceindustries.com/j6rvfrkux5nrm/source.jpg?_gl=1*n2s187*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUxOTQuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'F8 Hanger',
  },
  {
    value: 'storm',
    url: 'https://media.robertsspaceindustries.com/j1gpc25oaks9g/source.jpg?_gl=1*jv3nh2*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUyMzAuMjQuMC4w',
    waterMark: BackdropLogo,
    label: 'Storm AA',
  },
  {
    value: 'pisces',
    url: 'https://media.robertsspaceindustries.com/j198wh0bkm9ml/source.jpg?_gl=1*10s6jgo*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUyNzQuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Pisces Rescue',
  },
  {
    value: 'centurion',
    url: 'https://media.robertsspaceindustries.com/8hjjuee5lws5e/source.jpg?_gl=1*p6q8kk*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUzMjguNi4wLjA.',
    waterMark: BackdropLogo,
    label: 'Centurion BattleGroup',
  },
  {
    value: 'zeus',
    url: 'https://media.robertsspaceindustries.com/ypbhy8y8jsgea/source.jpg?_gl=1*y3dfjc*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzUzOTEuNjAuMC4w',
    waterMark: BackdropLogo,
    label: 'Zeus Clipper',
  },
  {
    value: 'kraken',
    url: 'https://media.robertsspaceindustries.com/u2qs1uxy9xfpd/source.jpg?_gl=1*134eaqy*_gcl_au*MTk4MDA4MDY2Ni4xNzIyOTI0NzIzLjM2NzE3NDkyOS4xNzI0ODkzNjcwLjE3MjQ4OTM2Njk.*_ga*MTk1MzYwNzQ4LjE3MDYyOTI1NDY.*_ga_V6MWYXRQNP*MTcyNTEzMzM3OC4yOC4xLjE3MjUxMzU0NTguNTYuMC4w',
    waterMark: BackdropLogo,
    label: 'Kraken Hiding',
  },
  {
    value: 'reclaimer',
    url: 'https://robertsspaceindustries.com/media/627hob4lwqt3xr/source/Image002-1.jpg',
    waterMark: BackdropLogo,
    label: 'Reclaimer Monch',
  },
];
