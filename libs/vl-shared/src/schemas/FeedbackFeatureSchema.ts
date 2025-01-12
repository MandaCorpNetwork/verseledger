import { z } from 'zod';

export const FeedbackFeatureSchema = z.enum([
  'Verse Ledger',
  'Contract Ledger',
  'Contract Page',
  'Personal Ledger',
  'Verse News',
  'Verse Market',
  'Org Ledger',
  'Popups',
  'Widgets',
  'User Settings',
  'App Bar',
]);

export type IFeedbackFeatures = z.infer<typeof FeedbackFeatureSchema>;
