import { useStore } from '@tanstack/react-store';
import { settingsStore } from './Store/userSettings/settingStore';
import { shellMap } from '@/Definitions/Maps/os/shellMap';
import type { ThemeOS } from '@Types/os/themeOS';
import { VerseOSShell } from '@OS/VerseOS/components/shell';
import { Outlet } from '@tanstack/react-router';

/**
 * App Shell pulls the current ThemeOS and returns any given Shell
 */

export const AppShell: React.FC = () => {
  const { theme } = useStore(settingsStore);

  const ActiveShell = shellMap[theme as ThemeOS] ?? VerseOSShell;
  return <ActiveShell>{<Outlet />}</ActiveShell>;
};
