import { MaxLen, MinLen } from 'encore.dev/validate';

export type VerseID = string & (MinLen<26> & MaxLen<26>);
