import { Store } from '@tanstack/react-store';
import type { UserSettings } from '@/Definitions/Types/userSettings/userSettings';

const defaultSettings: UserSettings = {
  theme: 'verseOS',
  animations: 'medium',
  fidelity: 'medium',
};

export const settingsStore = new Store<UserSettings>(defaultSettings);
