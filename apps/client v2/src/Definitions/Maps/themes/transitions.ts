export const transitionPresets = {
  full: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 300,
      standard: 400,
      complex: 525,
    },
  },
  medium: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 350,
      complex: 375,
    },
  },
  reduced: {
    duration: {
      shortest: 0,
      shorter: 0,
      short: 150,
      standard: 200,
      complex: 250,
    },
  },
  none: {
    duration: {
      shortest: 0,
      shorter: 0,
      short: 0,
      standard: 0,
      complex: 0,
    },
  },
} as const;
