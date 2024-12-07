import { ThemeOptions } from '@mui/material/styles';

export const highAnimationTransitionObject: ThemeOptions['transitions'] = {
  duration: {
    shortest: 200,
    shorter: 300,
    short: 400,
    standard: 500,
    complex: 700,
    enteringScreen: 450,
    leavingScreen: 400,
  },
  easing: {
    easeIn: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
    easeOut: 'cubic-bezier(0.15, 0.85, 0.45, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  },
};

export const mediumAnimationTransitionObject: ThemeOptions['transitions'] = {
  duration: {
    shortest: 150,
    shorter: 250,
    short: 350,
    standard: 450,
    complex: 600,
    enteringScreen: 300,
    leavingScreen: 250,
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const lowAnimationTransitionObject: ThemeOptions['transitions'] = {
  duration: {
    shortest: 100,
    shorter: 150,
    short: 200,
    standard: 250,
    complex: 400,
    enteringScreen: 200,
    leavingScreen: 200,
  },
  easing: {
    easeIn: 'linear',
    easeOut: 'linear',
    easeInOut: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

export const noAnimationTransitionObject: ThemeOptions['transitions'] = {
  duration: {
    shortest: 0,
    shorter: 0,
    short: 0,
    standard: 0,
    complex: 0,
    enteringScreen: 0,
    leavingScreen: 0,
  },
  easing: {
    easeIn: 'none',
    easeOut: 'none',
    easeInOut: 'none',
  },
};

export const animationTransitionMap = {
  none: noAnimationTransitionObject,
  low: lowAnimationTransitionObject,
  medium: mediumAnimationTransitionObject,
  high: highAnimationTransitionObject,
};
